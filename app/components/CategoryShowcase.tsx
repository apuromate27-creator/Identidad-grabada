
import Link from "next/link";
import { ImageSlot, Title } from "./ui";

const categories = [
  {
    title: "Imperiales",
    text: "Presencia premium y gran superficie para personalizar.",
    href: "/productos/categoria/imperiales",
  },
  {
    title: "Camioneros",
    text: "Clásicos, cómodos y pensados para el uso diario.",
    href: "/productos/categoria/camioneros",
  },
  {
    title: "Torpedos",
    text: "Diseño moderno y terminaciones que llaman la atención.",
    href: "/productos/categoria/torpedos",
  },
];

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Title
        eyebrow="Colecciones"
        title="Encontrá tu estilo"
        text="Explorá las categorías principales y elegí el formato ideal para personalizar."
      />

      <div className="mt-12 grid gap-7 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.title}
            href={category.href}
            className="ig-card ig-hover-lift group min-h-[500px] rounded-[3rem]"
          >
            <div className="absolute inset-0">
              <ImageSlot title={category.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d6b17a]">
                Colección 0{index + 1}
              </p>
              <h3 className="mt-3 text-4xl font-black">{category.title}</h3>
              <p className="mt-3 max-w-sm text-zinc-300">{category.text}</p>
              <p className="mt-6 font-black text-[#d6b17a]">Explorar colección →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
