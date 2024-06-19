"use client";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUser();
      fetchReservation(); // Assurez-vous que les réservations sont récupérées lorsque la session est disponible
    }
  }, [session]);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: session.user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchReservation = async () => {
    try {
      const response = await fetch("/api/reservation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      setReservation(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUser,
        status,
        session,
        reservation,
        fetchReservation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
