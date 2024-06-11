"use client";
import { SideMenu } from "@/components/SideMenu";
import { useSession } from "next-auth/react";

export default function layout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>User is not authenticated</div>;
  }

  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <html lang="fr">
      <body>
        <div className="flex">
          <SideMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
