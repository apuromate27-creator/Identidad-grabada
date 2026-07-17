
import Image from "next/image";
import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-white/10 bg-black">
      {/* Product image, cropped to avoid the embedded menu and embedded text */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[64%] overflow-hidden">
        <Image
          src="/hero/hero-v10-7.png"
          alt="Mate y termo personalizados de Identidad Grabada"
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-[78%_60%] hero-product-motion"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/25 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Soft animated golden light */}
      <div className="pointer-events-none absolute right-[18%] top-[25%] h-80 w-80 rounded-full bg-[#b68b52]/20 blur-3xl hero-glow-motion" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl space-y-8 hero-copy-enter">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d6b17a] md:text-base">
            Grabados láser premium
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.94] tracking-tight md:text-7xl lg:text-8xl">
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
              className="hero-button-secondary rounded-2xl border border-[#b68b52] bg-black/45 px-8 py-5 text-lg font-black text-[#d6b17a] backdrop-blur"
            >
              Pedir diseño personalizado
            </Link>
          </div>

          <div className="grid max-w-3xl gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <Trust icon="🎁" title="A tu medida" />
            <Trust icon="✦" title="Alta precisión" />
            <Trust icon="🏅" title="Materiales premium" />
            <Trust icon="🚚" title="Envíos nacionales" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function Trust({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#b68b52]/60">
      <p className="text-xl">{icon}</p>
      <p className="mt-2 text-sm font-bold text-zinc-200">{title}</p>
    </div>
  );
}
