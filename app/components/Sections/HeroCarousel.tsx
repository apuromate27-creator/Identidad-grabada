
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { heroSlides } from "../../data/heroSlides";

const AUTOPLAY_MS = 7000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const total = heroSlides.length;
  const slide = heroSlides[active];

  const goTo = (index: number) => {
    setActive((index + total) % total);
  };

  useEffect(() => {
    if (paused || total <= 1) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) setPaused(true);
  }, []);

  const progressKey = useMemo(
    () => `${active}-${paused ? "paused" : "running"}`,
    [active, paused]
  );

  return (
    <section
      className="v16-hero-carousel relative isolate min-h-[100svh] overflow-hidden text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        const delta = end - touchStart.current;

        if (Math.abs(delta) > 55) {
          goTo(active + (delta < 0 ? 1 : -1));
        }

        touchStart.current = null;
      }}
      aria-roledescription="carrusel"
      aria-label="Promociones de Identidad Grabada"
    >
      <div className="absolute inset-0">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={[
              "v16-hero-slide absolute inset-0 transition-opacity duration-1000",
              index === active ? "z-10 opacity-100" : "z-0 opacity-0",
            ].join(" ")}
            aria-hidden={index !== active}
          >
            <div
              className="v16-hero-slide-image absolute inset-0"
              style={{
                backgroundImage: `url("${item.image}")`,
                backgroundPosition: item.imagePosition || "center",
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#100a07]/95 via-[#100a07]/62 to-transparent" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#100a07]/82 via-transparent to-[#100a07]/30" />
      <div className="pointer-events-none absolute left-[48%] top-[31%] z-20 h-72 w-72 rounded-full bg-[#d99b42]/15 blur-3xl" />

      <div className="relative z-30 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-48 pt-36 md:pt-40">
        <div key={slide.id} className="v16-hero-copy max-w-2xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.34em] text-[#d6a85f] md:text-base">
            {slide.eyebrow}
          </p>

          <h1 className="font-serif text-5xl leading-[0.98] tracking-tight md:text-7xl lg:text-[5.5rem]">
            {slide.title}
            <span className="mt-2 block text-[#c58d3f]">
              {slide.accent}
            </span>
          </h1>

          <div className="my-6 h-px w-20 bg-[#c58d3f]" />

          <p className="max-w-xl text-lg leading-relaxed text-stone-100 md:text-2xl">
            {slide.description}
          </p>

          {slide.note && (
            <p className="mt-3 text-base italic text-[#e8c58f] md:text-lg">
              {slide.note}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={slide.primaryHref}
              className="inline-flex items-center justify-center rounded-xl bg-[#c58d3f] px-7 py-4 text-base font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-[#d59b4a]"
            >
              {slide.primaryLabel}
            </Link>

            {slide.secondaryLabel && slide.secondaryHref && (
              <Link
                href={slide.secondaryHref}
                className="inline-flex items-center justify-center rounded-xl border border-[#d6a85f]/80 bg-[#130d09]/35 px-7 py-4 text-base font-black text-[#f0d4a6] backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#25160d]/72"
              >
                {slide.secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        className="v16-hero-arrow left-4 md:left-7"
        aria-label="Promoción anterior"
      >
        ←
      </button>

      <button
        type="button"
        onClick={() => goTo(active + 1)}
        className="v16-hero-arrow right-4 md:right-7"
        aria-label="Promoción siguiente"
      >
        →
      </button>

      <div className="absolute inset-x-0 bottom-32 z-40 flex items-center justify-center gap-3 px-6">
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(index)}
            className={[
              "group relative h-3 overflow-hidden rounded-full border transition-all",
              index === active
                ? "w-16 border-[#d6a85f]/70 bg-[#26170e]/75"
                : "w-3 border-white/35 bg-white/20 hover:border-[#d6a85f]",
            ].join(" ")}
            aria-label={`Ir a la promoción ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
          >
            {index === active && (
              <span
                key={progressKey}
                className={[
                  "v16-hero-progress absolute inset-y-0 left-0 bg-[#d6a85f]",
                  paused ? "paused" : "",
                ].join(" ")}
              />
            )}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#160e09]/55 text-sm text-white backdrop-blur"
          aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-40 mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#c58d3f]/25 bg-[#c58d3f]/20 shadow-2xl backdrop-blur-xl md:grid-cols-4">
          <HeroBenefit
            title="Calidad premium"
            text="Materiales seleccionados y alta precisión."
          />
          <HeroBenefit
            title="Hecho en Argentina"
            text="Diseño y producción con identidad nacional."
          />
          <HeroBenefit
            title="Regalos únicos"
            text="Nombres, frases, fechas y logos."
          />
          <HeroBenefit
            title="Envíos nacionales"
            text="Entregas coordinadas a todo el país."
          />
        </div>
      </div>
    </section>
  );
}

function HeroBenefit({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="bg-[#120c08]/76 p-5 backdrop-blur-md md:p-6">
      <p className="font-black text-[#e8c58f]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-300">{text}</p>
    </div>
  );
}
