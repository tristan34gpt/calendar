import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    console.log("Not authenticated");
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const idUser = token.id;

  const { date, questions, email } = await request.json();

  if (!date || !questions || !email) {
    console.log("All fields are required");
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  let client;

  try {
    client = new MongoClient(process.env.MONGODB_CLIENT);
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);

    console.log("Connected to database");

    // Vérifier si le créneau est déjà réservé
    const existingReservation = await db.collection("reservations").findOne({
      dateReservation: date,
      idUser: idUser,
    });

    if (existingReservation) {
      console.log(
        "Time slot already reserved for user",
        idUser,
        "on date",
        date
      );
      return NextResponse.json(
        { message: "Time slot already reserved" },
        { status: 409 }
      );
    }

    const newReservation = {
      idUser: idUser,
      dateReservation: date,
      emailReservation: email,
      questionsReservation: questions,
    };

    const result = await db
      .collection("reservations")
      .insertOne(newReservation);

    if (result.acknowledged) {
      console.log(
        "Reservation added successfully for user",
        idUser,
        "on date",
        date
      );
      return NextResponse.json(
        { message: "Reservation added successfully" },
        { status: 200 }
      );
    } else {
      console.log("Failed to add reservation");
      return NextResponse.json(
        { message: "Failed to add reservation" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log("Database connection closed");
    }
  }
}
