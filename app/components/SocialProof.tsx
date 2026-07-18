
import { Title } from "./ui";

const reviews = [
  {
    quote: "El grabado quedó mucho mejor de lo que imaginaba. La presentación fue impecable.",
    name: "Martín G.",
    product: "Mate Imperial personalizado",
  },
  {
    quote: "Muy buena atención y excelente calidad. Aprobé el diseño antes de que lo grabaran.",
    name: "Sofía R.",
    product: "Mate Camionero de calabaza",
  },
  {
    quote: "Lo pedí para regalo y quedó increíble. Se nota el cuidado en todos los detalles.",
    name: "Lucas M.",
    product: "Mate Torpedo cincelado",
  },
];

export function SocialProof() {
  return (
    <section className="border-y border-white/10 bg-[#090909] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Title
          eyebrow="Experiencias"
          title="Lo que dicen nuestros clientes"
          text="Testimonios de ejemplo listos para reemplazar por opiniones reales."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="ig-card ig-hover-lift rounded-[2.5rem] p-8"
            >
              <p className="text-2xl tracking-[0.18em] text-[#d6b17a]">★★★★★</p>
              <blockquote className="mt-6 text-xl leading-relaxed text-zinc-200">
                “{review.quote}”
              </blockquote>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-black">{review.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{review.product}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
