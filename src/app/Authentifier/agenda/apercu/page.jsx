"use client";
import { useSession } from "next-auth/react";

export default function Apercu() {
  const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "unauthenticated") {
  //   return <div>User is not authenticated</div>;
  // }

  const date = new Date();
  const options = { month: "long" };
  const currentMonth = date.toLocaleString("fr-FR", options);
  const yearOptions = { year: "numeric" };
  const currentYear = date.toLocaleString("fr-FR", yearOptions);

  console.log(session);

  return (
    <div>
      <h2>{session.user.firstname + " " + session.user.lastname} </h2>
      <h3>Durées 30 minutes</h3>
      <div>
        <h3>Selectioner une date</h3>

        <h3>{currentMonth + " " + currentYear}</h3>
      </div>
      <div></div>
    </div>
  );
}
