"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function Horraires() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-[1.3em] font-semibold mb-[100px] ">Horraire</h1>
      <div className="text-center">
        <p className="text-[1.2em]">Heure de début</p>
        <input
          className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
          type="time"
        />
        <p className="text-[1.2em] mt-5">Heure de fin</p>
        <input
          className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
          type="time"
        />
      </div>
      <Link href={"/create/vueCalendar"}>
        <Button className={"w-[400px] h-[40px] rounded-md mt-[50px]"}>
          Valider
        </Button>
      </Link>
    </div>
  );
}
