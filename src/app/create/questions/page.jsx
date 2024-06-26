"use client";

import { questionsCalendar } from "@/actions/create-calendar";
import Button from "@/components/Button";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Question() {
  const { session, status, reservation } = useUser();

  const [modale, setModale] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reservation) {
      const questionsArray = [];
      for (const reserv of reservation) {
        if (reserv.questions && reserv.questions.length > 0) {
          for (const question of reserv.questions) {
            questionsArray.push(question);
          }
        }
      }
      setQuestions(questionsArray);
    }
  }, [reservation]);

  const router = useRouter();

  const questionsRef = useRef(null);
  console.log(questions);

  // Fonction pour ajouter une nouvelle question
  const addQuestions = (e) => {
    setModale(false);
    const newQuestion = questionsRef.current.value;
    e.preventDefault();
    if (newQuestion) {
      setQuestions([...questions, newQuestion]);
      questionsRef.current.value = "";
    }
  };

  // Fonction pour supprimer une question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Fonction pour enregistrer les questions
  const createQuestions = async (questions) => {
    setLoading(true);
    try {
      await questionsCalendar(questions);
      toast.success("Enregistré");
      router.push("/agenda");
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <h1 className="text-[1.4em] font-semibold mb-[80px]">Questionnaire</h1>
      <div className="flex">
        <h3 className="text-[1.2em]">Questionnaires</h3>
        <button
          onClick={() => {
            setModale(true);
          }}
          className="border rounded-md w-[30px] h-[30px] ml-5 font-semibold hover:h-[35px] hover:w-[35px]"
        >
          +
        </button>

        {modale && (
          <div className="mt-2 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-gradiant-color w-[600px] h-[500px] text-white text-center rounded-md">
            <button
              onClick={() => {
                setModale(false);
              }}
              className="absolute text-[1em] font-medium w-[40px] h-[40px] right-5 top-1 text-center flex justify-center items-center hover:text-[1.2em] transition-all hover:text-red-900"
            >
              fermer
            </button>
            <form onSubmit={(e) => addQuestions(e)} className="flex flex-col">
              <h2 className="text-[1.2em] font-semibold mb-[30px]">
                Questions
              </h2>

              <textarea
                className="p-5 w-[500px] rounded-md bg-gradiant-transparent focus:outline-none text-black"
                placeholder="Exemple : Quel est votre prénom"
                ref={questionsRef}
                required
              ></textarea>

              <button
                type="submit"
                className="mt-5 text-[1.2em] hover:text-red-900 hover:font-extrabold transition-all"
              >
                Enregistrer
              </button>
            </form>
          </div>
        )}
      </div>
      {!loading ? (
        <>
          <Button
            onClick={() => createQuestions(questions)}
            className={"w-[400px] h-[30px] rounded-md mt-[30px]"}
          >
            Valider
          </Button>
          {questions.length > 0 && (
            <div className="flex flex-col w-full justify-center items-center mt-5">
              <h3 className="text-center text-[1.3em] font-semibold mb-5">
                Vos Questions
              </h3>
              {questions.map((question, index) => (
                <div key={index} className="flex flex-row m-1">
                  <p className="bg-gradiant-color p-2 rounded-md text-white">
                    {question}
                  </p>
                  <button
                    className="ml-2"
                    onClick={() => removeQuestion(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24M100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0m48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center mt-[40px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
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
      )}
    </div>
  );
}
