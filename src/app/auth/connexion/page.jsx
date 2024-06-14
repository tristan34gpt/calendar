"use client";

// Components
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";

// library
import { checkEmail } from "@/utils/check-emailsyntax";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  //variable
  const router = useRouter();

  //Function
  const signinUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    //If a field is empty
    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs");
    }

    //check if the email is valid
    if (!checkEmail(email)) {
      return toast.error("Veuillez entrer un email valide");
    }

    //Signin the use
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        return toast.error(response.error);
      }
    } catch (e) {
      return toast.error(e.message);
    }

    //succes

    toast.success("Vous êtes connecté");
    router.replace("/authentifier");

    //Redirect
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[2em] mt-[50px]">
        Connectez-vous
      </h1>
      <div className="form-login">
        {/* Form */}
        <div className="flex flex-col w-full  items-center">
          {/* Logo */}
          <Logo className={"mt-[50px]"} />
          <form
            className="flex flex-col w-full items-center"
            onSubmit={signinUser}
          >
            <Input
              type={"email"}
              placeholder={"adresse email"}
              classname={"mt-[50px] w-[70%] h-[40px] "}
              name={"email"}
            />
            <Input
              type={"password"}
              placeholder={"Mot de passe"}
              classname={"mt-[50px] w-[70%] h-[40px]"}
              name={"password"}
            />
            <Button
              type="submit"
              className={
                "w-[50%] h-[40px] font-semibold rounded-md text-white text-[1.2em] mt-[50px]"
              }
            >
              Connexion
            </Button>
          </form>
          <p className="mt-[50px] rounded-md">
            Vous n'avez pas encore de compte ?
          </p>
          <p>
            Inscrivez-vous{" "}
            <Link href={"/inscription"}>
              <span className="font-bold cursor-pointer">ici.</span>
            </Link>
          </p>
        </div>

        {/*  */}
        <div className="flex flex-col bg-gradiant-color w-full h-[500px] rounded-[5px]">
          <p className="text-center font-semibold text-white mt-[10%] text-[1.3em]">
            <span className="text-black">Créer</span> votre système de
            réservation et partagez-le
          </p>
          <p className="text-center font-semibold text-white text-[1.1em] mt-[2%]">
            Facile simple et{" "}
            <span className="text-black  font-bold text-[1.2em]">
              100% Gratuit
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
