"use client";

import ReservationUser from "@/components/ReservationUser";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Apercu() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const {
    user,
    reservation,
    reservationUser,
    fetchUserById,
    fetchReservationById,
    fetchReservationUserById,
  } = useUser(); // Récupérer les données de l'utilisateur et les réservations

  const [days, setDays] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserById(id);
      fetchReservationById(id);
      fetchReservationUserById(id);
    }
  }, [id]);

  useEffect(() => {
    if (reservation.length > 0 && reservation[0].days) {
      setDays(reservation[0].days);
    }
  }, [reservation]);

  useEffect(() => {
    if (reservationSuccess) {
      fetchUserById(id);
      fetchReservationById(id);
      fetchReservationUserById(id);
      setModal(false);
      setReservationSuccess(false);
    }
  }, [reservationSuccess]);

  if (reservation.length === 0 || !reservation[0].schedule) {
    return <div>Chargement...</div>; // ou un autre message de chargement approprié
  }

  // Fonction pour convertir une chaîne "HH:MM" en minutes
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Fonction pour convertir des minutes en chaîne "HH:MM"
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  // Fonction pour générer des créneaux horaires
  const generateTimeSlots = (start, end, interval) => {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const timeSlots = [];

    for (
      let minutes = startMinutes;
      minutes < endMinutes;
      minutes += interval
    ) {
      timeSlots.push(minutesToTime(minutes));
    }

    return timeSlots;
  };

  // Fonction pour formater les jours en anglais
  const formatDay = (day) => {
    const daysOfWeek = {
      Lundi: "Mon",
      Mardi: "Tue",
      Mercredi: "Wed",
      Jeudi: "Thu",
      Vendredi: "Fri",
      Samedi: "Sat",
      Dimanche: "Sun",
    };
    return daysOfWeek[day] || day;
  };

  // Fonction pour vérifier si un créneau horaire est pris
  const isTimeSlotTaken = (day, time) => {
    const formattedDay = formatDay(day);
    return reservationUser.some((reservation) => {
      const [reservationDay, reservationTime] =
        reservation.dateReservation.split(" ");
      const formattedReservationDay = formatDay(reservationDay);
      return (
        formattedDay === formattedReservationDay && time === reservationTime
      );
    });
  };

  const interval = reservation[0].schedule.time
    ? parseInt(reservation[0].schedule.time.split(":")[1], 10)
    : parseInt(reservation[0].time.split(":")[1], 10);

  const handleTimeSlotClick = (day, hour) => {
    setSelectedDateTime({ day, time: hour });
    setModal(true);
  };

  return (
    <div className="p-5">
      <div className="font-bold text-[1.3em] m-5 text-center">
        Réservez votre créneau
      </div>
      {days.length > 0
        ? days.map((day, index) => (
            <div
              className="border bg-gradient-transparent rounded-md m-3 p-2"
              key={index}
            >
              <div className=" text-[1.05em] font-semibold">
                <p>{day}</p>
                {generateTimeSlots(
                  reservation[0].schedule.startTime,
                  reservation[0].schedule.endTime,
                  interval
                ).map((hour, hourIndex) => (
                  <button
                    onClick={() => handleTimeSlotClick(day, hour)}
                    className={`m-2 w-[100px] rounded-md ${
                      isTimeSlotTaken(day, hour)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradiant-color text-white"
                    }`}
                    key={hourIndex}
                    disabled={isTimeSlotTaken(day, hour)}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
          ))
        : "pas ok"}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradiant-color p-8 rounded-md flex flex-col justify-center items-center">
            <ReservationUser
              date={`${selectedDateTime.day} ${selectedDateTime.time}`}
              questions={reservation[0].questions}
              onSuccess={() => setReservationSuccess(true)}
            />
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded"
              onClick={() => setModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
