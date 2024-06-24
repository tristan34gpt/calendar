"use client";

import { Reservation } from "@/components/Reservation";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { reservationUser } = useUser();
  const [detailsReservation, setDetailsReservation] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setDetailsReservation(true);
  };

  const handleCloseModal = () => {
    setDetailsReservation(false);
    setSelectedReservation(null);
  };

  console.log(reservationUser);
  return (
    <div>
      {reservationUser && reservationUser.length > 0 ? (
        // Display Home with reservations
        <div className="w-[100%] mt-[40px]">
          <h1 className="text-center text-[1.5em] font-semibold">
            Mon CALENDAR
          </h1>
          <div className="ml-[100px] mt-[150px]">
            <h3 className="text-[1.3em] mb-5">Vos réservations</h3>
            {reservationUser.map((reservation) => (
              <div key={reservation._id} className="mt-3">
                <Reservation
                  reservation={reservation}
                  detailsReservation={detailsReservation}
                  handleOpenModal={handleOpenModal}
                  handleCloseModal={handleCloseModal}
                  isModalOpen={selectedReservation === reservation}
                >
                  {reservation.dateReservation}
                </Reservation>
              </div>
            ))}
            <p className="text-[1.3em] mt-5">
              Vous avez {reservationUser.length} appels à effectuer aujourd'hui.
            </p>
          </div>
        </div>
      ) : (
        // Display Home without reservations
        <div className="w-[100%] mt-[40px]">
          <h1 className="text-center text-[1.5em] font-semibold">
            Mon CALENDAR
          </h1>
          <div className="ml-[100px] mt-[150px]">
            <h3 className="text-[1.3em] mb-5">
              Pas de réservation pour l'instant.
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
