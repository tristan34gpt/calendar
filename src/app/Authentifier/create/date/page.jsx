"use client";

import { createCalendar, infoDaysCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Date() {
  // Variables
  const { data: session, status } = useSession();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log(session.user.reservations);
      if (session.user.reservations) {
        const days = [];
        for (const reservation of session.user.reservations) {
          for (const day of reservation.days) {
            days.push(day);
          }
        }
        setDates(days);
      }
    }
  }, [status, session]);

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
    setLoading(true);
    if (dates.length === 0) {
      setLoading(false);
      return toast.error("Vous devez choisir au moins 1 jour");
    }
    try {
      await infoDaysCalendar(dates);
      toast.success("Enregistrez");
      router.push("/authentifier/create/horraire");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.5em] font-semibold mb-[50px]">
        Vos Disponibilités
      </h1>
      <form onSubmit={createDate}>
        <div className="flex flex-col justify-center items-center text-[1.3em]">
          {session.user.reservations.length > 0 ? (
            week.map((day, index) => (
              <div key={index} className="flex mt-5">
                <div className="bg-gradiant-color w-[400px] h-[40px] text-center rounded-md flex justify-center items-center text-white">
                  {day}
                </div>
                <button
                  type="button"
                  onClick={() => toggleDate(day)}
                  className={`text-[1.3em] ml-5 w-[50px] rounded-full flex justify-center items-center ${
                    dates.includes(day)
                      ? "border border-green-500 text-green-500"
                      : "border border-black hover:border-[2px]"
                  }`}
                >
                  {dates.includes(day) ? "✓" : "+"}
                </button>
              </div>
            ))
          ) : (
            <p>Pas de sessions</p>
          )}
        </div>
        {!loading ? (
          <Button
            type="submit"
            className="mt-[40px] w-[500px] h-[40px] rounded-md text-white flex justify-center items-center"
          >
            Valider
          </Button>
        ) : (
          <div className="flex justify-center items-center mt-[40px]">
            {" "}
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
  );
}
