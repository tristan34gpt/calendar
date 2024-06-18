"use client";

import { scheduleCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Horraires() {
  const { data: session, status } = useSession();
  const startTime = useRef(null);
  const endTime = useRef(null);
  const startPauseTime = useRef(null);
  const endPauseTime = useRef(null);

  const [schedule, setShedule] = useState([]);
  const [mySchedule, setMyShedule] = useState([]);
  const [modify, setModify] = useState(false);

  const router = useRouter();

  // console.log(session);

  useEffect(() => {
    if (status === "authenticated" && session) {
      // console.log(session.user.reservations);
      if (session.user.reservations) {
        const schedules = [];
        for (const reservation of session.user.reservations) {
          for (const schedule of reservation.schedule) {
            schedules.push(schedule);
          }
        }
        setMyShedule(schedules);
      }
    }

    console.log(mySchedule);
  }, [status, session]);

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
      router.push("/authentifier/create/vueCalendar");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Afficher les horaires enregistrés */}
      {mySchedule.length > 0 && !modify && (
        <div>
          <h2 className="text-[1.2em] text-center font-semibold">
            Vos horaires
          </h2>
          {mySchedule.map((sched, index) => (
            <div
              key={index}
              className="mt-2 flex flex-col justify-center items-center"
            >
              <p>
                Disponible de
                <span className="font-semibold"> {sched.startTime} </span> à
                <span className="font-semibold"> {sched.startPauseTime} </span>{" "}
                et de{" "}
                <span className="font-semibold"> {sched.endPauseTime} </span> à
                <span className="font-semibold"> {sched.endTime} </span>
              </p>
              <Button
                onClick={() => {
                  setModify(true);
                }}
                className={"w-[400px] h-[30px] rounded-md mt-5"}
              >
                Modifier vos horraire
              </Button>
              <Link href={"/authentifier/create/vueCalendar"}>
                <Button className={"w-[400px] h-[30px] rounded-md mt-5"}>
                  Suivant
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {mySchedule.length > 0 && modify && (
        <div>
          <h1 className=" text-center text-[1.3em] font-semibold mb-[70px] ">
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
            {mySchedule.length > 0 && (
              <Button
                onClick={() => {
                  setModify(false);
                }}
                className={"w-[400px] h-[40px] rounded-md mt-5 block"}
              >
                Annuler les modifications
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
