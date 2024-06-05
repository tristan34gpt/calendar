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
          // Connect to the MongoDB

          const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

          // Connect to the MongoDB database
          const db = client.db(process.env.MONGODB_DATABASE);

          // First to the MongoDB database
          // Select the "users" collection

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

          //SECOND: verify the password

          const ispasswordValid = await bcrypt.compare(
            password,
            user[0].password
          );

          // If the password isn't valid

          if (!ispasswordValid) {
            await client.close();
            throw new Error("Le mot de passe est incorrect");
          }

          //Third: our user is authenticated
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
    signIn: "/login/signin",
  },
  callbacks: {},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
