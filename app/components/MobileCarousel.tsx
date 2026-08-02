"use client";

import { ReactNode, useRef } from "react";

export function MobileCarousel({
  children,
  ariaLabel,
  className = "",
}: {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = item ? item.offsetWidth + 12 : track.clientWidth * 0.82;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className={`v188-carousel ${className}`} aria-label={ariaLabel}>
      <div ref={trackRef} className="v188-carousel-track">{children}</div>
      <div className="v188-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Anterior">‹</button>
        <span />
        <button type="button" onClick={() => move(1)} aria-label="Siguiente">›</button>
      </div>
    </div>
  );
}
