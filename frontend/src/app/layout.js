"use client";

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NavbarProfile from "../components/NavbarProfile";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAccessActive = pathname.startsWith("/login");
  const isPrivateZone = pathname.startsWith("/dashboard") || pathname.startsWith("/vocacion");

  // Verificar la sesión para saber si pintar ACCESO o el Perfil
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname]);

  const getButtonStyle = (path) => {
    const isActive = path === "/login" ? isAccessActive : pathname === path;
    return isActive
      ? "bg-[#1e293b] text-white border border-slate-600 shadow-lg scale-105"
      : "bg-white text-[#1e293b] shadow-[0_4px_12px_rgba(125,211,252,0.3)] hover:scale-105";
  };

  return (
    <html lang="es">
      <body className="antialiased bg-[#e5e7eb] font-sans" suppressHydrationWarning>

        <nav className="fixed top-0 w-full z-50 px-10 py-3 flex justify-between items-center bg-[linear-gradient(135deg,_#94a3b8_0%,_#334155_45%,_#1e293b_100%)] shadow-xl">

          {/* Logo Diamante Izquierda */}
          <Link href="/" className="flex items-center justify-center group">
            <div className="w-14 h-14 flex items-center justify-center bg-[#e5e7eb] rounded-xl relative overflow-hidden transition-all hover:scale-110 active:scale-95">
              <Image
                src="/layout3.png"
                alt="Me Vocatio Diamond"
                width={120}
                height={120}
                priority
                className="object-contain scale-[3.8] mix-blend-multiply -ml-0.5 translate-y-[2px]"
              />
            </div>
          </Link>

          {/* Bloque de Acciones Derecha (Limpio y alineado) */}
          <div className="flex gap-4 items-center">

            {/* Un solo botón de NOSOTROS */}
            <Link
              href="/nosotros"
              className={`${getButtonStyle("/nosotros")} px-7 py-2.5 rounded-full text-[11px] font-black transition-all active:scale-95 uppercase tracking-widest`}
            >
              NOSOTROS
            </Link>

            {/* 🔄 INTERCAMBIO PERFECTO: O se muestra ACCESO o se muestra el Perfil */}
            {!isLoggedIn || !isPrivateZone ? (
              <Link
                href="/login"
                className={`${getButtonStyle("/login")} px-6 py-2.5 rounded-full text-[11px] font-black transition-all active:scale-95 uppercase tracking-widest`}
              >
                ACCESO
              </Link>
            ) : (
              <NavbarProfile />
            )}

          </div>

        </nav>

        <main className="mt-[72px] bg-[#e5e7eb] min-h-screen">{children}</main>
      </body>
    </html>
  );
}