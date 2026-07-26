
"use client";

import Link from "next/link";
import { useRef } from "react";
import { storeCategories } from "../../data/categories";
import { CategoryCarouselCard } from "../Cards/CategoryCarouselCard";

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-category-card]");
    const distance = firstCard
      ? firstCard.offsetWidth + 20
      : Math.min(window.innerWidth * 0.84, 420);

    track.scrollBy({
      left: distance * direction,
      behavior: "smooth",
    });
  };

  return (
    <section className="v16-categories relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#120b07]/10 via-transparent to-[#120b07]/40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6a85f]/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-24 md:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.34em] text-[#e2b66f]">
              Colecciones
            </p>

            <h2 className="mt-4 font-serif text-5xl leading-tight text-white md:text-7xl">
              Elegí el mate que
              <span className="block text-[#d19a4d]">cuente tu historia.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-200 md:text-xl">
              Deslizá hacia los costados para comparar los estilos y abrir la colección que más te represente.
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => move(-1)}
              className="v16-carousel-button"
              aria-label="Ver categoría anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="v16-carousel-button"
              aria-label="Ver categoría siguiente"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="v16-category-track mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
          aria-label="Categorías de mates"
        >
          {storeCategories.map((category) => (
            <div
              key={category.title}
              data-category-card
              className="shrink-0 snap-center"
            >
              <CategoryCarouselCard category={category} />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-5">
          <p className="text-sm text-stone-300 md:hidden">
            Deslizá con el dedo para ver más →
          </p>

          <Link
            href="/productos"
            className="ml-auto rounded-xl border border-[#e1b46b]/50 bg-[#1b1009]/62 px-7 py-4 font-black text-[#f0d5a8] backdrop-blur transition hover:-translate-y-1 hover:bg-[#b98239] hover:text-white"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
