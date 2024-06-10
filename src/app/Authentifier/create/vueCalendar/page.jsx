"use client";

import { ViewCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function View() {
  //Variable
  const [view, setView] = useState("");

  const router = useRouter();
  //Function

  const addView = (newView) => {
    setView(newView);
  };

  const createView = async () => {
    if (!view) {
      return toast.error("Choisissez une vue");
    }
    try {
      await ViewCalendar(view);
      toast.success("Votre visibilité a été enregistrée");
      router.push("/create/time");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.4em] font-semibold mb-[80px]">
        Planning visible sur
      </h1>
      <form action={createView}>
        <div className="flex flex-col">
          {["1 semaine", "2 semaines", "3 semaines", "1 mois"].map(
            (newView, index) => (
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={() => addView(newView)}
                  type={"button"}
                  className={`w-[400px] h-[40px] rounded-md m-1 text-white ${
                    newView === view
                      ? " bg-red-300 text-white font-bold"
                      : "bg-gradiant-color"
                  }`}
                  key={index}
                >
                  {newView}
                </button>
              </div>
            )
          )}
        </div>
        <Button className={"w-[500px] h-[40px] mt-[30px] rounded-md"}>
          Valider
        </Button>
      </form>
    </div>
  );
}
