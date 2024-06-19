"use client";

import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import Button from "./Button";
import Loading from "./Loading";

export function SideMenu() {
  //Context
  const { user, fetchUser, session, reservation, fetchReservation } = useUser();

  //Cycle
  useEffect(() => {
    if (session) {
      fetchUser();
      fetchReservation();
    }
  }, [session]);

  useEffect(() => {
    if (reservation) {
      console.log(reservation);
    }
  }, [reservation]);

  const verifyCalendar = () => {
    if (reservation.length < 1) {
      return "+ créez";
    } else if (
      (reservation.length > 1 && reservation.date) ||
      !reservation.schedule ||
      !reservation.view ||
      !reservation.time ||
      !reservation.questions
    ) {
      return "Finir sont Calendar";
    } else {
      return "Modifier votre Calendar";
    }
  };

  return (
    <div className="flex flex-col p-5 border-gradiant-color h-[100vh] relative">
      <h1 className="mb-[80px] font-semibold text-[1.5em] text-center">
        Bienvenue <br /> {user.firstname}
      </h1>

      <Link href={"/authentifier/create/date"}>
        <Button className={"rounded-md w-[250px] h-[auto] p-1 "}>
          {verifyCalendar()}
        </Button>
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
        <Button className={"rounded-md w-[250px] h-[40px]"}>Déconnexion</Button>
      </div>
    </div>
  );
}
