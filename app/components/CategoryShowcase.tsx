
import Link from "next/link";

const categories = [
  {
    number: "01",
    title: "Imperiales",
    eyebrow: "Clásicos premium",
    text: "Presencia, tradición y una gran superficie para crear grabados únicos.",
    href: "/productos/categoria/imperiales",
    position: "center 42%",
  },
  {
    number: "02",
    title: "Camioneros",
    eyebrow: "Tradición cotidiana",
    text: "Cómodos, resistentes y pensados para acompañarte todos los días.",
    href: "/productos/categoria/camioneros",
    position: "68% 50%",
  },
  {
    number: "03",
    title: "Torpedos",
    eyebrow: "Diseño contemporáneo",
    text: "Líneas modernas y terminaciones que resaltan cada personalización.",
    href: "/productos/categoria/torpedos",
    position: "38% 55%",
  },
  {
    number: "04",
    title: "Rancheros",
    eyebrow: "Espíritu artesanal",
    text: "Madera cálida, carácter argentino y una estética bien tradicional.",
    href: "/productos/categoria/rancheros",
    position: "78% 45%",
  },
];

export function CategoryShowcase() {
  return (
    <section className="v15-categories relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#120b07]/18 via-transparent to-[#120b07]/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120b07]/8 via-transparent to-[#120b07]/32" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6a85f]/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.34em] text-[#e2b66f]">
            Colecciones
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-tight text-white md:text-7xl">
            Elegí el mate que
            <span className="block text-[#d19a4d]">cuente tu historia.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-200 md:text-xl">
            Cuatro estilos, una misma identidad: productos preparados para personalizar con nombres, frases, fechas o logos.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="v15-category-card group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[#e1b46b]/20 shadow-[0_30px_80px_rgba(0,0,0,.38)]"
            >
              <div
                className="absolute inset-0 scale-[1.02] bg-[url('/backgrounds/categorias.jpg')] bg-cover transition duration-700 group-hover:scale-[1.08]"
                style={{ backgroundPosition: category.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100905]/95 via-[#160d08]/35 to-[#080503]/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#100905]/45 to-transparent" />
              <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#e1b46b]/55 bg-[#1b1009]/65 font-serif text-lg text-[#edc988] backdrop-blur">
                {category.number}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <p className="text-xs uppercase tracking-[0.28em] text-[#e1b46b]">
                  {category.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-4xl text-white md:text-5xl">
                  {category.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-stone-200">
                  {category.text}
                </p>
                <div className="mt-7 inline-flex items-center gap-3 font-black text-[#edc988]">
                  Explorar colección
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/productos"
            className="rounded-xl border border-[#e1b46b]/55 bg-[#1b1009]/65 px-8 py-4 font-black text-[#f0d5a8] backdrop-blur transition hover:-translate-y-1 hover:bg-[#b98239] hover:text-white"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#20130b] to-transparent" />
    </section>
  );
}
