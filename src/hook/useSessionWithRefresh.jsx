import { updateProfilUser } from "@/actions/uptdate-profil";
import { useSession } from "next-auth/react";

export const useSessionWithRefresh = () => {
  const { data: session, status } = useSession();

  const refreshSession = async (updatedUser) => {
    const response = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProfilUser),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh session");
    }

    const data = await response.json();
    return data.user;
  };

  return { session, status, refreshSession };
};
