"use client";
import { useUser } from "@/contexts/UserContext";
import { checkEmail } from "@/utils/check-emailsyntax";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

export default function Profil() {
  // Context
  const { user, fetchUser, status } = useUser();

  // Variables
  const [modalEditProfil, setModalEditProfil] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Cycle
  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  // Function
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
      const response = await fetch("/api/updateProfilUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        return toast.error(errorData);
      }
      await fetchUser();
      toast.success("Profil mis à jour");
      setModalEditProfil(false);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      return toast.error(e.message);
    }
  };

  // Loading session
  if (status === "loading" || !user) {
    return <Loading />;
  }

  return (
    <div className="mt-[100px] flex flex-col justify-center text-center w-full h-full relative">
      {/* User info */}
      <h1 className="text-[1.3em] font-semibold">Profil</h1>
      <div className="text-[1.1em] mt-[30px]">
        <h3>
          <span className="font-semibold">Nom :</span> {user.lastname}
        </h3>
        <h3 className="mt-2">
          <span className="font-semibold">Prénom :</span> {user.firstname}
        </h3>
        <h3 className="mt-2">
          <span className="font-semibold">Email :</span> {user.email}
        </h3>
      </div>
      <div className="">
        <Button
          onClick={() => {
            setModalEditProfil(true);
          }}
          className={"w-[400px] h-[40px] rounded-md mt-[100px]"}
        >
          Modifier le profil
        </Button>

        {/* Form update profil */}
        {modalEditProfil && (
          <div className="mt-2 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-gradiant-color w-[600px] h-[500px] text-white text-center rounded-md">
            <button
              type="submit"
              onClick={() => {
                setModalEditProfil(false);
              }}
              className="absolute text-[1em] font-medium w-[40px] h-[40px] right-5 top-1 text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
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
                className="mt-5 w-[300px] h-[35px] p-5 rounded-md focus:outline-none text-black bg-gradiant-transparent"
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="mt-5 w-[300px] h-[35px] p-5 rounded-md focus:outline-none text-black bg-gradiant-transparent"
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {loading ? (
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
              ) : (
                <button
                  type="submit"
                  className="mt-5 text-[1.2em] hover:text-red-900 hover:font-extrabold transition-all"
                >
                  Enregistrer
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
