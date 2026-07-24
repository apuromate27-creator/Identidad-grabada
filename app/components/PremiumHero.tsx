import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="v15-hero relative isolate min-h-[100svh] overflow-hidden text-white">
      <div className="v15-hero-image absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#100a07]/95 via-[#100a07]/62 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100a07]/78 via-transparent to-[#100a07]/30" />
      <div className="v15-sun-glow pointer-events-none absolute left-[48%] top-[31%] h-72 w-72 rounded-full bg-[#d99b42]/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-44 pt-36 md:pt-40">
        <div className="v15-copy max-w-2xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.34em] text-[#d6a85f] md:text-base">
            Grabados láser premium
          </p>

          <h1 className="font-serif text-5xl leading-[0.98] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Tu historia,
            <span className="mt-2 block text-[#c58d3f]">grabada para siempre.</span>
          </h1>

          <div className="my-6 h-px w-20 bg-[#c58d3f]" />

          <p className="max-w-xl text-lg leading-relaxed text-stone-100 md:text-2xl">
            Regalos personalizados con tecnología láser y materiales de primera calidad.
          </p>
          <p className="mt-3 text-base italic text-[#e8c58f] md:text-lg">
            Hecho en Argentina, para regalar o regalarte.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/productos"
              className="v15-primary inline-flex items-center justify-center rounded-xl bg-[#c58d3f] px-7 py-4 text-base font-black text-white shadow-2xl"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contacto"
              className="v15-secondary inline-flex items-center justify-center rounded-xl border border-[#d6a85f]/80 bg-[#130d09]/35 px-7 py-4 text-base font-black text-[#f0d4a6] backdrop-blur-md"
            >
              Diseñar mi producto
            </Link>
          </div>

          <p className="mt-7 flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-stone-200">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#c58d3f] text-[#d6a85f]">✓</span>
            Más de 500 clientes felices en Argentina
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#c58d3f]/25 bg-[#c58d3f]/20 shadow-2xl backdrop-blur-xl md:grid-cols-4">
          <HeroBenefit title="Calidad premium" text="Materiales seleccionados y alta precisión." />
          <HeroBenefit title="Hecho en Argentina" text="Diseño y producción con identidad nacional." />
          <HeroBenefit title="Regalos únicos" text="Nombres, frases, fechas y logos." />
          <HeroBenefit title="Envíos nacionales" text="Entregas coordinadas a todo el país." />
        </div>
      </div>
    </section>
  );
}

function HeroBenefit({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#120c08]/82 p-5 md:p-6">
      <p className="font-black text-[#e8c58f]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-300">{text}</p>
    </div>
  );
}
