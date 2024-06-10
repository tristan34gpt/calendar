"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function Agenda() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-[1.5em] font-semibold">prévisualisation</h1>
      <Link href={"/agenda/apercu"}>
        <Button className={"w-[400px] h-[40px] mt-5 rounded-md"}>
          Ouvrez l’apercu
        </Button>
      </Link>
      <Button className={"w-[400px] h-[40px] mt-5 rounded-md"}>
        Modifier votre Calendar
      </Button>
    </div>
  );
}
