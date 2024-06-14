"use client";

import { createCalendar, infoDaysCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Date() {
  // Variable
  const { data: session } = useSession();
  const [dates, setDates] = useState([]);
  const router = useRouter();

  const week = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  // Functions

  const toggleDate = (day) => {
    if (dates.includes(day)) {
      setDates(dates.filter((d) => d !== day));
    } else {
      setDates([...dates, day]);
    }
  };

  const createDate = async (event) => {
    event.preventDefault();
    if (dates.length === 0) {
      return toast.error("Vous devez choisir au moins 1 jour");
    }
    try {
      await infoDaysCalendar(dates);
      toast.success("Enregistrez");
      router.push("/create/horraire");
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.5em] font-semibold mb-[50px]">
        Vos Disponibilités
      </h1>
      <form onSubmit={createDate}>
        <div className="flex flex-col justify-center items-center text-[1.3em]">
          {getDays(session.user.reservations).map((day, index) => (
            <div key={index} className="flex mt-5">
              <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center text-white">
                {day}
              </div>
              <button
                type="button"
                onClick={() => toggleDate(day)}
                className={`text-[1.3em] ml-5 w-[50px] rounded-full flex justify-center items-center ${
                  dates.includes(day)
                    ? " border border-green-500 text-green-500"
                    : "border border-black hover:border-[2px]"
                }`}
              >
                {dates.includes(day) ? "✓" : "+"}
              </button>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className="mt-[40px] w-[500px] h-[40px] rounded-md text-white flex justify-center items-center"
        >
          Valider
        </Button>
      </form>
    </div>
  );
}
