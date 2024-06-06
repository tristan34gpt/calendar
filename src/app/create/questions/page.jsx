"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";

export default function Question() {
  const [modale, setModale] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <h1 className="text-[1.4em] font-semibold mb-[80px]">Questionnaire</h1>
      <div className="flex">
        <h3 className="text-[1.2em]">Questionnaires</h3>
        <button
          onClick={() => {
            setModale(true);
          }}
          className="border rounded-md w-[30px] h-[30px] ml-5 font-semibold hover:h-[35px] hover:w-[35px]"
        >
          +
        </button>
        {modale && (
          <div className=" mt-2 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-gradiant-color w-[600px] h-[500px] text-white text-center rounded-md">
            <button
              onClick={() => {
                setModale(false);
              }}
              className="absolute text-[1em] font-medium  w-[40px] h-[40px] right-5 top-1 text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
            >
              fermer
            </button>
            <form className="flex flex-col">
              <h2 className="text-[1.2em] font-semibold mb-[30px]">
                Questions
              </h2>

              <textarea
                className="p-5 w-[500px] rounded-md bg-gradiant-transparent focus:outline-none text-black"
                placeholder="Exemple : Qu'elle est votre prénom"
              ></textarea>
            </form>
            <button className="mt-5 text-[1.2em] hover:text-red-900 hover:font-extrabold transition-all">
              Enregistrez
            </button>
          </div>
        )}
      </div>
      <Link href={"/agenda"}>
        <Button className={"w-[400px] h-[30px] rounded-md mt-[30px]"}>
          Valider
        </Button>
      </Link>
    </div>
  );
}
