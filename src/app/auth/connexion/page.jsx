"use client";

// Components
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";

// Library
import { checkEmail } from "@/utils/check-emailsyntax";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  // Variable
  const router = useRouter();

  // Function
  const signinUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // If a field is empty
    if (!email || !password) {
      setLoading(false);
      return toast.error("Veuillez remplir tous les champs");
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      setLoading(false);
      return toast.error("Veuillez entrer un email valide");
    }

    // Signin the user
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        setLoading(false);
        return toast.error(response.error);
      }
    } catch (e) {
      return toast.error(e.message);
      setLoading(false);
    }

    // Success
    toast.success("Vous êtes connecté");
    router.replace("/");
    setLoading(false);
    // Redirect
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[2em] mt-[50px]">
        Connectez-vous
      </h1>
      <div className="form-login">
        {/* Form */}
        <div className="flex flex-col w-full items-center">
          {/* Logo */}
          <Logo className={"mt-[50px]"} />
          <form
            className="flex flex-col w-full items-center"
            onSubmit={signinUser}
          >
            <Input
              type={"email"}
              placeholder={"Adresse email"}
              classname={"mt-[50px] w-[70%] h-[40px] "}
              name={"email"}
            />
            <Input
              type={"password"}
              placeholder={"Mot de passe"}
              classname={"mt-[50px] w-[70%] h-[40px]"}
              name={"password"}
            />
            {!loading ? (
              <Button
                type="submit"
                className={
                  "w-[50%] h-[40px] font-semibold rounded-md text-white text-[1.2em] mt-[50px]"
                }
              >
                Connexion
              </Button>
            ) : (
              <div className="mt-[50px]">Loading...</div>
            )}
          </form>
          <p className="mt-[50px] rounded-md">
            Vous n'avez pas encore de compte ?
          </p>
          <p>
            Inscrivez-vous{" "}
            <Link href={"/auth/inscription"}>
              <span className="font-bold cursor-pointer">ici.</span>
            </Link>
          </p>
        </div>

        <div className="flex flex-col bg-gradiant-color w-full h-[500px] rounded-[5px]">
          <p className="text-center font-semibold text-white mt-[10%] text-[1.3em]">
            <span className="text-black">Créez</span> votre système de
            réservation et partagez-le
          </p>
          <p className="text-center font-semibold text-white text-[1.1em] mt-[2%]">
            Facile, simple et{" "}
            <span className="text-black font-bold text-[1.2em]">
              100% Gratuit
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
