"use client";

import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Profil() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchReservations = async () => {
        try {
          const response = await fetch("/api/reservations");
          const data = await response.json();
          setReservation(data);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        } finally {
          setLoadingReservations(false);
        }
      };

      fetchReservations();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>User is not authenticated</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }
  //state
  const [modalEditProfil, setModalEditProfil] = useState(false);

  console.log(session);

  //ref
  const firstname = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);

  return (
    <div className="  mt-[100px] flex flex-col  justify-center text-center w-full h-full relative">
      <h1 className="text-[1.3em] font-semibold">Profil</h1>
      <div className="text-[1.1em] mt-[30px]">
        <h3>
          <span className="font-semibold">Nom :</span> {session.user.lastname}
        </h3>
        <h3 className="mt-2">
          <span className="font-semibold">Prénom :</span>{" "}
          {session.user.firstname}
        </h3>
        <h3 className="mt-2">
          <span className="font-semibold">Email :</span> {session.user.email}{" "}
        </h3>
      </div>
      <div className="">
        <Button
          onClick={() => {
            setModalEditProfil(true);
          }}
          className={"w-[400px] h-[40px] rounded-md mt-[100px]"}
        >
          Modifiez le profil
        </Button>

        {/* modale */}

        {modalEditProfil && (
          <div className=" mt-2 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-gradiant-color w-[600px] h-[500px] text-white text-center rounded-md">
            <button
              onClick={() => {
                setModalEditProfil(false);
              }}
              className="absolute text-[1em] font-medium  w-[40px] h-[40px] right-5 top-1 text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
            >
              fermer
            </button>
            <form className="flex flex-col">
              <h2 className="text-[1.2em] font-semibold mb-[30px]">
                Modifier votre profil
              </h2>
              <input
                className="w-[300px] h-[35px] p-5 rounded-md bg-gradiant-transparent focus:outline-none text-black"
                type="text"
                placeholder="Prénom"
                ref={firstname}
              />
              <input
                className="mt-5 w-[300px] h-[35px] p-5 rounded-md focus:outline-none text-black gradient-transparent"
                type="text"
                placeholder="Nom"
                ref={lastName}
              />
              <input
                className="mt-5 w-[300px] h-[35px] p-5 rounded-md focus:outline-none text-black"
                type="email"
                placeholder="Adresse email"
                ref={email}
              />
            </form>
            <button className="mt-5 text-[1.2em] hover:text-red-900 hover:font-extrabold transition-all">
              Enregistrez
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
