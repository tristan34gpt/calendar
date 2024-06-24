import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }

  const idUser = token.id;

  try {
    const client = new MongoClient(process.env.MONGODB_CLIENT);
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    const reservations = await db
      .collection("reservations")
      .find({ idUser: idUser })
      .toArray();

    await client.close();

    return NextResponse.json(reservations, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Unable to fetch reservations" },
      { status: 500 }
    );
  }
}
