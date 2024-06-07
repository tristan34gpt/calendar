"use client";

import { scheduleCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Horraires() {
  const startTime = useRef(null);
  const endTime = useRef(null);
  const startPauseTime = useRef(null);
  const endPauseTime = useRef(null);

  const [schedule, setShedule] = useState([]);

  const router = useRouter();

  //Function

  const createShedule = async () => {
    if (
      !startTime.current.value ||
      !endTime.current.value ||
      !startPauseTime.current.value ||
      !endPauseTime.current.value
    ) {
      return toast.error("Vous devez renseigner vos horaires");
    }

    const newSchedule = {
      startTime: startTime.current.value,
      endTime: endTime.current.value,
      startPauseTime: startPauseTime.current.value,
      endPauseTime: endPauseTime.current.value,
    };

    setShedule([newSchedule]);
    try {
      await scheduleCalendar(schedule);
      toast.success("Vos horaires sont enregistrés");
      router.push("/create/vueCalendar");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-[1.3em] font-semibold mb-[70px] ">
        Renseignez vos horaires
      </h1>
      <form action={createShedule}>
        {/* Preview */}

        <div className="text-center">
          <p className="text-[1.2em]">Heure de début</p>

          <input
            className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
            type="time"
            ref={startTime}
          />
          <div>
            <p className="text-[1.2em] mt-5">Horraire indisponible</p>
            <input
              className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
              type="time"
              ref={startPauseTime}
            />
            <input
              className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px] ml-5"
              type="time"
              ref={endPauseTime}
            />
          </div>
          <p className="text-[1.2em] mt-5">Heure de fin</p>
          <input
            className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
            type="time"
            ref={endTime}
          />
        </div>
        <Button
          type={"submit"}
          className={"w-[400px] h-[40px] rounded-md mt-[50px]"}
        >
          Valider
        </Button>
      </form>
    </div>
  );
}
