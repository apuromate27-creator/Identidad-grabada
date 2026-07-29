
"use client";

import { useRouter } from "next/navigation";
import { KeyboardEvent, MouseEvent } from "react";
import { ImageSlot } from "./ui";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const href = `/productos/${product.slug}`;

  const openProduct = () => {
    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProduct();
    }
  };

  const stopCardNavigation = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`Abrir ${product.name}`}
      onClick={openProduct}
      onKeyDown={handleKeyDown}
      className="v15-unified-card v174-clickable-product-card group relative cursor-pointer overflow-hidden rounded-[2rem] border border-[#d8aa62]/20 shadow-[0_25px_70px_rgba(0,0,0,.34)] outline-none"
    >
      <div className="v15-unified-card-media relative h-80 overflow-hidden">
        <ImageSlot title={product.categoryLabel} small />

        <div className="absolute inset-0 bg-gradient-to-t from-[#180e08]/62 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#d8aa62]/40 bg-[#1d120b]/72 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#e5bd7c] backdrop-blur-md">
            {product.badge}
          </span>

          {product.bestSeller && (
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
              Más vendido
            </span>
          )}
        </div>

        <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-[#1d120b]/68 px-4 py-2 text-xs text-stone-200 backdrop-blur-md">
          Personalizable
        </div>
      </div>

      <div className="v15-unified-card-content relative p-7">
        <div className="absolute inset-x-0 top-0 h-24 -translate-y-full bg-gradient-to-t from-[#2a190f]/94 to-transparent" />

        <p className="text-xs uppercase tracking-[0.28em] text-[#dfb36d]">
          {product.categoryLabel}
        </p>

        <h3 className="mt-3 text-3xl font-black leading-tight text-white">
          {product.name}
        </h3>

        <p className="mt-3 min-h-[3.5rem] leading-relaxed text-stone-300">
          {product.shortDescription}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-[#d8aa62]/35 via-[#d8aa62]/12 to-transparent" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-[#e4b76f]">
              {product.price}
            </p>
            <p className="mt-1 text-xs text-stone-400">{product.stock}</p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              stopCardNavigation(event);
              openProduct();
            }}
            className="v174-product-card-button rounded-xl border border-[#d8aa62]/35 bg-[#b9853f] px-5 py-3 font-black text-white shadow-[0_10px_28px_rgba(185,133,63,.20)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#ca9650]"
          >
            Ver producto
          </button>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-0 ring-[#e4b76f]/0 transition duration-300 group-hover:ring-1 group-hover:ring-[#e4b76f]/35 group-focus-visible:ring-2 group-focus-visible:ring-[#e4b76f]/70"
      />
    </article>
  );
}
