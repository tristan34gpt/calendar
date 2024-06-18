"use client";

import { timeCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Time() {
  const { data: session, status } = useSession();

  const [time, setTime] = useState();
  const [myTime, setMyTime] = useState(null);
  const [modify, setModify] = useState(false);
  const timeRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log(session.user.reservations);
      if (session.user.reservations) {
        for (const reservation of session.user.reservations) {
          //  setDates(days);
          setMyTime(reservation.time);
        }
      }
    }
  }, [status, session]);

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
      {myTime && (
        <div className="flex flex-col justify-center items-center">
          <p>
            Durré de l'appel <span className="font-semibold">{myTime} h</span>
          </p>

          <Button
            className={"w-[300px] rounded-md h-[30px] mt-5 mb-2"}
            onClick={() => {
              setModify(!modify);
            }}
          >
            {modify
              ? " Anuler les modification"
              : " Modifer la durée de l'appel"}
          </Button>
          <Link href={"/authentifier/create/questions"}>
            <Button className={"w-[300px] rounded-md h-[30px] mt-5 mb-5"}>
              Suivant
            </Button>
          </Link>
        </div>
      )}
      {(modify || !myTime) && (
        <form
          action={createTime}
          className="flex flex-col justify-center items-center"
        >
          <div>
            <input
              className="w-[300px] text-[1.3em] border border-black p-2 rounded-md"
              type="time"
              ref={timeRef}
              onChange={() => setTime(timeRef.current.value)}
            />
          </div>
          <Button className="w-[400px] h-[40px] rounded-md mt-[30px]">
            Valider
          </Button>
        </form>
      )}
    </div>
  );
}
