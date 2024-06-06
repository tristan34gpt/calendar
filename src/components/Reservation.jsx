"use client";

export function Reservation({
  children,
  detailsReservation,
  SetDetailsReservation,
}) {
  return (
    <>
      <div className="flex relative">
        <button className="bg-gradiant-color rounded-md flex justify-between w-[400px] h-[30px] text-white items-center ">
          {children}
        </button>
        <button
          onClick={() => {
            SetDetailsReservation(true);
          }}
          className="border-[1px] rounded-lg w-[30px] h-[30px] border-black ml-5 text-[1.2em] "
        >
          +
        </button>

        {/* Modal */}

        {detailsReservation && (
          <div className="bg-gradiant-color w-[600px] h-[500px] text-white text-center rounded-md absolute">
            <button
              onClick={() => {
                SetDetailsReservation(false);
              }}
              className="absolute text-[1em] font-medium  w-[40px] h-[40px] right-5 top-1 text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
            >
              fermer
            </button>
            <h2 className="text-[1.5em] font-semibold mt-[80px]">
              Récapitulatif
            </h2>
            <div className="text-[1.1em]">
              <p className="mt-[100px]">
                <span className="font-medium">Nom :</span> Morgane
              </p>
              <p className="mt-5">
                <span className="font-medium">Prénom :</span> Martinez
              </p>
              <p className="mt-5">
                <span className="font-medium">Chiffre d'affaires :</span> 10
                000€
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-[1.3em] mt-5">
        Vous avez 5 appels à effectuer aujourd'hui.
      </p>
    </>
  );
}
