import { useState } from "react";
import { toast } from "react-toastify";

export default function ReservationUser({ date, questions, onSuccess }) {
  const [confirmation, setConfirmation] = useState(false);

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reservationData = {
      email: formData.get("email"),
      date: date,
      questions: questions.map((question, index) => ({
        question,
        answer: formData.get(`question_${index}`),
      })),
    };

    try {
      const response = await fetch("/api/addReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        toast.success("Réservation réussie !");
        onSuccess(); // Notify parent component
        setConfirmation(false);
      } else {
        const data = await response.json();
        toast.error(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast.error("Erreur lors de la réservation. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-full min-w-[600px] text-white text-center">
      <h2 className="mb-5">
        Réserver le créneau :{" "}
        <span className="font-bold text-black">{date}</span>
      </h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        {questions && questions.length > 0 && (
          <>
            <p className="mb-2">Répondez aux questions</p>
            {questions.map((question, index) => (
              <div key={index}>
                <p className="mb-2">{question}</p>
                <textarea
                  className="mb-5 text-black p-2"
                  cols={50}
                  name={`question_${index}`}
                  required
                ></textarea>
              </div>
            ))}
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              required
              className="mb-5 rounded-md p-2 w-[300px] text-black"
            />
            <button className="font-bold text-[1.1em]" type="submit">
              Valider
            </button>
          </>
        )}
      </form>
    </div>
  );
}
