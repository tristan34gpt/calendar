"use server";

import { checkEmail } from "@/utils/check-emailsyntax";
import { MongoClient } from "mongodb";

export const updateProfilUser = async (firstname, lastname, email) => {
  if (!firstname || !lastname || !email) {
    //Notification
    console.log("Champ manquant");

    throw new Error("Aucun champ ne doit être vide !");
  }

  //Check if the email is valide
  if (!checkEmail(email)) {
    throw new Error("veuillez entrez un email valide");
  }

  //connect to the MongoDB cluster

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  //connect to the MongoDB database

  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // First: Verify if this email is already used
    //Select th "users" collection

    let user = await db.collection("users").find({ email }).limit(1).toArray();

    //If the email is already used
    if (user.length !== 0) {
      await client.close();
      throw new Error("Cet email est déja utilisé");
    }

    //twoo: Encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // THIRD: Create the user
    await db.collection("users").insertOne({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
      creation: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
