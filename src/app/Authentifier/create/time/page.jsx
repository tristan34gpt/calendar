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
  const [loading, setLoading] = useState(false);
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

  const createTime = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!time) {
      setLoading(false);
      return toast.error("Choisissez une durée");
    }

    try {
      await timeCalendar(time);
      toast.success("Durée de l'appel enregistrez");
      router.push("/authentifier/create/questions");
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
          onSubmit={createTime}
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
          {!loading ? (
            <Button
              type={"submit"}
              className="w-[400px] h-[40px] rounded-md mt-[30px]"
            >
              Valider
            </Button>
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
      )}
    </div>
  );
}
