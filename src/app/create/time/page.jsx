"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";

export default function Time() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.3em] font-semibold mb-[80px]">Durée de l'appel</h1>

      <div>
        <input
          className="w-[300px] text-[1.3em] border border-black  p-2 rounded-md"
          type="time"
        />
      </div>
      <Link href={"/create/questions"}>
        <Button className={"w-[400px] h-[40px] rounded-md mt-[30px]"}>
          Valider
        </Button>
      </Link>
    </div>
  );
}
