"use server";

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { checkEmail } from "@/utils/check-emailsyntax";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(process.env.MONGODB_DATABASE);
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export const createUser = async (firstname, lastname, email, password) => {
  console.log("createUser called with:", {
    firstname,
    lastname,
    email,
    password,
  });

  if (!firstname || !lastname || !email || !password) {
    console.error("Validation failed: missing fields");
    throw new Error("Aucun champ ne doit être vide !");
  }

  if (!checkEmail(email)) {
    console.error("Validation failed: invalid email");
    throw new Error("Veuillez entrer un email valide !");
  }

  const { db, client } = await connectToDatabase(process.env.MONGODB_CLIENT);

  try {
    console.log("Checking if email is already used...");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      console.error("Email already used:", email);
      throw new Error("Cet email est déjà utilisé");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

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
  }
};
