"use client";
import { SideMenu } from "@/components/SideMenu";
import { UserProvider } from "@/contexts/UserContext";

export default function layout({ children }) {
  return (
    <html lang="fr">
      <body>
        <UserProvider>
          <div className="flex">
            <SideMenu />
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
