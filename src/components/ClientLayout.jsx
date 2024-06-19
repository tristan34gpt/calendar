"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import DefaultLayout from "@/components/DefaultLayout";
import AuthLayout from "@/components/AuthLayout";

function Content({ children }) {
  const { fetchUser, fetchReservation } = useUser();
  const { data: session, status } = useSession();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const pathname = usePathname();

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

  const isSpecialPage =
    pathname === "/auth/connexion" || pathname === "/auth/inscription";

  return isSpecialPage ? (
    <AuthLayout>{children}</AuthLayout>
  ) : (
    <DefaultLayout>{children}</DefaultLayout>
  );
}

export default function ClientLayout({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <UserProvider>
      <Content>{children}</Content>
    </UserProvider>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Loading from "@/components/Loading";
// import { SideMenu } from "@/components/SideMenu";
// import { UserProvider, useUser } from "@/contexts/UserContext";
// import { useSession } from "next-auth/react";
// import "react-toastify/dist/ReactToastify.css";
// import { usePathname } from "next/navigation";

// function Content({ children }) {
//   const { fetchUser, fetchReservation } = useUser();
//   const { data: session, status } = useSession();
//   const [isDataLoaded, setIsDataLoaded] = useState(false);

//   const pathname = usePathname();

//   const isSpecialPage =
//     pathname === "/auth/connexion" || pathname === "/auth/inscription";

//   useEffect(() => {
//     const fetchData = async () => {
//       if (session) {
//         await fetchUser();
//         await fetchReservation();
//         setIsDataLoaded(true);
//       }
//     };

//     fetchData();
//   }, [session]);

//   if (status === "loading" || !isDataLoaded) {
//     return <Loading />;
//   }

//   return (
//     <div className="flex">
//       <SideMenu />
//       {children}
//     </div>
//   );
// }

// export default function ClientLayout({ children }) {
//   const { status } = useSession();

//   if (status === "loading") {
//     return <Loading />;
//   }

//   return (
//     <UserProvider>
//       <Content>{children}</Content>
//     </UserProvider>
//   );
// }
