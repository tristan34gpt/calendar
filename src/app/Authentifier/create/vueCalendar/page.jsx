"use client";

import { ViewCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useUser } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function View() {
  const { session, status, reservation } = useUser();

  //Variable
  const [view, setView] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (reservation) {
        for (const reserv of reservation) {
          if (reserv.view) {
            setView(reserv.view);
          }
        }
      }
    }
  }, [status, session]);

  //Function

  const addView = (newView) => {
    setView(newView);
  };

  const createView = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!view) {
      setLoading(false);
      return toast.error("Choisissez une vue");
    }
    try {
      await ViewCalendar(view);
      toast.success("Votre visibilité a été enregistrée");
      router.push("/authentifier/create/time");
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[1.4em] font-semibold mb-[80px]">
        Planning visible sur
      </h1>
      <form onSubmit={createView}>
        <div className="flex flex-col">
          {["1 semaine", "2 semaines", "3 semaines", "1 mois"].map(
            (newView, index) => (
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={() => addView(newView)}
                  type={"button"}
                  className={`w-[400px] h-[40px] rounded-md m-1 text-white ${
                    newView == view
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
        {!loading ? (
          <Button
            type={"submit"}
            className={"w-[500px] h-[40px] mt-[30px] rounded-md"}
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
    </div>
  );
}
