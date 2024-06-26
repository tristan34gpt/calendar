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

  console.time("createUser");

  // Log: début de la validation des champs
  console.time("validateFields");
  if (!firstname || !lastname || !email || !password) {
    console.error("Validation failed: missing fields");
    console.timeEnd("validateFields");
    console.timeEnd("createUser");
    throw new Error("Aucun champ ne doit être vide !");
  }

  if (!checkEmail(email)) {
    console.error("Validation failed: invalid email");
    console.timeEnd("validateFields");
    console.timeEnd("createUser");
    throw new Error("Veuillez entrer un email valide !");
  }
  console.timeEnd("validateFields");

  let client;
  try {
    // Log: début de la connexion à MongoDB
    console.time("connectToDatabase");
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);
    console.timeEnd("connectToDatabase");

    // Log: vérification de l'existence de l'utilisateur
    console.time("checkUserExistence");
    console.log("Checking if email is already used...");
    let user = await db.collection("users").find({ email }).limit(1).toArray();
    console.timeEnd("checkUserExistence");

    if (user.length !== 0) {
      console.error("Email already used:", email);
      console.timeEnd("createUser");
      throw new Error("Cet email est déjà utilisé");
    }

    // Log: cryptage du mot de passe
    console.time("encryptPassword");
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.timeEnd("encryptPassword");

    // Log: insertion de l'utilisateur
    console.time("insertUser");
    await db.collection("users").insertOne({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptedPassword,
      creation: new Date(),
    });
    console.timeEnd("insertUser");

    console.log("User created successfully:", email);
  } catch (e) {
    console.error("Error during user creation process:", e);
    throw e;
  } finally {
    if (client) {
      // Log: fermeture de la connexion MongoDB
      console.time("closeConnection");
      await client.close();
      console.timeEnd("closeConnection");
    }
  }

  console.timeEnd("createUser");
};
