
import {
  Header,
  Footer,
  WhatsAppFloat,
  Title,
  ImageSlot,
} from "../components/ui";
import { PremiumMediaCard } from "../components/PremiumMediaCard";
import { works } from "../data/work";

export default function TrabajosPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-trabajos">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Title
          eyebrow="Galería"
          title="Trabajos realizados"
          text="Galería preparada para cargar fotos reales de mates, logos y regalos personalizados."
        />

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work, index) => (
            <PremiumMediaCard
              key={work.title}
              eyebrow={work.category}
              title={work.title}
              description={work.description}
              media={
                <ImageSlot
                  title={`Trabajo ${index + 1}`}
                  small
                />
              }
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
