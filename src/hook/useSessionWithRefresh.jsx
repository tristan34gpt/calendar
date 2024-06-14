import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export function useSessionWithRefresh() {
  const { data: session, status, update } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshSession = useCallback(async () => {
    setIsRefreshing(true);
    await update(); // Appelle la fonction pour rafraîchir la session
    setIsRefreshing(false);
  }, [update]);

  return {
    session,
    status,
    refreshSession,
    isRefreshing,
  };
}
