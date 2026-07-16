
"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type CustomerData = {
  name: string;
  phone: string;
  city: string;
  province: string;
  address: string;
  shipping: string;
  payment: string;
};

export function MercadoPagoButton({ customer }: { customer: CustomerData }) {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, customer }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo iniciar el pago.");
      }

      const url = data.init_point || data.sandbox_init_point;

      if (!url) {
        throw new Error("Mercado Pago no devolvió un link de pago.");
      }

      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar Mercado Pago.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={pay}
        disabled={loading || items.length === 0}
        className="w-full bg-[#009ee3] text-white py-5 rounded-2xl font-black hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creando pago..." : "Pagar con Mercado Pago / Tarjeta"}
      </button>

      {error && (
        <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4 text-red-200 text-sm">
          {error}
        </div>
      )}

      <p className="text-xs text-zinc-500">
        Para activar el pago real, configurá MERCADO_PAGO_ACCESS_TOKEN en Vercel.
      </p>
    </div>
  );
}
