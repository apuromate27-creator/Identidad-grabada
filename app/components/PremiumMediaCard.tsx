
import type { ReactNode } from "react";

export function PremiumMediaCard({
  media,
  eyebrow,
  title,
  description,
  footer,
  className = "",
}: {
  media: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`v15-unified-card group overflow-hidden rounded-[2rem] border border-[#d8aa62]/20 shadow-[0_25px_70px_rgba(0,0,0,.34)] ${className}`}
    >
      <div className="v15-unified-card-media relative h-80 overflow-hidden">
        {media}
        <div className="absolute inset-0 bg-gradient-to-t from-[#180e08]/55 via-transparent to-transparent" />
      </div>

      <div className="v15-unified-card-content relative p-6 md:p-7">
        <div className="absolute inset-x-0 top-0 h-20 -translate-y-full bg-gradient-to-t from-[#2a190f]/92 to-transparent" />

        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.26em] text-[#dfb36d]">
            {eyebrow}
          </p>
        )}

        <h3 className="mt-3 text-2xl font-black leading-tight text-white md:text-3xl">
          {title}
        </h3>

        {description && (
          <p className="mt-3 leading-relaxed text-stone-300">
            {description}
          </p>
        )}

        {footer && (
          <>
            <div className="my-5 h-px bg-gradient-to-r from-[#d8aa62]/35 via-[#d8aa62]/14 to-transparent" />
            {footer}
          </>
        )}
      </div>
    </article>
  );
}
