"use client";
// Components
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";

// Library
import { createUser } from "@/actions/create-user";
import { checkEmail } from "@/utils/check-emailsyntax";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Signin() {
  //Variable
  const router = useRouter();

  //Function
  const prepareCreateUser = async (formData) => {
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordTwoo = formData.get("passwordtwoo");

    // If a field is empty
    if (!firstname || !lastname || !email || !password) {
      //Notification
      return toast.error("Aucun champ ne doit être vide !");
    }

    // If identical passwords

    if (password !== passwordTwoo) {
      return toast.error("Vos mot de passes ne sont pas identiques");
    }
    if (!checkEmail(email)) {
      //Check if the email is valide
      return toast.error("veuillez entrez un email valide");
    }

    try {
      await createUser(firstname, lastname, email, password);
      //Success
      toast.success("Votre compte a bien été crée !");
      //redirect
      router.push("/auth/connexion");
    } catch (error) {
      toast.error(error.message);
    }
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
          <Logo className={"mt-[50px]"} />{" "}
          <form
            className="flex flex-col w-full items-center"
            action={prepareCreateUser}
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
            <Button
              formButton
              className={
                "w-[50%] h-[40px] font-semibold rounded-md text-white text-[1.2em] mt-[30px]"
              }
            >
              Inscription
            </Button>
          </form>
          <p className="mt-[30px]  rounded-md">Avez-vous déjà un compte ?</p>
          <p className="mb-[15px]">
            Connectez-vous
            <Link href={"/connexion"}>
              <span className="font-bold cursor-pointer"> ici.</span>
            </Link>
          </p>
        </div>

        {/*  */}
        <div className="flex flex-col bg-gradiant-color w-full h-[full] rounded-[5px]">
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
