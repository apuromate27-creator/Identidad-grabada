
import Link from "next/link";

export function InternalPageHero({
  eyebrow,
  title,
  text,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  text: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <section className="v184-page-hero">
      <div className="v184-page-hero-copy">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{text}</span>

        {actionHref && actionLabel && (
          <Link href={actionHref} className="v184-page-hero-action">
            {actionLabel} →
          </Link>
        )}
      </div>

      <div className="v184-page-hero-info">
        <div>
          <strong>Grabado láser</strong>
          <small>Precisión y terminación premium</small>
        </div>
        <div>
          <strong>Personalización</strong>
          <small>Nombres, frases, fechas o logos</small>
        </div>
        <div>
          <strong>Envíos nacionales</strong>
          <small>Entregas coordinadas en Argentina</small>
        </div>
      </div>
    </section>
  );
}
