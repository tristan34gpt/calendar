import Credentials from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          console.log("Connecting to MongoDB...");
          // Connect to the MongoDB
          const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

          console.log("Connected to MongoDB. Fetching user...");
          // Connect to the MongoDB database
          const db = client.db(process.env.MONGODB_DATABASE);

          // Find the user in the MongoDB database
          let user = await db
            .collection("users")
            .find({ email })
            .limit(1)
            .toArray();

          // If the email is not used
          if (user.length === 0) {
            await client.close();
            throw new Error("Cet utilisateur n'existe pas");
          }

          // Verify the password
          const isPasswordValid = await bcrypt.compare(
            password,
            user[0].password
          );

          // If the password isn't valid
          if (!isPasswordValid) {
            await client.close();
            throw new Error("Le mot de passe est incorrect");
          }

          // Format user
          user = user.map((user) => ({
            _id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          }))[0];

          await client.close();
          return user;
        } catch (e) {
          console.error("Authorization error:", e);
          throw new Error(e.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/connexion",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.email = token.email;
      }

      try {
        // Connect to the MongoDB
        const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // Retrieve reservations for the user
        const reservations = await db
          .collection("reservation")
          .find({ userEmail: session.user.email })
          .toArray();

        session.user.reservations = reservations;

        await client.close();
      } catch (e) {
        console.error("Failed to fetch reservations:", e);
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
