import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "User is not authenticated" });
  }

  const userEmail = session.user.email;

  try {
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);
    const reservations = await db
      .collection("reservation")
      .find({ userEmail })
      .toArray();

    client.close();

    return res.status(200).json(reservations);
  } catch (e) {
    return res.status(500).json({ error: "Unable to fetch reservations" });
  }
};

export default handler;
