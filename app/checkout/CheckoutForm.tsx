
"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useCart } from "../components/CartContext";
import { MercadoPagoButton } from "../components/MercadoPagoButton";

const provinces = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const shippingOptions = [
  {
    id: "andreani",
    label: "Andreani",
    description: "Envío a domicilio o sucursal.",
    price: 0,
  },
  {
    id: "correo-argentino",
    label: "Correo Argentino",
    description: "Envío nacional con seguimiento.",
    price: 0,
  },
  {
    id: "retiro",
    label: "Retiro coordinado",
    description: "Sin costo. Se confirma lugar y horario.",
    price: 0,
  },
];

const paymentOptions = [
  {
    id: "mercado-pago",
    label: "Mercado Pago / Tarjeta",
    description: "Pago online. Integración preparada.",
  },
  {
    id: "transferencia",
    label: "Transferencia bancaria",
    description: "Recibirás los datos al confirmar.",
  },
  {
    id: "coordinar",
    label: "Pago a coordinar",
    description: "Para productos con precio a cotizar.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
  shipping: string;
  payment: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  dni: "",
  address: "",
  apartment: "",
  city: "",
  province: "Buenos Aires",
  postalCode: "",
  notes: "",
  shipping: shippingOptions[0].id,
  payment: paymentOptions[0].id,
};

export function CheckoutForm() {
  const {
    items,
    totalValue,
    hasQuotedItems,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "identidad-grabada-checkout-v17"
      );

      if (saved) {
        setForm({
          ...EMPTY_FORM,
          ...JSON.parse(saved),
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "identidad-grabada-checkout-v17",
        JSON.stringify(form)
      );
    } catch {}
  }, [form]);

  const shipping = shippingOptions.find(
    (option) => option.id === form.shipping
  )!;

  const payment = paymentOptions.find(
    (option) => option.id === form.payment
  )!;

  const discountValue = Math.round(
    totalValue * (discount / 100)
  );

  const finalTotal = Math.max(
    0,
    totalValue - discountValue + shipping.price
  );

  const deliveryComplete =
    form.shipping === "retiro" ||
    (form.address.trim() &&
      form.city.trim() &&
      form.province.trim() &&
      form.postalCode.trim());

  const canSubmit =
    items.length > 0 &&
    accepted &&
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    deliveryComplete;

  const orderNumber = useMemo(
    () => `IG-${Date.now().toString().slice(-6)}`,
    [submitted]
  );

  function updateField<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function applyCoupon() {
    const normalized = coupon.trim().toUpperCase();

    if (!normalized) {
      setDiscount(0);
      setCouponMessage("Ingresá un cupón.");
      return;
    }

    if (normalized === "IDENTIDAD10") {
      setDiscount(10);
      setCouponMessage("Cupón aplicado: 10% de descuento.");
      return;
    }

    setDiscount(0);
    setCouponMessage("El cupón no es válido o ya venció.");
  }

  function submit(event: FormEvent) {
    event.preventDefault();

    if (!canSubmit) return;

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="v17-checkout-panel rounded-[2rem] border border-[#d8aa62]/22 p-7 text-center md:p-10">
        <div className="v1901-checkout-clean v1902-checkout-minimal v1903-checkout-rebuild mx-auto grid h-16 w-16 place-items-center rounded-full border border-green-400/25 bg-green-950/28 text-3xl text-green-200">
          ✓
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#e2b46d]">
          Pedido registrado
        </p>

        <h2 className="mt-3 font-serif text-4xl text-white">
          Gracias por tu compra
        </h2>

        <p className="mt-4 text-stone-300">
          Número de pedido:
          <strong className="ml-2 text-[#e8c58f]">
            {orderNumber}
          </strong>
        </p>

        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-stone-400">
          Esta versión completa el flujo visual. La creación definitiva del pedido, el email y el pago real se conectarán con la base de datos y Mercado Pago en una etapa posterior.
        </p>

        <div className="mx-auto mt-8 grid max-w-md gap-3">
          {form.payment === "mercado-pago" && (
            <MercadoPagoButton customer={form} />
          )}

          <button
            type="button"
            onClick={clearCart}
            className="rounded-xl border border-white/10 px-6 py-4 font-black text-white transition hover:border-[#d8aa62]/55"
          >
            Vaciar carrito
          </button>

          <Link
            href="/productos"
            className="rounded-xl bg-[#b68b52] px-6 py-4 font-black text-white"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="v17-checkout-panel rounded-[2rem] border border-dashed border-[#d8aa62]/24 p-10 text-center">
        <p className="text-5xl">🛒</p>
        <h2 className="mt-5 text-3xl font-black text-white">
          No hay productos en el carrito
        </h2>
        <p className="mt-3 text-stone-400">
          Elegí un producto antes de iniciar el checkout.
        </p>
        <Link
          href="/productos"
          className="mt-7 inline-flex rounded-xl bg-[#b68b52] px-7 py-4 font-black text-white"
        >
          Ver productos
        </Link>
      </section>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid items-start gap-8 xl:grid-cols-[1fr_430px]"
    >
      <div className="space-y-6">
        <CheckoutProgress />

        <section className="v1903-checkout-section v1903-contact-section">
          <SectionHeader
            number="01"
            title="Datos de contacto"
            text="Usaremos estos datos para confirmar el diseño y mantenerte informado."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input
              label="Nombre completo"
              value={form.name}
              onChange={(value) => updateField("name", value)}
              autoComplete="name"
              required
            />
            <Input
              type="email"
              label="Email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              autoComplete="email"
              required
            />
            <Input
              label="Teléfono"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              autoComplete="tel"
              required
            />
            <Input
              label="DNI (opcional)"
              value={form.dni}
              onChange={(value) => updateField("dni", value)}
            />
          </div>
        </section>

        <section className="v1903-checkout-section v1903-address-section">
          <SectionHeader
            number="02"
            title={form.shipping === "retiro" ? "Retiro coordinado" : "Dirección de entrega"}
            text={
              form.shipping === "retiro"
                ? "No necesitás completar una dirección. Coordinaremos lugar y horario después de confirmar."
                : "Completá la dirección donde querés recibir el pedido."
            }
          />

          {form.shipping === "retiro" ? (
            <div className="v190-pickup-note mt-6 rounded-2xl border border-[#d8aa62]/18 p-5 text-sm leading-relaxed text-stone-300">
              ✓ Retiro sin costo seleccionado. Tus datos de contacto serán suficientes para coordinar la entrega.
            </div>
          ) : (

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Calle y número"
                value={form.address}
                onChange={(value) =>
                  updateField("address", value)
                }
                autoComplete="street-address"
                required={form.shipping !== "retiro"}
              />
            </div>

            <Input
              label="Piso / Departamento"
              value={form.apartment}
              onChange={(value) =>
                updateField("apartment", value)
              }
            />

            <Input
              label="Localidad"
              value={form.city}
              onChange={(value) => updateField("city", value)}
              autoComplete="address-level2"
              required
            />

            <Select
              label="Provincia"
              value={form.province}
              options={provinces}
              onChange={(value) =>
                updateField("province", value)
              }
            />

            <Input
              label="Código postal"
              value={form.postalCode}
              onChange={(value) =>
                updateField(
                  "postalCode",
                  value.replace(/\D/g, "").slice(0, 4)
                )
              }
              inputMode="numeric"
              autoComplete="postal-code"
              required
            />
          </div>
          )}
        </section>

        <section className="v1903-checkout-section">
          <SectionHeader
            number="03"
            title="Envío"
            text="Elegí cómo querés recibir tu compra."
          />

          <div className="mt-6 grid gap-3">
            {shippingOptions.map((option) => (
              <ChoiceCard
                key={option.id}
                selected={form.shipping === option.id}
                title={option.label}
                text={option.description}
                onClick={() =>
                  updateField("shipping", option.id)
                }
              />
            ))}
          </div>
        </section>

        <section className="v1903-checkout-section">
          <SectionHeader
            number="04"
            title="Forma de pago"
            text="La integración definitiva se conectará en una etapa posterior."
          />

          <div className="mt-6 grid gap-3">
            {paymentOptions.map((option) => (
              <ChoiceCard
                key={option.id}
                selected={form.payment === option.id}
                title={option.label}
                text={option.description}
                onClick={() =>
                  updateField("payment", option.id)
                }
              />
            ))}
          </div>

          <label className="mt-6 grid gap-2">
            <span className="text-sm font-bold text-stone-200">
              Observaciones del pedido
            </span>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(event) =>
                updateField("notes", event.target.value)
              }
              placeholder="Horarios, referencias de entrega o detalles adicionales."
              className="resize-none rounded-2xl border border-white/10 bg-[#1d130d]/55 px-5 py-4 text-white outline-none placeholder:text-stone-500 focus:border-[#b68b52]"
            />
          </label>
        </section>
      </div>

      <aside className="v1903-checkout-sidebar v17-checkout-panel rounded-[2rem] border border-[#d8aa62]/22 p-5 xl:sticky xl:top-24">
        <h2 className="text-2xl font-black text-white">
          Resumen del pedido
        </h2>

        <div className="mt-5 grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.25rem] border border-white/8 bg-[#21140d]/24 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-[#e8c58f]">
                    {item.price} <span className="text-stone-500">c/u</span>
                  </p>
                  <Link
                    href={`/productos/${item.slug}`}
                    className="mt-2 inline-flex text-[11px] font-bold text-stone-400 underline decoration-white/15 underline-offset-4 hover:text-[#e8c58f]"
                  >
                    Volver al producto
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs font-bold text-red-300"
                >
                  Quitar
                </button>
              </div>

              {item.personalization && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs font-bold text-stone-400">
                    Personalización
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300">
                    {item.personalization}
                  </p>
                </details>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10"
                  >
                    +
                  </button>
                </div>

                <p className="font-black text-[#e8c58f]">
                  {item.priceValue > 0
                    ? `$${(
                        item.priceValue * item.quantity
                      ).toLocaleString("es-AR")}`
                    : "A coordinar"}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-[#d8aa62]/16 bg-[#21140d]/24 p-4">
          <p className="text-sm font-bold text-white">
            Cupón de descuento
          </p>

          <div className="mt-3 flex gap-2">
            <input
              value={coupon}
              onChange={(event) =>
                setCoupon(event.target.value)
              }
              placeholder="Código"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#1d130d]/55 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-[#b68b52]"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="rounded-xl border border-[#d8aa62]/40 px-4 py-3 text-sm font-bold text-[#e8c58f]"
            >
              Aplicar
            </button>
          </div>

          {couponMessage && (
            <p className="mt-3 text-xs text-stone-400">
              {couponMessage}
            </p>
          )}
        </div>

        <dl className="mt-5 space-y-3 border-y border-[#d8aa62]/14 py-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-stone-400">Subtotal</dt>
            <dd className="font-bold text-white">
              {totalValue > 0
                ? `$${totalValue.toLocaleString("es-AR")}`
                : "A coordinar"}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-stone-400">Descuento</dt>
            <dd className="font-bold text-green-200">
              {discountValue > 0
                ? `− $${discountValue.toLocaleString(
                    "es-AR"
                  )}`
                : "$0"}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-stone-400">Envío</dt>
            <dd className="text-right font-bold text-white">
              {shipping.id === "retiro"
                ? "Sin costo"
                : "A calcular"}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-stone-400">Total estimado</p>
            <p className="mt-1 text-3xl font-black text-[#e8c58f]">
              {finalTotal > 0
                ? `$${finalTotal.toLocaleString("es-AR")}`
                : "A coordinar"}
            </p>
          </div>
          <p className="max-w-36 text-right text-xs leading-relaxed text-stone-500">
            El total definitivo incluye envío y productos cotizados.
          </p>
        </div>

        {hasQuotedItems && (
          <p className="mt-4 rounded-xl border border-[#d8aa62]/16 bg-[#21140d]/28 p-3 text-xs leading-relaxed text-stone-300">
            El pedido contiene productos con precio a coordinar.
          </p>
        )}

        <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-stone-300">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) =>
              setAccepted(event.target.checked)
            }
            className="mt-1 h-4 w-4 accent-[#b68b52]"
          />
          <span>
            Confirmo que revisé los productos y acepto que el diseño final se aprueba antes de producir.
          </span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-5 w-full rounded-xl bg-[#b68b52] py-4 font-black text-white transition enabled:hover:bg-[#c99958] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Confirmar pedido
        </button>

        <div className="mt-4 rounded-xl border border-white/8 bg-[#21140d]/22 p-3 text-xs leading-relaxed text-stone-400">
          🚚 {shipping.label}
          <br />
          💳 {payment.label}
          <br />
          ⏱ Producción estimada: 2 a 5 días hábiles
        </div>
      </aside>
    </form>
  );
}

function CheckoutProgress() {
  return (
    <div className="v17-checkout-panel rounded-[1.5rem] border border-[#d8aa62]/18 p-4">
      <div className="grid grid-cols-4 gap-2">
        {["Carrito", "Datos", "Pago", "Confirmación"].map(
          (label, index) => (
            <div key={label} className="text-center">
              <div
                className={[
                  "h-1.5 rounded-full",
                  index < 3
                    ? "bg-[#b68b52]"
                    : "bg-white/10",
                ].join(" ")}
              />
              <p className="mt-2 text-[10px] text-stone-400">
                {label}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d8aa62]/38 bg-[#21140d]/36 text-sm font-black text-[#e8c58f]">
        {number}
      </div>
      <div>
        <h2 className="text-2xl font-black text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">
          {text}
        </p>
      </div>
    </div>
  );
}

function ChoiceCard({
  selected,
  title,
  text,
  onClick,
}: {
  selected: boolean;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-start gap-4 rounded-[1.25rem] border p-4 text-left transition",
        selected
          ? "border-[#d8aa62]/66 bg-[#6a4326]/26"
          : "border-white/8 bg-[#21140d]/22 hover:border-[#d8aa62]/35",
      ].join(" ")}
    >
      <span
        className={[
          "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border",
          selected
            ? "border-[#d8aa62] bg-[#b68b52]"
            : "border-white/18",
        ].join(" ")}
      >
        {selected && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
      </span>

      <span>
        <strong className="block text-white">{title}</strong>
        <span className="mt-1 block text-sm text-stone-400">
          {text}
        </span>
      </span>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-stone-200">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="rounded-2xl border border-white/10 bg-[#1d130d]/55 px-5 py-4 text-white outline-none focus:border-[#b68b52]"
      />
    </label>
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
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-stone-200">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="rounded-2xl border border-white/10 bg-[#1d130d]/55 px-5 py-4 text-white outline-none focus:border-[#b68b52]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
