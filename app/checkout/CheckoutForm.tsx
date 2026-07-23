
"use client";

import { useState } from "react";
import { useCart } from "../components/CartContext";
import { MercadoPagoButton } from "../components/MercadoPagoButton";

const shippingOptions = [
  "Correo Argentino",
  "Andreani",
  "Retiro en General Las Heras",
  "Entrega local",
  "Envío a coordinar",
];

const paymentOptions = [
  "Mercado Pago / Tarjeta",
  "Transferencia bancaria",
  "Efectivo al retirar",
  "Pago a coordinar",
];

export function CheckoutForm() {
  const { items, totalValue, clearCart } = useCart();
  const [sent, setSent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    province: "",
    address: "",
    shipping: shippingOptions[0],
    payment: paymentOptions[0],
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-[#2d1d13] border border-white/10 rounded-[3rem] p-10 text-center">
        <h1 className="text-4xl font-black mb-4">Pedido generado</h1>
        <p className="text-zinc-400 mb-8">
          El pedido quedó confirmado visualmente. Si elegiste Mercado Pago, también podés pagar online.
        </p>
        <div className="max-w-md mx-auto space-y-3">
          <MercadoPagoButton customer={form} />
          <button
            type="button"
            onClick={clearCart}
            className="w-full border border-white/10 px-8 py-4 rounded-2xl font-black"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
      <div className="space-y-6">
        <Progress />

        <div className="bg-[#2d1d13] border border-white/10 rounded-[3rem] p-8 space-y-5">
          <h1 className="text-4xl font-black mb-6">Datos de entrega</h1>
          <Input label="Nombre completo" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Input label="Teléfono" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Localidad" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Input label="Provincia" value={form.province} onChange={(v) => setForm({ ...form, province: v })} />
          </div>
          <Input label="Dirección" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        </div>

        <div className="bg-[#2d1d13] border border-white/10 rounded-[3rem] p-8 space-y-5">
          <h2 className="text-3xl font-black">Pago y envío</h2>
          <Select label="Medio de envío" value={form.shipping} options={shippingOptions} onChange={(v) => setForm({ ...form, shipping: v })} />
          <Select label="Forma de pago" value={form.payment} options={paymentOptions} onChange={(v) => setForm({ ...form, payment: v })} />
          <Input label="Cupón visual" value={coupon} onChange={setCoupon} />
        </div>
      </div>

      <div className="bg-[#2d1d13] border border-white/10 rounded-[3rem] p-8 sticky top-24">
        <h2 className="text-3xl font-black mb-6">Resumen del pedido</h2>

        {items.length === 0 ? (
          <p className="text-zinc-500">No hay productos en el carrito.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b border-white/10 pb-4">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-zinc-500">Cantidad: {item.quantity}</p>
                {item.personalization && (
                  <p className="text-sm text-zinc-500">Grabado: {item.personalization}</p>
                )}
              </div>
            ))}

            <div className="bg-[#1d130d]/40 rounded-2xl p-4 space-y-2 text-zinc-300">
              <p>🚚 {form.shipping}</p>
              <p>💳 {form.payment}</p>
              <p>⏱ Producción: 2 a 5 días hábiles</p>
              {coupon && <p>🎟 Cupón: {coupon}</p>}
            </div>

            <div className="flex justify-between text-xl font-black pt-3">
              <span>Total</span>
              <span className="text-[#d6b17a]">
                {totalValue > 0 ? `$${totalValue.toLocaleString("es-AR")}` : "A coordinar"}
              </span>
            </div>

            <button className="w-full bg-[#b68b52] text-white py-5 rounded-2xl font-black mt-6">
              Confirmar pedido
            </button>

            {form.payment === "Mercado Pago / Tarjeta" && (
              <MercadoPagoButton customer={form} />
            )}
          </div>
        )}
      </div>
    </form>
  );
}

function Progress() {
  return (
    <div className="bg-[#2d1d13] border border-white/10 rounded-[2rem] p-5">
      <div className="flex gap-3">
        {["Carrito", "Datos", "Pago", "Confirmación"].map((x, i) => (
          <div key={x} className="flex-1 text-center">
            <div className={`h-2 rounded-full mb-3 ${i < 3 ? "bg-[#b68b52]" : "bg-white/10"}`} />
            <p className="text-xs text-zinc-400">{x}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-[#d6b17a] mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full bg-[#1d130d] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-[#b68b52]"
      />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-[#d6b17a] mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1d130d] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-[#b68b52]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
