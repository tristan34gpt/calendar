"use client";

import { updateUser } from "@/actions/create-user";
import Button from "@/components/Button";
import { useSessionWithRefresh } from "@/hook/useSessionWithRefresh";
import { checkEmail } from "@/utils/check-emailsyntax";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profil() {
  const { session, status, refreshSession, isRefreshing } =
    useSessionWithRefresh();

  if (status === "loading" || isRefreshing) {
    <div className="flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
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
    </div>;
  }

  if (status === "unauthenticated") {
    return <div>User is not authenticated</div>;
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
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
    );
  }

  //state
  const [modalEditProfil, setModalEditProfil] = useState(false);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(session.user.firstname);
  const [lastName, setLastName] = useState(session.user.lastname);
  const [email, setEmail] = useState(session.user.email);

  useEffect(() => {
    if (session) {
      setFirstName(session.user.firstname);
      setLastName(session.user.lastname);
      setEmail(session.user.email);
    }
  }, [session]);
  //function

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!firstName || !lastName || !email) {
      setLoading(false);
      return toast.error("Aucun champ ne doit être vide !");
    }

    if (!checkEmail(email)) {
      setLoading(false);
      return toast.error("Veuillez entrer un email valide");
    }

    try {
      await updateUser(firstName, lastName, email);
      await refreshSession(); // Rafraîchir la session après mise à jour
      setModalEditProfil(false);
      setLoading(false);
      toast.success("Mise à jour du profil avec succès");
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

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
              type="submit"
              onClick={() => {
                setModalEditProfil(false);
              }}
              className="absolute text-[1em] font-medium  w-[40px] h-[40px] right-5 top-1 text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
            >
              fermer
            </button>
            <form onSubmit={updateProfile} className="flex flex-col">
              <h2 className="text-[1.2em] font-semibold mb-[30px]">
                Modifier votre profil
              </h2>
              <input
                className="w-[300px] h-[35px] p-5 rounded-md bg-gradiant-transparent focus:outline-none text-black"
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="mt-5 w-[300px] h-[35px] p-5 rounded-md focus:outline-none text-black gradient-transparent"
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="mt-5 w-[300px] h-[35px] p-5 rounded-md focus:outline-none text-black"
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {loading ? (
                <button
                  type="submit"
                  className="  mt-5 text-[1.2em] hover:text-red-900 hover:font-extrabold transition-all"
                >
                  Enregistrez
                </button>
              ) : (
                <div className="flex justify-center items-center mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3em"
                    height="1.3em"
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
    </div>
  );
}
