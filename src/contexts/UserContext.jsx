"use client";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const { createContext, useState, useEffect, useContext } = require("react");

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUser();
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
      toast.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, status, session }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
