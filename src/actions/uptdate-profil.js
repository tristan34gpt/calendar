// "use server";

// import { checkEmail } from "@/utils/check-emailsyntax";
// import { MongoClient, ObjectId } from "mongodb";

// export const updateProfilUser = async (id, firstname, lastname, email) => {
//   if (!id || !firstname || !lastname || !email) {
//     console.log("Champ manquant");
//     throw new Error("Aucun champ ne doit être vide !");
//   }

//   if (!checkEmail(email)) {
//     throw new Error("Veuillez entrer un email valide");
//   }

//   const client = await MongoClient.connect(process.env.MONGODB_CLIENT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const db = client.db(process.env.MONGODB_DATABASE);

//   try {
//     // Mettre à jour l'utilisateur
//     const result = await db.collection("users").updateOne(
//       { _id: new ObjectId(id) },
//       {
//         $set: {
//           firstname,
//           lastname,
//           email,
//         },
//       }
//     );

//     console.log("Update result:", result);

//     if (result.matchedCount === 0) {
//       throw new Error("Utilisateur non trouvé");
//     }

//     await client.close();
//   } catch (e) {
//     await client.close();
//     throw new Error(e.message);
//   }
// };
