"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

/**
 * Modal para recuperar contraseña.
 * Recibe `onClose` para cerrarse desde el componente padre.
 */
export default function ModalOlvidePassword({ onClose }) {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      Swal.fire({
        title: "¡Correo Enviado exitosamente!",
        text: "Revisa la bandeja de entrada de tu correo.",
        icon: "success",
        iconColor: "#3492ba",
        background: "#2d2d2d",
        color: "#ffffff",
        confirmButtonColor: "#1e293b",
        confirmButtonText: "Entendido",
        customClass: { popup: "rounded-2xl border border-slate-600" },
      });
      onClose();
      setEmail("");
    } catch (error) {
      Swal.fire({
        title: "Hubo un error",
        text: error.message || "No pudimos enviar el correo.",
        icon: "error",
        iconColor: "#ef4444",
        background: "#2d2d2d",
        color: "#ffffff",
        confirmButtonColor: "#1e293b",
        confirmButtonText: "Reintentar",
        customClass: { popup: "rounded-2xl border border-slate-600" },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#1e293b]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-200 animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            ¿Olvidaste tu contraseña?
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
            Introduce tu email para recuperar el acceso
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Email de recuperación
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-900 transition-all font-bold text-slate-800 text-sm"
              placeholder="TU-EMAIL@EJEMPLO.COM"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-[#1e293b] text-white font-black rounded-xl shadow-lg hover:bg-slate-800 transition-all uppercase text-[11px] tracking-[0.3em]"
          >
            Enviar Enlace
          </button>
        </form>
      </div>
    </div>
  );
}
