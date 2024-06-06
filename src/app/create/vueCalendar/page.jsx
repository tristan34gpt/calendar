"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function View() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.4em] font-semibold mb-[80px]">
        Planning visible sur
      </h1>
      <div className="flex flex-col">
        <Button className={"w-[400px] h-[40px] rounded-md"}>1 semaine </Button>
        <Button className={"w-[400px] h-[40px] mt-2 rounded-md"}>
          2 semaines{" "}
        </Button>
        <Button className={"w-[400px] h-[40px] mt-2 rounded-md"}>
          3 semaines{" "}
        </Button>
        <Button className={"w-[400px] h-[40px] mt-2 rounded-md"}>1 mois</Button>
      </div>
      <Link href={"/create/time"}>
        <Button className={"w-[500px] h-[40px] mt-[30px] rounded-md"}>
          Valider
        </Button>
      </Link>
    </div>
  );
}
