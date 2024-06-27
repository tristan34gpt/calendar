"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkEmail } from "@/utils/check-emailsyntax";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

export const updateUser = async (firstname, lastname, email) => {
  if (!firstname || !lastname || !email) {
    console.log("Missing field");
    throw new Error("No field should be empty!");
  }

  if (!checkEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("User not authenticated");
  }

  const client = new MongoClient(process.env.MONGODB_CLIENT);
  await client.connect();
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    const existingUser = await db
      .collection("users")
      .findOne({ email: session.user.email });

    if (!existingUser) {
      throw new Error("User not found");
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
        console.log(`Email already used by another user: ${email}`);
        throw new Error("This email is already used");
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
      console.log("Profile updated successfully", result);
      return result;
    } else {
      console.log("No update necessary");
      return { message: "No update necessary" };
    }
  } catch (e) {
    console.error("Error updating profile:", e.message);
    throw new Error(e.message);
  } finally {
    await client.close();
  }
};
