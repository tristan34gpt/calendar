"use client";

// Components
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";

// Library
import { checkEmail } from "@/utils/check-emailsyntax";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import { createUser } from "@/actions/create-user";

export default function Signin() {
  // Variable
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  // Function
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordTwoo = formData.get("passwordtwoo");

    // If a field is empty
    if (!firstname || !lastname || !email || !password || !passwordTwoo) {
      // Notification
      setLoading(false);
      return toast.error("Aucun champ ne doit être vide !");
    }

    // If identical passwords
    if (password !== passwordTwoo) {
      setLoading(false);
      return toast.error("Vos mots de passe ne sont pas identiques");
    }

    if (!checkEmail(email)) {
      // Check if the email is valid
      setLoading(false);
      return toast.error("Veuillez entrer un email valide");
    }

    try {
      // Success
      await createUser(firstname, lastname, email, password);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
    toast.success("Votre compte a bien été créé !");
    // Redirect
    router.push("/auth/connexion");
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[2em] mt-[50px]">
        Inscrivez-vous gratuitement
      </h1>
      <div className="form-login mb-[50px]">
        {/* Form */}
        <div className="flex flex-col w-full items-center">
          {/* Logo */}
          <Logo className={"mt-[50px]"} />
          <form
            className="flex flex-col w-full items-center"
            onSubmit={handleCreateUser}
          >
            <Input
              type={"text"}
              placeholder={"Prénom"}
              classname={"mt-[30px] w-[70%] h-[40px] "}
              name={"firstname"}
            />
            <Input
              type={"text"}
              placeholder={"Nom"}
              classname={"mt-[30px] w-[70%] h-[40px]"}
              name={"lastname"}
            />
            <Input
              type={"email"}
              placeholder={"Adresse email"}
              classname={"mt-[30px] w-[70%] h-[40px]"}
              name={"email"}
            />
            <Input
              type={"password"}
              placeholder={"Mot de passe"}
              classname={"mt-[30px] w-[70%] h-[40px]"}
              name={"password"}
            />
            <Input
              type={"password"}
              placeholder={"Confirmation du mot de passe"}
              classname={"mt-[30px] w-[70%] h-[40px]"}
              name={"passwordtwoo"}
            />
            {!loading ? (
              <Button
                formButton
                className={
                  "w-[50%] h-[40px] font-semibold rounded-md text-white text-[1.2em] mt-[30px]"
                }
              >
                Inscription
              </Button>
            ) : (
              "Loading..."
            )}
          </form>
          <p className="mt-[30px] rounded-md">Avez-vous déjà un compte ?</p>
          <p className="mb-[15px]">
            Connectez-vous
            <Link href={"/connexion"}>
              <span className="font-bold cursor-pointer"> ici.</span>
            </Link>
          </p>
        </div>

        <div className="flex flex-col bg-gradiant-color w-full h-[full] rounded-[5px]">
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
