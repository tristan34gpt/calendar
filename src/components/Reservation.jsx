"use client";

import { useEffect } from "react";

export function Reservation({
  children,
  reservation,
  detailsReservation,
  handleOpenModal,
  handleCloseModal,
  isModalOpen,
}) {
  useEffect(() => {
    if (reservation) {
      console.log(reservation);
    }
  }, [reservation]);

  if (!reservation) {
    return null;
  }

  return (
    <>
      <div className="flex relative">
        <button className="bg-gradiant-color rounded-md w-[400px] h-[30px] text-white items-center">
          {children}
        </button>
        <button
          onClick={() => handleOpenModal(reservation)}
          className="border-[1px] rounded-lg w-[30px] h-[30px] border-black ml-5 text-[1.2em]"
        >
          +
        </button>

        {/* Modal */}
        {isModalOpen && detailsReservation && (
          <>
            {/* Background overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

            {/* Modal content */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-gradiant-color w-[600px]  text-white text-center rounded-md p-5 relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-5 right-5 text-[1em] font-medium w-[40px] h-[40px] text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
                >
                  fermer
                </button>
                <h2 className="text-[1.5em] font-semibold mt-[40px]">
                  Récapitulatif
                </h2>
                <div className="text-[1.1em] mt-[20px]">
                  <p className="mb-2">
                    Date de Réservation: {reservation.dateReservation}
                  </p>
                  <p className="mb-2">Email : {reservation.emailReservation}</p>
                  <div>
                    {reservation.questionsReservation.map(
                      (questionObj, qIndex) => (
                        <div key={qIndex}>
                          <p className="mb-2">
                            Question : {questionObj.question}
                          </p>
                          <p className="mb-2">Réponse : {questionObj.answer}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
