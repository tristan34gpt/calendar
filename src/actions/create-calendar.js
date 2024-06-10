"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

const Verify = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Vous n'êtes pas connecté");
  }
};

//Days calendar

export const infoDaysCalendar = async (date) => {
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);

    const existingReservation = await db
      .collection("reservation")
      .findOne({ userEmail: session.user.email });

    // THIRD: Add info day in calendar
    const result = await db.collection("reservation").insertOne({
      userEmail: session.user.email,
      days: date,
    });
  } catch (e) {
    throw new Error(e);
  }

  await client.close();
};

//Schedule calendar

export const scheduleCalendar = async (schedule) => {
  await Verify();
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);
  try {
    const existingReservation = await db
      .collection("reservation")
      .findOne({ userEmail: session.user.email });

    // THIRD: Add info day in calendar
    const result = await db
      .collection("reservation")
      .updateOne(
        { userEmail: session.user.email },
        { $set: { schedule: schedule } },
        { upsert: true }
      );
  } catch (e) {
    throw new Error(e);
  }
  await client.close();
};

//View calendar

export const ViewCalendar = async (view) => {
  await Verify();
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);
  try {
    const existingReservation = await db
      .collection("reservation")
      .findOne({ userEmail: session.user.email });

    // THIRD: Add info day in calendar
    const result = await db
      .collection("reservation")
      .updateOne(
        { userEmail: session.user.email },
        { $set: { view: view } },
        { upsert: true }
      );
  } catch (e) {
    throw new Error(e);
  }
};

//Time calendar

export const timeCalendar = async (time) => {
  await Verify();
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);
  try {
    const existingReservation = await db
      .collection("reservation")
      .findOne({ userEmail: session.user.email });

    // THIRD: Add info day in calendar
    const result = await db
      .collection("reservation")
      .updateOne(
        { userEmail: session.user.email },
        { $set: { time: time } },
        { upsert: true }
      );
  } catch (e) {
    throw new Error(e);
  }
};

//Questions calendar

export const questionsCalendar = async (questions) => {
  await Verify();
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);
  try {
    const existingReservation = await db
      .collection("reservation")
      .findOne({ userEmail: session.user.email });

    // THIRD: Add info day in calendar
    const result = await db
      .collection("reservation")
      .updateOne(
        { userEmail: session.user.email },
        { $set: { questions: questions } },
        { upsert: true }
      );
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
