"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import Button from "./Button";
import Loading from "./Loading";

export function SideMenu() {
  //Context
  const { user, fetchUser, session, reservation, fetchReservation } = useUser();
  const [reserv, setReserv] = useState([]);

  //Cycle
  useEffect(() => {
    if (session) {
      fetchUser();
      fetchReservation();
    }
  }, [session]);

  useEffect(() => {
    if (reservation) {
      for (const reserv of reservation) {
        setReserv(reserv);
      }
    }
  }, [reservation]);

  const verifyCalendar = () => {
    if (reservation.length < 1) {
      return "+ créez";
    } else if (
      (reservation.length > 1 && reserv.date) ||
      !reserv.schedule ||
      !reserv.view ||
      !reserv.time ||
      !reserv.questions
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

      <Link href={"/create/date"}>
        <Button className={"rounded-md w-[250px] h-[auto] p-1 "}>
          {verifyCalendar()}
        </Button>
      </Link>
      <div className="mt-[80px] mb-[80px] flex flex-col text-[1.3em] font-medium">
        <Link className="m-2" href={"/"}>
          Acceuil
        </Link>
        <Link className="m-2" href={"/agenda"}>
          Mon agenda
        </Link>
        <Link className="m-2" href={"/profil"}>
          Profil
        </Link>
      </div>
      <div className="absolute bottom-[10%]">
        <Button className={"rounded-md w-[250px] h-[40px]"}>Déconnexion</Button>
      </div>
    </div>
  );
}
