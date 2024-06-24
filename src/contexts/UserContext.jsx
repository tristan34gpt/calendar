import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [reservationUser, setReservationUser] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUser();
      fetchReservation();
      fetchReservationUser();
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

  const fetchReservationUser = async () => {
    try {
      const response = await fetch("/api/viewReservationUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      setReservationUser(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await fetch("/api/fetchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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

  const fetchReservationById = async (id) => {
    try {
      const response = await fetch(`/api/reservation?id=${id}`, {
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

  const fetchReservationUserById = async (id) => {
    try {
      const response = await fetch(`/api/viewReservationUser?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      setReservationUser(data);
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
        reservationUser,
        fetchReservationUser,
        fetchUserById,
        fetchReservationById,
        fetchReservationUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
