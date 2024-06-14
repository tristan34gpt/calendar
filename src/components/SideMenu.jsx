"use client";

import Link from "next/link";
import Button from "./Button";
import { useSession } from "next-auth/react";

export function SideMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
        >
          <animateTransform
            attributeName="transform"
            dur="0.75s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </path>
      </svg>
    </div>;
  }

  if (status === "unauthenticated" || !session) {
    return <div>User is not authenticated</div>;
  }

  const verifyCalendar = () => {
    const reservations = session.user?.reservations || [];

    if (reservations.length > 1) {
      return "+ créez";
    } else if (reservations.length < 1 && !session.user?.reservations?.view) {
      return "Vous n'avez pas fini votre Calendar";
    } else {
      return "Modifier votre Calendar";
    }
  };

  return (
    <div className="flex flex-col p-5 border-gradient h-[100vh] relative">
      <h1 className="mb-[80px] font-semibold text-[1.5em] text-center">
        Bienvenue <br /> {session.user.firstname}
      </h1>

      <Link href={"/authentifier/create/date"}>
        <Button className={"rounded-md w-[250px] h-[40px]"}>
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
