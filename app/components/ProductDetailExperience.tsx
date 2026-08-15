
"use client";

import Link from "next/link";
import { type PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const [engravingType, setEngravingType] = useState("Sin grabado");
  const [engravingText, setEngravingText] = useState("");
  const [font, setFont] = useState("Elegante");
  const [position, setPosition] = useState("Frente");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [referenceFileName, setReferenceFileName] = useState("");
  const [referencePreview, setReferencePreview] = useState("");
  const [designX, setDesignX] = useState(50);
  const [designY, setDesignY] = useState(58);
  const [designScale, setDesignScale] = useState(1);
  const [designRotation, setDesignRotation] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    try {
      setFavorite(
        localStorage.getItem(`ig-favorite-${product.slug}`) === "true"
      );
    } catch {}
  }, [product.slug]);

  const personalization = useMemo(() => {
    const parts =
      engravingType === "Sin grabado"
        ? ["Sin grabado"]
        : [
            `Tipo: ${engravingType}`,
            engravingText ? `Texto/idea: ${engravingText}` : "",
            `Tipografía: ${font}`,
            `Posición: ${position}`,
            referenceFileName ? `Referencia: ${referenceFileName}` : "",
            `Diseño: X ${Math.round(designX)}% · Y ${Math.round(designY)}% · Escala ${Math.round(designScale * 100)}% · Rotación ${Math.round(designRotation)}°`,
            notes ? `Notas: ${notes}` : "",
          ].filter(Boolean);

    return parts.join(" · ");
  }, [engravingType, engravingText, font, position, referenceFileName, designX, designY, designScale, designRotation, notes]);

  const handleReferenceFile = (file?: File) => {
    if (!file) {
      setReferenceFileName("");
      setReferencePreview("");
      return;
    }

    setReferenceFileName(file.name);

    if (file.type.startsWith("image/")) {
      setReferencePreview((current) => {
        if (current.startsWith("blob:")) URL.revokeObjectURL(current);
        return URL.createObjectURL(file);
      });
    } else {
      setReferencePreview("");
    }
  };

  const resetDesign = () => {
    setDesignX(50);
    setDesignY(58);
    setDesignScale(1);
    setDesignRotation(0);
  };

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
      quantity,
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

          <div className="v189-selection mt-7 rounded-2xl border border-[#d8aa62]/18 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#e2b46d]">
                  Tu selección
                </p>
                <p className="mt-1 text-sm font-bold text-stone-200">
                  {engravingType === "Sin grabado"
                    ? "Producto sin personalización"
                    : `${engravingType}${engravingText ? ` · ${engravingText}` : ""}`}
                </p>
              </div>

              <div className="v189-quantity flex items-center overflow-hidden rounded-xl border border-[#d8aa62]/24">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  −
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
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

      <section className="v17-personalizer v1910-personalizer mt-10 rounded-[2rem] border border-[#d8aa62]/22 p-6 md:p-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#e2b46d]">
              Personalizador Pro
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
              Visualizá tu grabado sobre el mate
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-stone-300">
              Mové, escalá y girá el diseño dentro de la zona grabable. La simulación
              adapta el acabado al material para aproximarse al resultado del láser.
            </p>
          </div>

          <div className="v1910-mode-switch flex rounded-xl border border-[#d8aa62]/22 p-1">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className={!previewMode ? "active" : ""}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className={previewMode ? "active" : ""}
            >
              Vista previa
            </button>
          </div>
        </div>

        <div className="grid gap-7 xl:grid-cols-[1.08fr_.92fr]">
          <EngravingEditor
            product={product}
            selectedImage={selectedImage}
            engravingType={engravingType}
            engravingText={engravingText}
            font={font}
            referencePreview={referencePreview}
            referenceFileName={referenceFileName}
            designX={designX}
            designY={designY}
            designScale={designScale}
            designRotation={designRotation}
            previewMode={previewMode}
            onPositionChange={(x, y) => {
              setDesignX(x);
              setDesignY(y);
            }}
            onScaleChange={setDesignScale}
            onRotationChange={setDesignRotation}
            onReset={resetDesign}
          />

          <div className="v1910-controls grid content-start gap-5">
            <OptionGroup
              label="¿Qué querés grabar?"
              options={["Sin grabado", "Nombre", "Frase", "Fecha", "Iniciales", "Logo / diseño"]}
              value={engravingType}
              onChange={(value) => {
                setEngravingType(value);
                if (value === "Sin grabado") setPreviewMode(true);
              }}
            />

            {engravingType !== "Sin grabado" && (
              <>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-stone-200">
                    Texto, nombre o idea
                  </span>
                  <input
                    value={engravingText}
                    onChange={(event) => setEngravingText(event.target.value)}
                    placeholder="Ej: Juan Pérez, una fecha o una frase"
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

                <label className="v1910-upload flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#d8aa62]/28 p-5 text-sm text-stone-300">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d8aa62]/34 text-[#e8c58f]">
                    ↑
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-white">Subir logo o diseño</strong>
                    <span className="block truncate">
                      {referenceFileName || "PNG, JPG o SVG para previsualizar. PDF queda registrado como referencia."}
                    </span>
                  </span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg,.pdf"
                    className="hidden"
                    onChange={(event) => handleReferenceFile(event.target.files?.[0])}
                  />
                </label>

                <div className="v1910-fine-controls grid gap-4 rounded-2xl border border-[#d8aa62]/16 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-white">Ajuste fino</p>
                      <p className="mt-1 text-xs text-stone-400">
                        También podés arrastrar directamente el diseño sobre el producto.
                      </p>
                    </div>
                    <button type="button" onClick={resetDesign} className="v1910-reset">
                      Restablecer
                    </button>
                  </div>

                  <RangeControl
                    label="Tamaño"
                    value={designScale}
                    min={0.55}
                    max={1.65}
                    step={0.05}
                    display={`${Math.round(designScale * 100)}%`}
                    onChange={setDesignScale}
                  />

                  <RangeControl
                    label="Rotación"
                    value={designRotation}
                    min={-35}
                    max={35}
                    step={1}
                    display={`${Math.round(designRotation)}°`}
                    onChange={setDesignRotation}
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <button type="button" onClick={() => setDesignX(50)}>Centrar</button>
                    <button type="button" onClick={() => setDesignScale((value) => Math.max(.55, value - .1))}>− Tamaño</button>
                    <button type="button" onClick={() => setDesignScale((value) => Math.min(1.65, value + .1))}>+ Tamaño</button>
                  </div>
                </div>
              </>
            )}

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

            <div className="v1910-disclaimer rounded-2xl border border-[#d8aa62]/16 p-4 text-xs leading-relaxed text-stone-400">
              <strong className="text-[#e8c58f]">Vista previa orientativa.</strong>{" "}
              La calabaza y la madera son materiales naturales: tono, textura y contraste
              pueden variar. Antes de producir se confirma el diseño final.
            </div>
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
  const touchStartX = useRef<number | null>(null);

  const currentIndex = Math.max(0, product.gallery.indexOf(selectedImage));

  const selectByOffset = (offset: number) => {
    if (!product.gallery.length) return;
    const nextIndex =
      (currentIndex + offset + product.gallery.length) % product.gallery.length;
    onSelectImage(product.gallery[nextIndex]);
  };

  const openGallery = () => setZoomed(true);
  const closeGallery = () => setZoomed(false);

  useEffect(() => {
    if (!zoomed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") selectByOffset(-1);
      if (event.key === "ArrowRight") selectByOffset(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoomed, currentIndex, product.gallery.length]);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 45) return;
    selectByOffset(delta > 0 ? -1 : 1);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={openGallery}
        className="v17-product-main-image v175-gallery-shell v1891-gallery-trigger group relative h-[520px] w-full overflow-hidden rounded-[2rem] border border-[#d8aa62]/20 md:h-[650px]"
        aria-label={`Abrir galería de ${product.name}`}
      >
        <div className="h-full transition duration-700 group-hover:scale-[1.025]">
          <ImageSlot
            title={`${product.name} · Foto ${selectedImage}`}
          />
        </div>

        <span className="v175-gallery-counter">
          {currentIndex + 1} / {product.gallery.length}
        </span>
      </button>

      <div className="v175-gallery-thumbnails grid grid-cols-4 gap-3">
        {product.gallery.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => onSelectImage(image)}
            className={[
              "v175-gallery-thumb h-24 overflow-hidden rounded-xl border transition md:h-28",
              selectedImage === image
                ? "border-[#d8aa62] shadow-[0_0_0_2px_rgba(216,170,98,.12)]"
                : "border-white/9 hover:border-[#d8aa62]/50",
            ].join(" ")}
            aria-label={`Ver foto ${product.gallery.indexOf(image) + 1}`}
          >
            <ImageSlot title={`Foto ${image}`} small />
          </button>
        ))}
      </div>

      {zoomed && (
        <div
          className="v1891-lightbox fixed inset-0 z-[120] flex items-center justify-center bg-black/86 p-3 backdrop-blur-lg md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería ampliada de ${product.name}`}
          onClick={closeGallery}
        >
          <button
            type="button"
            onClick={closeGallery}
            className="v1891-lightbox-close absolute right-4 top-4 z-[4] grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/55 text-2xl text-white md:right-6 md:top-6"
            aria-label="Cerrar galería"
          >
            ×
          </button>

          <div
            className="v1891-lightbox-stage relative flex h-[86vh] w-full max-w-6xl items-center justify-center overflow-hidden rounded-[1.6rem] border border-[#d8aa62]/28 bg-black/20"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={() => selectByOffset(-1)}
              className="v1891-lightbox-arrow v1891-lightbox-prev absolute left-3 z-[3] grid h-11 w-11 place-items-center rounded-full border border-[#d8aa62]/42 bg-black/48 text-3xl text-[#efc16f] backdrop-blur-md md:left-5 md:h-12 md:w-12"
              aria-label="Imagen anterior"
            >
              ‹
            </button>

            <div className="v1891-lightbox-image h-full w-full">
              <ImageSlot
                title={`${product.name} · Foto ${selectedImage}`}
              />
            </div>

            <button
              type="button"
              onClick={() => selectByOffset(1)}
              className="v1891-lightbox-arrow v1891-lightbox-next absolute right-3 z-[3] grid h-11 w-11 place-items-center rounded-full border border-[#d8aa62]/42 bg-black/48 text-3xl text-[#efc16f] backdrop-blur-md md:right-5 md:h-12 md:w-12"
              aria-label="Imagen siguiente"
            >
              ›
            </button>

            <div className="v1891-lightbox-counter absolute right-4 top-4 rounded-full border border-white/14 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur md:right-5 md:top-5">
              {currentIndex + 1} / {product.gallery.length}
            </div>

            <div className="v1891-lightbox-dots absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur md:bottom-5">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => onSelectImage(image)}
                  aria-label={`Ir a imagen ${index + 1}`}
                  className={[
                    "h-2 rounded-full transition-all",
                    selectedImage === image
                      ? "w-7 bg-[#e2b45f]"
                      : "w-2 bg-white/55 hover:bg-white",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function EngravingEditor({
  product,
  selectedImage,
  engravingType,
  engravingText,
  font,
  referencePreview,
  referenceFileName,
  designX,
  designY,
  designScale,
  designRotation,
  previewMode,
  onPositionChange,
  onScaleChange,
  onRotationChange,
  onReset,
}: {
  product: Product;
  selectedImage: string;
  engravingType: string;
  engravingText: string;
  font: string;
  referencePreview: string;
  referenceFileName: string;
  designX: number;
  designY: number;
  designScale: number;
  designRotation: number;
  previewMode: boolean;
  onPositionChange: (x: number, y: number) => void;
  onScaleChange: (value: number) => void;
  onRotationChange: (value: number) => void;
  onReset: () => void;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const material = product.material.toLowerCase();
  const materialClass = material.includes("algarrobo")
    ? "wood"
    : material.includes("calabaza")
      ? "gourd"
      : material.includes("metal") || material.includes("acero")
        ? "metal"
        : "gourd";

  const fontClass =
    font === "Elegante"
      ? "serif"
      : font === "Moderna"
        ? "modern"
        : "classic";

  const updatePointerPosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    onPositionChange(
      Math.min(82, Math.max(18, x)),
      Math.min(78, Math.max(28, y))
    );
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (previewMode || engravingType === "Sin grabado") return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePointerPosition(event);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updatePointerPosition(event);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const designLabel =
    engravingType === "Sin grabado"
      ? ""
      : engravingText ||
        (engravingType.includes("Logo") ? "TU LOGO" : "TU DISEÑO");

  return (
    <div className="v1910-editor-shell">
      <div className="v1910-editor-toolbar">
        <div>
          <p className="text-xs uppercase tracking-[.18em] text-[#e2b46d]">
            Simulación sobre producto
          </p>
          <p className="mt-1 text-sm text-stone-400">
            {previewMode ? "Vista limpia del resultado" : "Arrastrá el diseño dentro del área punteada"}
          </p>
        </div>

        {!previewMode && engravingType !== "Sin grabado" && (
          <button type="button" onClick={onReset} className="v1910-reset">
            Centrar diseño
          </button>
        )}
      </div>

      <div
        ref={stageRef}
        className={[
          "v1910-editor-stage",
          `material-${materialClass}`,
          previewMode ? "is-preview" : "is-editing",
        ].join(" ")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="v1910-product-photo">
          <ImageSlot title={`${product.name} · Foto ${selectedImage}`} />
        </div>

        <div className="v1910-product-vignette" />

        {!previewMode && engravingType !== "Sin grabado" && (
          <>
            <div className="v1910-engraving-zone">
              <span>Zona grabable orientativa</span>
            </div>
            <div className="v1910-zone-crosshair" />
          </>
        )}

        {engravingType !== "Sin grabado" && (
          <div
            className={[
              "v1910-engraving-design",
              `font-${fontClass}`,
              referencePreview ? "has-logo" : "",
            ].join(" ")}
            style={{
              left: `${designX}%`,
              top: `${designY}%`,
              transform: `translate(-50%, -50%) rotate(${designRotation}deg) scale(${designScale})`,
            }}
          >
            {referencePreview ? (
              <img
                src={referencePreview}
                alt={referenceFileName || "Diseño cargado"}
                draggable={false}
              />
            ) : (
              <span>{designLabel}</span>
            )}
          </div>
        )}

        {engravingType === "Sin grabado" && (
          <div className="v1910-no-engraving">
            Producto sin grabado
          </div>
        )}

        <div className="v1910-editor-status">
          <span>{product.material}</span>
          <strong>{previewMode ? "Vista previa" : "Edición"}</strong>
        </div>
      </div>

      <div className="v1910-editor-hints">
        <span>↔ Arrastrar</span>
        <span>⤢ Escalar</span>
        <span>↻ Rotar</span>
        <span>Área: {product.engravingArea}</span>
      </div>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center justify-between gap-3 text-xs font-bold text-stone-300">
        {label}
        <strong className="text-[#e8c58f]">{display}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="v1910-range"
      />
    </label>
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
