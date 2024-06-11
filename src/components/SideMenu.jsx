"use client";

import Link from "next/link";
import Button from "./Button";
import { useSession } from "next-auth/react";

export function SideMenu() {
  const { data: session } = useSession();

  const verifyCalendar = () => {
    if (session.user.reservations.length > 1) {
      return "+ créez";
    } else if (
      session.user.reservations.length < 1 &&
      !session.reservations.view
    ) {
      ("Vous n'avez pas fini votre Calendar");
    } else {
      return "Modifier votre Calendar";
    }
  };

  return (
    <div className="flex flex-col p-5  border-gradiant h-[100vh] relative ">
      <h1 className=" mb-[80px] font-semibold text-[1.5em] text-center">
        Bienvenue <br /> {session.user.firstname}
      </h1>

      <Link href={"/create/date"}>
        <Button
          className={"rounded-md w-[250px] h-[40px] "}
          children={verifyCalendar()}
        ></Button>
      </Link>
      <div className="mt-[80px] mb-[80px] flex flex-col text-[1.3em] font-medium">
        <Link className="m-2" href={"/authentifier"}>
          Acceuil
        </Link>
        <Link className="m-2" href={"/authentifier/agenda"}>
          Mon agenda
        </Link>

        <Link className="m-2" href={"/authentifier/profil"}>
          Profil
        </Link>
      </div>
      <div className="absolute bottom-[10%]">
        <Button
          className={"rounded-md w-[250px] h-[40px] "}
          children={"Déconnexion"}
        ></Button>
      </div>
    </div>
  );
}
