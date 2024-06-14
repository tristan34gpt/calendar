"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkEmail } from "@/utils/check-emailsyntax";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

export const updateUser = async (firstname, lastname, email) => {
  if (!firstname || !lastname || !email) {
    console.log("Champ manquant");
    throw new Error("Aucun champ ne doit être vide !");
  }

  if (!checkEmail(email)) {
    throw new Error("Veuillez entrer un email valide");
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Utilisateur non authentifié");
  }

  const client = new MongoClient(process.env.MONGODB_CLIENT);
  await client.connect();
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    const existingUser = await db
      .collection("users")
      .findOne({ email: session.user.email });

    if (!existingUser) {
      throw new Error("Utilisateur non trouvé");
    }

    let updateFields = {};

    if (existingUser.firstname !== firstname) {
      updateFields.firstname = firstname;
    }
    if (existingUser.lastname !== lastname) {
      updateFields.lastname = lastname;
    }
    if (existingUser.email !== email) {
      // Check if the new email is already used by another user
      const emailUsed = await db.collection("users").findOne({ email: email });
      if (
        emailUsed &&
        emailUsed._id.toString() !== existingUser._id.toString()
      ) {
        console.log(`Email déjà utilisé par un autre utilisateur: ${email}`);
        throw new Error("Cet email est déjà utilisé");
      }
      updateFields.email = email;
    }

    if (Object.keys(updateFields).length > 0) {
      const result = await db
        .collection("users")
        .updateOne(
          { email: session.user.email },
          { $set: updateFields },
          { upsert: true }
        );
      console.log("Profil mis à jour avec succès", result);
      return result;
    } else {
      console.log("Aucune mise à jour nécessaire");
      return { message: "Aucune mise à jour nécessaire" };
    }
  } catch (e) {
    console.error("Erreur lors de la mise à jour du profil:", e.message);
    throw new Error(e.message);
  } finally {
    await client.close();
  }
};
