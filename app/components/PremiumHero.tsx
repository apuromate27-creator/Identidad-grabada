
import Image from "next/image";
import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black">
      <div className="relative mx-auto max-w-[1536px]">
        <div className="relative aspect-[3/2] min-h-[560px] max-h-[900px] w-full overflow-hidden bg-black">
          <Image
            src="/hero/hero-identidad-grabada.png"
            alt="Identidad Grabada: mates y regalos personalizados con tecnología láser"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-[heroZoom_24s_ease-in-out_infinite_alternate]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />

          <Link
            href="/productos"
            aria-label="Ver catálogo"
            className="absolute bottom-[8.8%] left-[4.1%] h-[8.5%] w-[19.8%] rounded-xl focus-visible:ring-4 focus-visible:ring-[#d6b17a]/70"
          />
          <Link
            href="/contacto"
            aria-label="Pedir diseño personalizado"
            className="absolute bottom-[8.8%] left-[25.1%] h-[8.5%] w-[18.5%] rounded-xl focus-visible:ring-4 focus-visible:ring-[#d6b17a]/70"
          />
        </div>
      </div>

      <div className="grid gap-3 bg-black px-5 py-5 md:hidden">
        <Link href="/productos" className="rounded-2xl bg-[#b68b52] py-4 text-center font-black text-white">
          Ver catálogo
        </Link>
        <Link href="/contacto" className="rounded-2xl border border-[#b68b52] py-4 text-center font-black text-[#d6b17a]">
          Pedir diseño personalizado
        </Link>
      </div>
    </section>
  );
}
