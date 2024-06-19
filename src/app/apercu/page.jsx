"use client";

import Logo from "@/components/Logo";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export default function Apercu() {
  const { user, session, reservation, status } = useUser();
  const [reserv, setReserv] = useState([]);

  //Cycle
  useEffect(() => {
    if (reservation) {
      for (const reserv of reservation) {
        setReserv(reserv);
      }
    }
  }, [reservation]);

  if (status === "loading") {
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

  const week = [
    "Lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  const date = new Date();
  const options = { month: "long" };
  const currentMonth = date.toLocaleString("fr-FR", options);
  const yearOptions = { year: "numeric" };
  const currentYear = date.toLocaleString("fr-FR", yearOptions);

  return (
    <>
      <Link href={"/authentifier/agenda"}>
        <div className="flex p-5 items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.25em"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8S8 119 8 256m448 0c0 110.5-89.5 200-200 200S56 366.5 56 256S145.5 56 256 56s200 89.5 200 200m-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12"
            ></path>
          </svg>
          <h2 className="ml-2 text-[1.3em]">Retour</h2>
        </div>
      </Link>
      <div className="w-full h-[100vh] flex flex-col justify-center ">
        <div className=" border-[2px] border-gradiant m-5 flex">
          {/* Side bar infos */}
          <div className="border-right border-[2px] w-[20%] text-center ">
            <h2 className="text-[1.2em] font-semibold mt-5 mb-[30px]">
              {session.user.firstname + " " + session.user.lastname}
            </h2>
            <h3 className="text-[1.3em] mb-[50px]">Durées 30 minutes</h3>
            <Logo />
          </div>
          {/* Calendar */}
          <div className="w-full text-center">
            <h3 className="text-[1.4em] font-semibold mt-5">
              Selectioner une date
            </h3>
            <h3 className="text-[1.2em] mt-2">
              {currentMonth + " " + currentYear}
            </h3>

            <div className="flex justify-between mt-5 p-5">
              {session.user.reservations.map((reservation, index) => (
                <div
                  key={reservation._id}
                  className="m-2 flex justify-between w-full"
                >
                  {reservation.days.map((day, dayIndex) => (
                    <div className="text-[1.1em]" key={dayIndex}>
                      {day}
                      {[
                        "8h00",
                        "10h00",
                        "11h00",
                        "14h00",
                        "16h00",
                        "18h00",
                        "19h00",
                      ].map((hour, hourIndex) => (
                        <div
                          className="bg-gradiant-color text-white m-2 w-[90px] p-2 rounded-md cursor-pointer"
                          key={hourIndex}
                        >
                          {hour}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
