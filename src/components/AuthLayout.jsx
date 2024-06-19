"use client";

import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";

export default function SpecialLayout({ children }) {
  return (
    <div className="special-layout">
      {/* Personnalisez le layout spécial ici */}
      {children}
    </div>
  );
}
