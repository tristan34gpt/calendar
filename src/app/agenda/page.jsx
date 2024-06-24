"use client";

import Button from "@/components/Button";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function Agenda() {
  const { reservation } = useUser();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {reservation.length > 0 ? (
        <>
          <h1 className="text-[1.5em] font-semibold">prévisualisation</h1>
          <Link href={"/apercu"}>
            <Button className={"w-[400px] h-[40px] mt-5 rounded-md"}>
              Ouvrez l’apercu
            </Button>
          </Link>
          <Link href={"/create/date"}>
            <Button className={"w-[400px] h-[40px] mt-5 rounded-md"}>
              Modifier votre Calendar
            </Button>
          </Link>
        </>
      ) : (
        <Link href={"/create/date"}>
          <Button className={"w-[400px] h-[40px] mt-5 rounded-md"}>
            Creéz votre calendar
          </Button>
        </Link>
      )}
    </div>
  );
}
