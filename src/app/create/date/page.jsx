"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function Date() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.5em] font-semibold mb-[50px]">
        Vos Disponibilité{" "}
      </h1>
      <div className="flex flex-col justify-center items-center text-[1.3em]">
        <div className="flex  ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center  text-white">
            Lundi
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
        <div className="flex mt-5 ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center   text-white">
            Mardi
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
        <div className="flex mt-5 ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center   text-white">
            Mercredi
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
        <div className="flex mt-5 ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center    text-white">
            Jeudi
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
        <div className="flex mt-5 ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center   text-white">
            Vendredi
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
        <div className="flex mt-5 ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center   text-white">
            Samedi
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
        <div className="flex mt-5 ">
          <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center     text-white">
            Dimanche
          </div>
          <button className="text-[1.3em] border-[1px] ml-5 w-[50px] rounded-full border-black hover:border-[2px]">
            +
          </button>
        </div>
      </div>
      <Link href={"/create/horraire"}>
        <Button className={"mt-[40px] w-[500px] h-[40px] rounded-md "}>
          Valider
        </Button>
      </Link>
    </div>
  );
}
