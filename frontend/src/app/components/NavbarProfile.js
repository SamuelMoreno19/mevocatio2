'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, FolderHeart, LogIn } from 'lucide-react';

export default function NavbarProfile() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const userName = "Samuel Moreno";
    const userRole = "Estudiante ADSO";

    // Verificar si el usuario tiene sesión activa al cargar la app
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkAuth();
        
        // Listener para actualizar el estado instantáneamente si cambia el almacenamiento
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // Cerrar el menú si el usuario da clic por fuera de la ventanita
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsMenuOpen(false);
        router.replace("/login");
    };

    const handleMisRecursos = () => {
        router.push("/dashboard/recursos"); // O la ruta que definan para sus recursos
        setIsMenuOpen(false);
    };

    // --- RENDERIZADO CONDICIONAL SEGÚN LA SESIÓN ---
    return (
        <div className="absolute top-8 right-10 z-50" ref={menuRef}>
            {!isLoggedIn ? (
                /* CASO A: NO HAY SESIÓN - Se muestra el Botón de Acceso */
                <button
                    onClick={() => router.push("/login")}
                    className="bg-[#1e293b] text-white px-6 py-2.5 rounded-md font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 border border-slate-700 shadow-[0_8px_15px_rgba(30,41,59,0.2)] flex items-center gap-2 cursor-pointer"
                >
                    <LogIn className="w-4 h-4" /> Acceso
                </button>
            ) : (
                /* CASO B: SÍ HAY SESIÓN - Se transforma en la Foto de Perfil */
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-12 h-12 rounded-full bg-[#1e293b] border-2 border-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all text-white overflow-hidden cursor-pointer"
                    >
                        <User className="w-6 h-6 opacity-90" />
                    </button>

                    {/* VENTANITA FLOTANTE (Fiel al boceto image_616642.png) */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200/80 p-5 animate-in fade-in slide-in-from-top-3 duration-200 flex flex-col items-center text-center">
                            
                            {/* Círculo de perfil duplicado en grande dentro del menú */}
                            <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center text-white shadow-inner mb-3">
                                <User className="w-8 h-8 opacity-90" />
                            </div>

                            {/* Información adicional */}
                            <h4 className="text-[#1e293b] font-black text-base tracking-tight">{userName}</h4>
                            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider mb-4">{userRole}</p>
                            
                            <div className="w-full h-[1px] bg-slate-100 mb-4"></div>

                            {/* Botón: Mis recursos */}
                            <button
                                onClick={handleMisRecursos}
                                className="w-full bg-[#1e293b] text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 mb-2 border border-slate-700"
                            >
                                <FolderHeart className="w-3.5 h-3.5" /> Mis Recursos
                            </button>

                            {/* Botón: Salir */}
                            <button
                                onClick={handleLogout}
                                className="w-full bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-3.5 h-3.5" /> Salir
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}