import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Login() {
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

          <Input
            type={"email"}
            placeholder={"adresse email"}
            classname={"mt-[50px] w-[70%] h-[40px] "}
          />
          <Input
            type={"password"}
            placeholder={"Mot de passe"}
            classname={"mt-[50px] w-[70%] h-[40px]"}
          />
          <Button
            className={
              "w-[50%] h-[40px] font-semibold rounded-md text-white text-[1.2em] mt-[50px]"
            }
          >
            Connexion
          </Button>
          <p className="mt-[50px] rounded-md">
            Vous n'avez pas encore de compte ?
          </p>
          <p>
            Inscrivez-vous{" "}
            <Link href={"/Inscription"}>
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
