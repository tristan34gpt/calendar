"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

let infoCalendar = [];
const Verify = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Vous n'êtes pas connecté");
  } else {
    return session.user.email;
  }
};

//Days calendar
export const infoDaysCalendar = async (date) => {
  await Verify();
  try {
    infoCalendar = [...date];
  } catch (e) {
    throw new Error(e);
  }
};

//Schedule calendar

export const scheduleCalendar = async (schedule) => {
  await Verify();
  try {
    infoCalendar = [...schedule];
  } catch (e) {
    throw new Error(e);
  }
};

export const createCalendar = async (date) => {
  const infoCalendar = [date];
  const userEmail = await Verify();

  //connect to the MongoDB cluster

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  //connect to the MongoDB database

  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // Vérification si l'utilisateur a déjà une réservation
    const existingReservation = await db
      .collection("reservation")
      .findOne({ userEmail: userEmail });

    if (existingReservation) {
      throw new Error("Vous avez déjà une réservation.");
    }

    // THIRD: Create the calendar
    const result = await db.collection("reservation").insertOne({
      userEmail: userEmail,
      days: date,
      createdAt: new Date(),
    });
  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
