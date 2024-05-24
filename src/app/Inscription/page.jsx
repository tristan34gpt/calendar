import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Signin() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center font-bold text-[2em] mt-[50px]">
        Inscrivez-vous gratuitement
      </h1>
      <div className="form-login mb-[50px]">
        {/* Form */}
        <div className="flex flex-col w-full  items-center">
          {/* Logo */}
          <Logo className={"mt-[50px]"} />

          <Input
            type={"text"}
            placeholder={"Prénom"}
            classname={"mt-[30px] w-[70%] h-[40px] "}
          />
          <Input
            type={"text"}
            placeholder={"Nom"}
            classname={"mt-[30px] w-[70%] h-[40px]"}
          />
          <Input
            type={"email"}
            placeholder={"Adresse email"}
            classname={"mt-[30px] w-[70%] h-[40px]"}
          />
          <Input
            type={"password"}
            placeholder={"Mot de passe"}
            classname={"mt-[30px] w-[70%] h-[40px]"}
          />

          <Input
            type={"password"}
            placeholder={"Confirmation du mot de passe"}
            classname={"mt-[30px] w-[70%] h-[40px]"}
          />
          <Button
            className={
              "w-[50%] h-[40px] font-semibold rounded-md text-white text-[1.2em] mt-[30px]"
            }
          >
            Inscription
          </Button>
          <p className="mt-[30px]  rounded-md">Avez-vous déjà un compte ?</p>
          <p className="mb-[15px]">
            Connectez-vous
            <Link href={"/connexion"}>
              <span className="font-bold cursor-pointer"> ici.</span>
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
