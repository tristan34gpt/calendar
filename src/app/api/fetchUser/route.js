import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  //connect to the database

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = await MongoClient.connect(process.env.MONGODB_DATABASE);

  const users = await db
    .collection("users")
    .findOne({ _id: new ObjectId(token.id) })
    .toArray();

  await client.close();

  return NextResponse.json(users);
}
