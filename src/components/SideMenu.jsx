"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import Button from "./Button";
import Loading from "./Loading";
import { signOut } from "next-auth/react";

export function SideMenu() {
  const { user, fetchUser, session, reservation, fetchReservation } = useUser();
  const [reserv, setReserv] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (reservation && reservation.length < 1) {
      return "+ créez";
    } else if (
      (reservation && reservation.length > 1 && reserv.date) ||
      !reserv.schedule ||
      !reserv.time ||
      !reserv.questions
    ) {
      return "Finir sont Calendar";
    } else {
      return "Modifier votre Calendar";
    }
  };

  return (
    <div className="h-[100vh] relative">
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block p-5 border-gradient-color h-[100vh] flex flex-col md:flex-col`}
      >
        {user ? (
          <>
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
                Accueil
              </Link>
              <Link className="m-2" href={"/agenda"}>
                Mon agenda
              </Link>
              <Link className="m-2" href={"/profil"}>
                Profil
              </Link>
            </div>
            <div className="mt-auto">
              <Button
                onClick={() => signOut({ callbackUrl: "/auth/connexion" })}
                className={"rounded-md w-[250px] h-[40px]"}
              >
                Déconnexion
              </Button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
