"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/heroSlides";

const BENEFITS = [
  ["▱", "Envíos a todo el país", "Entrega estimada de 1 a 5 días hábiles."],
  ["◷", "Producción propia", "Diseños exclusivos, hechos con dedicación."],
  ["◇", "Compra segura", "Medios de pago confiables y protegidos."],
  ["◡", "Atención por WhatsApp", "Asesoramiento personalizado."],
];

export function HeroV182() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const total = heroSlides.length;
  const slide = heroSlides[active];
  const goTo = (index: number) => setActive((index + total) % total);

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % total), 6200);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  return (
    <section className="v182-hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        const delta = end - touchStart.current;
        if (Math.abs(delta) > 50) goTo(active + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}>
      <div className="v182-shell"><div className="v182-grid">
        <article className="v182-panel v182-copy">
          <p className="v182-eyebrow">✦ Grabados láser premium ✦</p>
          <h1>Regalos que<span>perduran para siempre</span></h1>
          <p className="v182-lead">Creamos piezas únicas con tecnología láser de precisión y materiales seleccionados.</p>
          <div className="v182-actions">
            <Link href="/productos" className="v182-primary">Ver catálogo</Link>
            <Link href="/contacto" className="v182-secondary">Pedí tu diseño</Link>
          </div>
        </article>
        <article className="v182-panel v182-media">
          <div key={slide.id} className="v182-slide" style={{backgroundImage:`url("${slide.image}")`,backgroundPosition:slide.imagePosition || "center"}} />
          <div className="v182-media-shade" />
          <button type="button" onClick={() => goTo(active - 1)} className="v182-arrow v182-arrow-left" aria-label="Promoción anterior">‹</button>
          <button type="button" onClick={() => goTo(active + 1)} className="v182-arrow v182-arrow-right" aria-label="Promoción siguiente">›</button>
          <div className="v182-dots">{heroSlides.map((item,index)=><button key={item.id} type="button" onClick={()=>goTo(index)} aria-label={`Ir a promoción ${index+1}`} className={index===active?"active":""} />)}</div>
        </article>
        <aside className="v182-panel v182-benefits-panel">
          {BENEFITS.map(([icon,title,text])=><div key={title} className="v182-benefit"><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div></div>)}
        </aside>
      </div></div>
    </section>
  );
}
