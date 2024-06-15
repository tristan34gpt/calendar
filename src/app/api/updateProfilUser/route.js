import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Log the token to check its content
  console.log("Token:", token);

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { firstName, lastName, email } = await request.json();

  console.log("Request body:", { firstName, lastName, email });

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Check if user exists before updating
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(token.id) });

    if (!user) {
      await client.close();
      console.log("User not found:", token.id);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(token.id) },
      {
        $set: {
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
      }
    );

    await client.close();

    console.log("Update result:", result);

    if (result.matchedCount === 0) {
      console.log("No document matched for update");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User updated successfully");
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
