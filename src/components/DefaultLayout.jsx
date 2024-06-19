"use client";

import { SideMenu } from "@/components/SideMenu";
import "../app/globals.css";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex">
      <SideMenu />
      {children}
    </div>
  );
}
