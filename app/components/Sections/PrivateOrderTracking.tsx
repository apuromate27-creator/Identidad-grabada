
"use client";

import { FormEvent, useMemo, useState } from "react";
import { demoTrackingOrders, type TrackingOrder } from "../../data/orderTracking";

export function PrivateOrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<TrackingOrder | null>(null);
  const [error, setError] = useState("");

  const normalizedOrder = useMemo(
    () => orderNumber.trim().toUpperCase(),
    [orderNumber]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);

    const found = demoTrackingOrders.find(
      (order) =>
        order.orderNumber.toUpperCase() === normalizedOrder &&
        order.accessEmail.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      setError(
        "No encontramos un pedido con esos datos. Revisá el número de compra y el email utilizado."
      );
      return;
    }

    setResult(found);
  };

  return (
    <div className="grid gap-8">
      <form
        onSubmit={handleSubmit}
        className="v16-private-tracking rounded-[2rem] border border-[#d8aa62]/22 p-6 md:p-8"
      >
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#e2b46d]">
            Acceso privado
          </p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            Consultá únicamente tu pedido
          </h2>
          <p className="mt-4 leading-relaxed text-stone-300">
            Ingresá el número de compra y el correo electrónico usado al realizar el pedido.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-stone-200">
              Número de compra
            </span>
            <input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Ej: IG-1032"
              className="rounded-2xl border border-white/10 bg-[#1d130d]/60 px-5 py-4 text-white outline-none backdrop-blur placeholder:text-stone-500 focus:border-[#b68b52]"
              autoComplete="off"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-stone-200">
              Email de la compra
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@correo.com"
              className="rounded-2xl border border-white/10 bg-[#1d130d]/60 px-5 py-4 text-white outline-none backdrop-blur placeholder:text-stone-500 focus:border-[#b68b52]"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="rounded-xl bg-[#b68b52] px-7 py-4 font-black text-white shadow-[0_12px_30px_rgba(182,139,82,.24)] transition hover:-translate-y-1 hover:bg-[#c99958]"
          >
            Buscar pedido
          </button>

          <p className="text-sm text-stone-400">
            Datos de prueba: IG-1032 · cliente@ejemplo.com
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-300/20 bg-red-950/25 px-5 py-4 text-sm text-red-100 backdrop-blur">
            {error}
          </div>
        )}
      </form>

      {result && <OrderTrackingResult order={result} />}
    </div>
  );
}

function OrderTrackingResult({ order }: { order: TrackingOrder }) {
  const carrierName =
    order.carrier === "andreani"
      ? "Andreani"
      : order.carrier === "correo-argentino"
        ? "Correo Argentino"
        : "A definir";

  return (
    <section className="v16-tracking-result overflow-hidden rounded-[2rem] border border-[#d8aa62]/22">
      <div className="grid gap-6 border-b border-[#d8aa62]/14 p-6 md:grid-cols-[1fr_auto] md:p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#e2b46d]">
            Pedido {order.orderNumber}
          </p>
          <h3 className="mt-3 text-3xl font-black text-white">
            {order.productName}
          </h3>
          <p className="mt-3 text-stone-300">
            Compra realizada el {order.orderDate}
          </p>
        </div>

        <div className="rounded-2xl border border-[#d8aa62]/24 bg-[#23150d]/50 px-5 py-4 backdrop-blur">
          <p className="text-sm text-stone-400">Estado actual</p>
          <p className="mt-1 text-xl font-black text-[#e8c58f]">
            {order.statusLabel}
          </p>
        </div>
      </div>

      <div className="grid gap-8 p-6 xl:grid-cols-[1.3fr_.7fr] md:p-8">
        <div>
          <h4 className="text-2xl font-black text-white">
            Avance de tu pedido
          </h4>

          <div className="mt-7 grid gap-4">
            {order.steps.map((step, index) => (
              <div
                key={step.id}
                className={[
                  "grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-5",
                  step.current
                    ? "border-[#d8aa62]/48 bg-[#5a361f]/36"
                    : "border-white/8 bg-[#21140d]/34",
                ].join(" ")}
              >
                <div
                  className={[
                    "grid h-11 w-11 place-items-center rounded-full border font-black",
                    step.completed
                      ? "border-[#d8aa62] bg-[#b68b52] text-white"
                      : step.current
                        ? "border-[#e2b46d] bg-[#2b1a10] text-[#e2b46d]"
                        : "border-white/12 bg-[#1d130d]/55 text-stone-500",
                  ].join(" ")}
                >
                  {step.completed ? "✓" : String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-black text-white">{step.label}</p>
                    {step.date && (
                      <span className="text-sm text-[#e2b46d]">{step.date}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-5">
          <div className="rounded-2xl border border-[#d8aa62]/18 bg-[#21140d]/40 p-5 backdrop-blur">
            <p className="text-sm text-stone-400">Entrega estimada</p>
            <p className="mt-2 text-xl font-black text-white">
              {order.estimatedDelivery}
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8aa62]/18 bg-[#21140d]/40 p-5 backdrop-blur">
            <p className="text-sm text-stone-400">Transportista</p>
            <p className="mt-2 text-xl font-black text-white">{carrierName}</p>

            {order.trackingCode && (
              <>
                <p className="mt-4 text-sm text-stone-400">Código de seguimiento</p>
                <p className="mt-1 break-all font-mono text-sm text-[#e8c58f]">
                  {order.trackingCode}
                </p>
              </>
            )}

            {order.carrierUrl && (
              <a
                href={order.carrierUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-xl border border-[#d8aa62]/40 px-5 py-3 font-black text-[#e8c58f] transition hover:bg-[#b68b52] hover:text-white"
              >
                Ver seguimiento del transportista
              </a>
            )}
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#1b110b]/35 p-5 text-sm leading-relaxed text-stone-300 backdrop-blur">
            La integración automática con Andreani y Correo Argentino queda preparada para una etapa posterior mediante API o enlace oficial de seguimiento.
          </div>
        </aside>
      </div>
    </section>
  );
}
