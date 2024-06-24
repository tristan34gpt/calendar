"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-emailsyntax";

export const createUser = async (firstname, lastname, email, password) => {
  console.log("createUser called with:", {
    firstname,
    lastname,
    email,
    password,
  });

  // If a field is empty
  if (!firstname || !lastname || !email || !password) {
    // Notification
    console.error("Validation failed: missing fields");
    throw new Error("Aucun champ ne doit être vide !");
  }

  // Check if the email is valid
  if (!checkEmail(email)) {
    console.error("Validation failed: invalid email");
    throw new Error("Veuillez entrer un email valide !");
  }

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  // Connect to the MongoDB database
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // First: Verify if this email is already used
    // Select the "users" collection
    console.log("Checking if email is already used...");
    let user = await db.collection("users").find({ email }).limit(1).toArray();
    // If the email is already used
    if (user.length !== 0) {
      await client.close();
      console.error("Email already used:", email);
      throw new Error("Cet email est déjà utilisé");
    }

    // Third: Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Fourth: Create the user
    await db.collection("users").insertOne({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptedPassword,
      creation: new Date(),
    });

    console.log("User created successfully:", email);
  } catch (e) {
    console.error("Error creating user:", e);
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
