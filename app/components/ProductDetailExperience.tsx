
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "./CartContext";
import { ImageSlot } from "./ui";
import type { Product } from "../data/products";

type Tab = "descripcion" | "especificaciones" | "cuidados" | "envios";

export function ProductDetailExperience({
  product,
}: {
  product: Product;
}) {
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || "1");
  const [activeTab, setActiveTab] = useState<Tab>("descripcion");
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [shippingResult, setShippingResult] = useState("");
  const [engravingType, setEngravingType] = useState("Nombre");
  const [engravingText, setEngravingText] = useState("");
  const [font, setFont] = useState("Elegante");
  const [position, setPosition] = useState("Frente");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      setFavorite(
        localStorage.getItem(`ig-favorite-${product.slug}`) === "true"
      );
    } catch {}
  }, [product.slug]);

  const personalization = useMemo(() => {
    const parts = [
      `Tipo: ${engravingType}`,
      engravingText ? `Texto/idea: ${engravingText}` : "",
      `Tipografía: ${font}`,
      `Posición: ${position}`,
      notes ? `Notas: ${notes}` : "",
    ].filter(Boolean);

    return parts.join(" · ");
  }, [engravingType, engravingText, font, position, notes]);

  const toggleFavorite = () => {
    const next = !favorite;
    setFavorite(next);

    try {
      localStorage.setItem(`ig-favorite-${product.slug}`, String(next));
    } catch {}
  };

  const addToCart = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      personalization,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const calculateShipping = () => {
    const normalized = postalCode.replace(/\D/g, "");

    if (normalized.length !== 4) {
      setShippingResult("Ingresá un código postal argentino de 4 números.");
      return;
    }

    setShippingResult(
      "Envío disponible. El costo y el plazo definitivo se confirman antes del pago."
    );
  };

  return (
    <div className="v17-product-detail">
      <div className="grid gap-8 xl:grid-cols-[1.08fr_.92fr] xl:items-start">
        <ProductGallery
          product={product}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        <aside className="v17-product-summary rounded-[2rem] border border-[#d8aa62]/22 p-6 md:p-8 xl:sticky xl:top-24">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#e2b46d]">
                {product.categoryLabel}
              </p>

              <h1 className="mt-3 font-serif text-4xl leading-tight text-white md:text-5xl">
                {product.name}
              </h1>
            </div>

            <button
              type="button"
              onClick={toggleFavorite}
              aria-label={
                favorite ? "Quitar de favoritos" : "Agregar a favoritos"
              }
              className={[
                "grid h-12 w-12 shrink-0 place-items-center rounded-full border text-xl transition",
                favorite
                  ? "border-[#d8aa62] bg-[#b68b52] text-white"
                  : "border-white/12 bg-[#24160d]/46 text-[#e8c58f] hover:border-[#d8aa62]/70",
              ].join(" ")}
            >
              {favorite ? "♥" : "♡"}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#d8aa62]/32 bg-[#2b1a10]/45 px-4 py-2 text-xs font-bold text-[#e8c58f]">
              {product.badge}
            </span>

            {product.bestSeller && (
              <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold text-white">
                Más vendido
              </span>
            )}

            <span className="rounded-full border border-green-400/20 bg-green-950/22 px-4 py-2 text-xs font-bold text-green-200">
              {product.stock}
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-stone-300">
            {product.description}
          </p>

          <div className="mt-6 border-y border-[#d8aa62]/14 py-5">
            <p className="text-sm text-stone-400">Precio</p>
            <div className="mt-1 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-black text-[#e4b76f]">
                {product.price}
              </p>
              {product.compareAtPrice && (
                <p className="pb-1 text-sm text-stone-500 line-through">
                  {product.compareAtPrice}
                </p>
              )}
            </div>
            <p className="mt-2 text-sm text-stone-300">
              {product.installmentText ||
                "Consultá medios de pago y promociones vigentes."}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <SummaryFact label="SKU" value={product.sku} />
            <SummaryFact label="Marca" value={product.brand} />
            <SummaryFact label="Producción" value={product.productionTime} />
            <SummaryFact label="Material" value={product.material} />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={addToCart}
              className="rounded-xl bg-[#b68b52] px-5 py-4 font-black text-white shadow-[0_12px_30px_rgba(182,139,82,.24)] transition hover:-translate-y-1 hover:bg-[#c99958]"
            >
              {added ? "Agregado ✓" : "Agregar al carrito"}
            </button>

            <Link
              href="/checkout"
              onClick={addToCart}
              className="rounded-xl border border-[#d8aa62]/55 bg-[#21140d]/42 px-5 py-4 text-center font-black text-[#e8c58f] backdrop-blur transition hover:-translate-y-1 hover:bg-[#b68b52] hover:text-white"
            >
              Comprar ahora
            </Link>
          </div>

          <Link
            href="/contacto"
            className="mt-3 block rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center font-bold text-stone-200 transition hover:border-[#d8aa62]/50 hover:text-[#e8c58f]"
          >
            Consultar por WhatsApp
          </Link>

          <ShippingCalculator
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            result={shippingResult}
            onCalculate={calculateShipping}
          />
        </aside>
      </div>

      <section className="v17-personalizer mt-10 rounded-[2rem] border border-[#d8aa62]/22 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#e2b46d]">
              Personalización
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
              Prepará tu idea de grabado
            </h2>
            <p className="mt-4 leading-relaxed text-stone-300">
              Completá una propuesta inicial. Antes de producir te enviamos una
              vista previa para confirmar todos los detalles.
            </p>

            <div className="v17-engraving-preview mt-6 flex min-h-72 items-center justify-center overflow-hidden rounded-[1.5rem] border border-[#d8aa62]/16">
              <div className="relative grid h-48 w-48 place-items-center rounded-full border-[14px] border-[#b68b52]/24">
                <div className="absolute inset-5 rounded-full border border-[#e8c58f]/22" />
                <p className="relative max-w-[150px] break-words text-center text-2xl font-black text-[#e8c58f]">
                  {engravingText || "Tu diseño"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid content-start gap-5">
            <OptionGroup
              label="¿Qué querés grabar?"
              options={["Nombre", "Frase", "Fecha", "Iniciales", "Logo"]}
              value={engravingType}
              onChange={setEngravingType}
            />

            <label className="grid gap-2">
              <span className="text-sm font-bold text-stone-200">
                Texto, nombre o idea
              </span>
              <input
                value={engravingText}
                onChange={(event) => setEngravingText(event.target.value)}
                placeholder="Ej: Juan Pérez, una fecha o descripción del logo"
                className="rounded-2xl border border-white/10 bg-[#1d130d]/55 px-5 py-4 text-white outline-none placeholder:text-stone-500 focus:border-[#b68b52]"
              />
            </label>

            <OptionGroup
              label="Tipografía"
              options={["Elegante", "Clásica", "Moderna"]}
              value={font}
              onChange={setFont}
            />

            <OptionGroup
              label="Posición del grabado"
              options={["Frente", "Lateral", "Virola", "A coordinar"]}
              value={position}
              onChange={setPosition}
            />

            <label className="grid gap-2">
              <span className="text-sm font-bold text-stone-200">
                Observaciones
              </span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Contanos cualquier detalle adicional."
                className="resize-none rounded-2xl border border-white/10 bg-[#1d130d]/55 px-5 py-4 text-white outline-none placeholder:text-stone-500 focus:border-[#b68b52]"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#d8aa62]/24 bg-[#21140d]/32 p-5 text-sm text-stone-300">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d8aa62]/30 text-[#e8c58f]">
                ↑
              </span>
              <span>
                <strong className="block text-white">Subir logo o referencia</strong>
                JPG, PNG, PDF o SVG. La carga real se conectará en una etapa posterior.
              </span>
              <input type="file" className="hidden" disabled />
            </label>
          </div>
        </div>
      </section>

      <section className="v17-product-tabs mt-10 overflow-hidden rounded-[2rem] border border-[#d8aa62]/22">
        <div className="flex gap-2 overflow-x-auto border-b border-[#d8aa62]/14 p-3">
          <TabButton
            active={activeTab === "descripcion"}
            onClick={() => setActiveTab("descripcion")}
          >
            Descripción
          </TabButton>
          <TabButton
            active={activeTab === "especificaciones"}
            onClick={() => setActiveTab("especificaciones")}
          >
            Especificaciones
          </TabButton>
          <TabButton
            active={activeTab === "cuidados"}
            onClick={() => setActiveTab("cuidados")}
          >
            Cuidados
          </TabButton>
          <TabButton
            active={activeTab === "envios"}
            onClick={() => setActiveTab("envios")}
          >
            Envíos
          </TabButton>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "descripcion" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-black text-white">
                  Un producto preparado para contar una historia
                </h3>
                <p className="mt-4 leading-relaxed text-stone-300">
                  {product.description}
                </p>
              </div>

              <ul className="grid gap-3">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded-xl border border-white/7 bg-[#21140d]/26 p-4 text-stone-200"
                  >
                    <span className="text-[#e2b46d]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "especificaciones" && (
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/8 md:grid-cols-2">
              {product.specifications.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[.7fr_1.3fr] gap-4 bg-[#21140d]/30 p-4"
                >
                  <dt className="text-sm font-bold text-[#e2b46d]">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-stone-200">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === "cuidados" && (
            <BulletList items={product.care} />
          )}

          {activeTab === "envios" && (
            <BulletList items={product.shippingNotes} />
          )}
        </div>
      </section>
    </div>
  );
}

function ProductGallery({
  product,
  selectedImage,
  onSelectImage,
}: {
  product: Product;
  selectedImage: string;
  onSelectImage: (image: string) => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setZoomed(true)}
        className="v17-product-main-image group relative h-[520px] w-full overflow-hidden rounded-[2rem] border border-[#d8aa62]/20 md:h-[650px]"
        aria-label="Ampliar imagen del producto"
      >
        <div className="h-full transition duration-700 group-hover:scale-[1.035]">
          <ImageSlot
            title={`${product.name} · Foto ${selectedImage}`}
          />
        </div>

        <span className="absolute bottom-5 right-5 rounded-full border border-white/12 bg-[#21140d]/58 px-4 py-2 text-xs font-bold text-white backdrop-blur">
          Ampliar
        </span>
      </button>

      <div className="grid grid-cols-4 gap-3">
        {product.gallery.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => onSelectImage(image)}
            className={[
              "h-24 overflow-hidden rounded-xl border transition md:h-28",
              selectedImage === image
                ? "border-[#d8aa62] shadow-[0_0_0_2px_rgba(216,170,98,.12)]"
                : "border-white/9 hover:border-[#d8aa62]/50",
            ].join(" ")}
          >
            <ImageSlot title={`Foto ${image}`} small />
          </button>
        ))}
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/82 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${product.name}`}
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/45 text-xl text-white"
            aria-label="Cerrar imagen"
          >
            ×
          </button>

          <div
            className="h-[82vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#d8aa62]/25"
            onClick={(event) => event.stopPropagation()}
          >
            <ImageSlot
              title={`${product.name} · Foto ${selectedImage}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ShippingCalculator({
  postalCode,
  setPostalCode,
  result,
  onCalculate,
}: {
  postalCode: string;
  setPostalCode: (value: string) => void;
  result: string;
  onCalculate: () => void;
}) {
  return (
    <div className="mt-7 rounded-2xl border border-[#d8aa62]/16 bg-[#21140d]/28 p-5">
      <p className="font-black text-white">Calculá el envío</p>
      <p className="mt-1 text-sm text-stone-400">
        Ingresá tu código postal para comprobar cobertura.
      </p>

      <div className="mt-4 flex gap-3">
        <input
          inputMode="numeric"
          maxLength={4}
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
          placeholder="CP"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#1d130d]/55 px-4 py-3 text-white outline-none placeholder:text-stone-500 focus:border-[#b68b52]"
        />
        <button
          type="button"
          onClick={onCalculate}
          className="rounded-xl border border-[#d8aa62]/45 px-4 py-3 font-bold text-[#e8c58f] transition hover:bg-[#b68b52] hover:text-white"
        >
          Calcular
        </button>
      </div>

      {result && (
        <p className="mt-3 text-sm leading-relaxed text-stone-300">
          {result}
        </p>
      )}
    </div>
  );
}

function SummaryFact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#21140d]/26 p-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-stone-200">{value}</p>
    </div>
  );
}

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-stone-200">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={[
              "rounded-xl border px-4 py-3 text-sm font-bold transition",
              value === option
                ? "border-[#b68b52] bg-[#b68b52] text-white"
                : "border-white/10 bg-[#21140d]/30 text-stone-300 hover:border-[#d8aa62]/50",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 rounded-xl px-5 py-3 text-sm font-black transition",
        active
          ? "bg-[#b68b52] text-white"
          : "text-stone-300 hover:bg-white/6 hover:text-[#e8c58f]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-white/7 bg-[#21140d]/26 p-4 text-stone-200"
        >
          <span className="text-[#e2b46d]">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
