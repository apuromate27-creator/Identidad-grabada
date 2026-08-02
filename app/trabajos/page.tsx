
import { Header, Footer, WhatsAppFloat, ImageSlot } from "../components/ui";
import { PremiumMediaCard } from "../components/PremiumMediaCard";
import { InternalPageHero } from "../components/InternalPageHero";
import { works } from "../data/work";

export default function TrabajosPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-trabajos v184-internal-page">
      <Header />

      <section className="v184-page-shell">
        <InternalPageHero
          eyebrow="Galería"
          title="Trabajos realizados"
          text="Una selección preparada para mostrar mates, logos y regalos personalizados realizados con grabado láser."
          actionHref="/contacto"
          actionLabel="Solicitar un diseño"
        />

        <div className="v184-work-grid">
          {works.map((work, index) => (
            <PremiumMediaCard
              key={work.title}
              eyebrow={work.category}
              title={work.title}
              description={work.description}
              media={<ImageSlot title={`Trabajo ${index + 1}`} small />}
              footer={
                <p className="text-sm font-semibold text-[#e2b56e]">
                  Diseño personalizado · Grabado láser
                </p>
              }
            />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
