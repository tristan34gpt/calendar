"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-emailsyntax";

let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB
async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(process.env.MONGODB_DATABASE);
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export const createUser = async (firstname, lastname, email, password) => {
  // If a field is empty
  if (!firstname || !lastname || !email || !password) {
    throw new Error("Aucun champ ne doit être vide !");
  }

  // Check if the email is valid
  if (!checkEmail(email)) {
    throw new Error("Veuillez entrer un email valide !");
  }

  const { db, client } = await connectToDatabase(process.env.MONGODB_CLIENT);

  try {
    // Verify if this email is already used
    const user = await db.collection("users").findOne({ email });

    if (user) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await db.collection("users").insertOne({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
      creation: new Date(),
    });

    console.log("User created successfully:", email);
  } catch (e) {
    console.error("Error creating user:", e);
    throw new Error(e.message);
  } finally {
    await client.close();
  }
};
