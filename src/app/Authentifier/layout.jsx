"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { SideMenu } from "@/components/SideMenu";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";

function Content({ children }) {
  const { fetchUser, fetchReservation } = useUser();
  const { data: session, status } = useSession();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        await fetchUser();
        await fetchReservation();
        setIsDataLoaded(true);
      }
    };

    fetchData();
  }, [session]);

  if (status === "loading" || !isDataLoaded) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <SideMenu />
      {children}
    </div>
  );
}

export default function Layout({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <html lang="fr">
        <body>
          <Loading />
        </body>
      </html>
    );
  }

  return (
    <html lang="fr">
      <body>
        <UserProvider>
          <Content>{children}</Content>
        </UserProvider>
      </body>
    </html>
  );
}
