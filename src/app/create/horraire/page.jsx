"use client";

import { scheduleCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useUser } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Horraires() {
  const { session, status, reservation } = useUser();

  const startTime = useRef(null);
  const endTime = useRef(null);
  const startPauseTime = useRef(null);
  const endPauseTime = useRef(null);

  const [schedule, setSchedule] = useState([]);
  const [mySchedule, setMySchedule] = useState([]);
  const [modify, setModify] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (reservation) {
        const schedules = [];
        for (const reserv of reservation) {
          if (reserv.schedule && typeof reserv.schedule === "object") {
            schedules.push(reserv.schedule);
          }
          setMySchedule(schedules);
        }
      }
    }
  }, [status, session]);

  // Function

  const createSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!startTime.current.value || !endTime.current.value) {
      setLoading(false);
      return toast.error("Vous devez renseigner vos horaires");
    }

    const newSchedule = {
      startTime: startTime.current.value,
      endTime: endTime.current.value,
    };

    setSchedule([newSchedule]);

    try {
      await scheduleCalendar(newSchedule);
      toast.success("Vos horaires sont enregistrés");
      setModify(false);
      router.push("/create/time");
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Display saved schedules */}
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
                et de
                <span className="font-semibold"> {sched.endPauseTime} </span> à
                <span className="font-semibold"> {sched.endTime} </span>
              </p>
              <Button
                onClick={() => {
                  setModify(true);
                }}
                className={"w-[400px] h-[30px] rounded-md mt-5"}
              >
                Modifier vos horaires
              </Button>
              <Link href={"/create/time"}>
                <Button className={"w-[400px] h-[30px] rounded-md mt-5"}>
                  Suivant
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {(mySchedule.length === 0 || modify) && (
        <div>
          <h1 className="text-center text-[1.3em] font-semibold mb-[70px]">
            Renseignez vos horaires
          </h1>
          <form onSubmit={createSchedule}>
            <div className="text-center">
              <p className="text-[1.2em]">Heure de début</p>
              <input
                className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
                type="time"
                ref={startTime}
              />
              <div></div>
              <p className="text-[1.2em] mt-5">Heure de fin</p>
              <input
                className="mt-5 border-[1px] p-2 rounded-md border-black w-[200px]"
                type="time"
                ref={endTime}
              />
            </div>
            {!loading ? (
              <>
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
              </>
            ) : (
              <div className="flex justify-center items-center mt-[40px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                  >
                    <animateTransform
                      attributeName="transform"
                      dur="0.75s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    ></animateTransform>
                  </path>
                </svg>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
