import Link from "next/link";
import Button from "./Button";

export function SideMenu() {
  return (
    <div className="flex flex-col p-5  border-gradiant h-[100vh] relative ">
      <h1 className=" mb-[80px] font-semibold text-[1.5em] text-center">
        Bienvenue <br /> Thomas
      </h1>
      <Button
        className={"rounded-md w-[250px] h-[40px] "}
        children={"+ Créez"}
      ></Button>
      <div className="mt-[80px] mb-[80px] flex flex-col text-[1.3em] font-medium">
        <Link className="m-2" href={"/"}>
          Mon agenda
        </Link>
        <Link className="m-2" href={"/"}>
          Gestions
        </Link>
        <Link className="m-2" href={"/"}>
          Profil
        </Link>
      </div>
      <div className="absolute bottom-[10%]">
        <Button
          className={"rounded-md w-[250px] h-[40px] "}
          children={"Déconnexion"}
        ></Button>
      </div>
    </div>
  );
}
