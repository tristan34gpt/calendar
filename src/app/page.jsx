"use client";

import { Reservation } from "@/components/Reservation";
import { SideMenu } from "@/components/SideMenu";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  const [detailsReservation, SetDetailsReservation] = useState(false);

  return (
    <div>
      {/* Display Home */}
      <div className="w-[100%] mt-[40px]">
        <h1 className=" text-center text-[1.5em] font-semibold">
          Mon CALENDAR{" "}
        </h1>
        <div className="ml-[100px] mt-[150px]">
          <h3 className="text-[1.3em] mb-5">Réservation aujourd'hui. </h3>
          {/* reservation */}
          <Reservation
            detailsReservation={detailsReservation}
            SetDetailsReservation={SetDetailsReservation}
            children={"8h-9h"}
          />
        </div>
      </div>
    </div>
  );
}
