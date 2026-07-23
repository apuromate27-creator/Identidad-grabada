
import Image from "next/image";
import Link from "next/link";

export function PremiumHero() {
  return (
    <>
      <section className="relative isolate min-h-[86vh] overflow-hidden border-b border-white/10 bg-[#1d130d]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
          <Image
            src="/backgrounds/hero.jpg"
            alt="Mate, tabla de madera y termo de Identidad Grabada"
            fill
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="object-cover object-[66%_52%] hero-v12-motion"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </div>

        <div className="pointer-events-none absolute right-[16%] top-[24%] h-72 w-72 rounded-full bg-[#b68b52]/20 blur-3xl hero-glow-motion" />

        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl items-center px-6 py-20">
          <div className="max-w-3xl space-y-8 hero-copy-enter">
            <p className="text-sm uppercase tracking-[0.36em] text-[#d6b17a] md:text-base">
              Grabados láser premium
            </p>

            <h1 className="text-5xl font-black leading-[0.94] tracking-tight md:text-7xl lg:text-8xl">
              Tu historia,
              <span className="block text-[#c99249]">grabada para siempre.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-zinc-300 md:text-2xl">
              Regalos personalizados con tecnología láser y materiales de primera calidad.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/productos"
                className="hero-button-primary rounded-2xl bg-[#b68b52] px-8 py-5 text-lg font-black text-white shadow-2xl"
              >
                Ver productos
              </Link>

              <Link
                href="/contacto"
                className="hero-button-secondary rounded-2xl border border-[#b68b52] bg-[#1d130d]/50 px-8 py-5 text-lg font-black text-[#d6b17a] backdrop-blur"
              >
                Pedir diseño personalizado
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#281a11]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-6 lg:grid-cols-4">
          <Benefit icon="👥" title="+500" text="Clientes felices" />
          <Benefit icon="🕒" title="24 hs" text="Respuesta rápida" />
          <Benefit icon="🛡" title="Calidad" text="Garantizada" />
          <Benefit icon="🚚" title="Argentina" text="Envíos a todo el país" />
        </div>
      </section>
    </>
  );
}

function Benefit({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1d130d]/35 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#b68b52]/60">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#b68b52]/50 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-lg font-black text-white">{title}</p>
        <p className="text-sm text-zinc-500">{text}</p>
      </div>
    </div>
  );
}
