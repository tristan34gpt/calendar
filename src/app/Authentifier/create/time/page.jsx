"use client";

import { timeCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Time() {
  const [time, setTime] = useState();

  const timeRef = useRef(null);

  const router = useRouter();

  //Function

  const createTime = async () => {
    if (!time) {
      return toast.error("Choisissez une durée");
    }

    try {
      await timeCalendar(time);
      toast.success("Durée de l'appel enregistrez");
      router.push("/create/questions");
    } catch (e) {
      return toast.error(e.message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.3em] font-semibold mb-[80px]">Durée de l'appel</h1>
      <form
        action={createTime}
        className="flex flex-col justify-center items-center"
      >
        <div>
          <input
            className="w-[300px] text-[1.3em] border border-black  p-2 rounded-md"
            type="time"
            ref={timeRef}
            onChange={() => setTime(timeRef.current.value)}
          />
        </div>
        <Button className={"w-[400px] h-[40px] rounded-md mt-[30px]"}>
          Valider
        </Button>
      </form>
    </div>
  );
}
