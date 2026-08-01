
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/heroSlides";

const AUTOPLAY_MS = 6500;

const categories = [
  {
    icon: "◉",
    title: "Mates personalizados",
    text: "Grabados únicos con nombres, frases o logos.",
    href: "/productos",
    image: "/hero/hero-productos-limpio.jpg",
  },
  {
    icon: "⌁",
    title: "Llaveros",
    text: "Acrílico, MDF y cuero grabado.",
    href: "/productos",
    image: "/backgrounds/laser.jpg",
  },
  {
    icon: "▣",
    title: "Carteles",
    text: "Diseños decorativos y para negocios.",
    href: "/productos",
    image: "/backgrounds/trabajos.jpg",
  },
];

const sideBenefits = [
  {
    icon: "▱",
    title: "Envío gratis",
    line1: "Desde $60.000",
    line2: "A todo el país",
  },
  {
    icon: "◷",
    title: "Producción",
    line1: "2 a 5 días",
    line2: "Hábiles",
  },
  {
    icon: "◇",
    title: "Compra segura",
    line1: "100% protegida",
    line2: "Tus datos siempre",
  },
  {
    icon: "◡",
    title: "Atención",
    line1: "Personalizada",
    line2: "Por WhatsApp",
  },
];

const bottomBenefits = [
  ["▤", "6 cuotas sin interés", "Con todas las tarjetas"],
  ["⌁", "Medios de pago seguros", "Mercado Pago"],
  ["✎", "Diseños únicos", "Hechos para vos"],
  ["□", "Regalo perfecto", "Para cada ocasión"],
  ["🇦🇷", "Hecho en Argentina", "Con orgullo"],
];

export function HeroV176() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const slide = heroSlides[active];
  const total = heroSlides.length;

  const goTo = (index: number) => {
    setActive((index + total) % total);
  };

  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  return (
    <section
      className="v176-hero relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;

        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        const delta = end - touchStart.current;

        if (Math.abs(delta) > 50) {
          goTo(active + (delta < 0 ? 1 : -1));
        }

        touchStart.current = null;
      }}
    >
      <div className="v176-hero-background absolute inset-0" />
      <div className="v176-hero-shade absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-[1480px] px-5 pb-7 pt-32 md:px-7 md:pb-9 md:pt-36">
        <div className="v176-hero-grid">
          <article className="v176-glass v176-copy-panel">
            <p className="v176-eyebrow">✦ Grabados láser premium ✦</p>

            <h1>
              Identidad que
              <span>perdura para siempre</span>
            </h1>

            <p className="v176-lead">
              Creamos piezas únicas con tecnología láser de precisión y materiales seleccionados.
            </p>

            <div className="v176-main-benefits">
              <MiniBenefit icon="◇" title="Calidad premium" text="Materiales seleccionados" />
              <MiniBenefit icon="✦" title="Grabado láser" text="Precisión perfecta" />
              <MiniBenefit icon="♡" title="Hecho a mano" text="Con dedicación" />
              <MiniBenefit icon="▱" title="Envíos a todo Argentina" text="Rápido y seguro" />
            </div>

            <div className="v176-actions">
              <Link href="/productos" className="v176-primary-button">
                Ver catálogo <span>→</span>
              </Link>
              <Link href="/contacto" className="v176-secondary-button">
                Diseño personalizado <span>→</span>
              </Link>
            </div>
          </article>

          <article className="v176-glass v176-media-panel">
            <div
              key={slide.id}
              className="v176-slide-image"
              style={{
                backgroundImage: `url("${slide.image}")`,
                backgroundPosition: slide.imagePosition || "center",
              }}
            />

            <div className="v176-media-overlay" />

            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="v176-media-arrow v176-media-arrow-left"
              aria-label="Promoción anterior"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="v176-media-arrow v176-media-arrow-right"
              aria-label="Promoción siguiente"
            >
              ›
            </button>

            <div className="v176-media-badge">
              <span>✦</span>
              <div>
                <strong>{slide.eyebrow}</strong>
                <small>{slide.note || "Hecho a mano"}</small>
              </div>
            </div>

            <div className="v176-dots">
              {heroSlides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ir a promoción ${index + 1}`}
                  className={index === active ? "active" : ""}
                />
              ))}
            </div>
          </article>

          <aside className="v176-side-stack">
            {sideBenefits.map((item) => (
              <div key={item.title} className="v176-glass v176-side-card">
                <span className="v176-side-icon">{item.icon}</span>
                <div>
                  <p>{item.title}</p>
                  <strong>{item.line1}</strong>
                  <small>{item.line2}</small>
                </div>
              </div>
            ))}
          </aside>
        </div>

        <div className="v176-section-title">
          <span />
          <div>
            <h2>Categorías destacadas</h2>
            <p>Elegí lo que más te representa</p>
          </div>
          <span />
        </div>

        <div className="v176-category-grid">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="v176-glass v176-category-card"
            >
              <span className="v176-category-icon">{category.icon}</span>

              <div className="v176-category-copy">
                <h3>{category.title}</h3>
                <p>{category.text}</p>
                <span className="v176-category-link">
                  Ver productos <b>→</b>
                </span>
              </div>

              <div
                className="v176-category-image"
                style={{ backgroundImage: `url("${category.image}")` }}
              />
            </Link>
          ))}
        </div>

        <div className="v176-glass v176-bottom-strip">
          {bottomBenefits.map(([icon, title, text]) => (
            <div key={title} className="v176-bottom-item">
              <span>{icon}</span>
              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniBenefit({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="v176-mini-benefit">
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>{text}</small>
    </div>
  );
}
