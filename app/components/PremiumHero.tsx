import Image from "next/image";
import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black">
      <div className="relative mx-auto max-w-[1536px]">
        <div className="relative aspect-[3/2] min-h-[560px] max-h-[900px] w-full overflow-hidden bg-black">
          <Image
            src="/hero/hero-v10-7.png"
            alt="Identidad Grabada, regalos personalizados con tecnología láser"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-[heroZoom_24s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />
          <Link href="/" aria-label="Inicio" className="absolute left-[24.8%] top-[4.9%] h-[5.3%] w-[5.5%] rounded-lg" />
          <Link href="/productos" aria-label="Productos" className="absolute left-[30.4%] top-[4.9%] h-[5.3%] w-[8.2%] rounded-lg" />
          <Link href="/#como-trabajamos" aria-label="Cómo trabajamos" className="absolute left-[38.3%] top-[4.9%] h-[5.3%] w-[12.5%] rounded-lg" />
          <Link href="/trabajos" aria-label="Trabajos realizados" className="absolute left-[49.7%] top-[4.9%] h-[5.3%] w-[14.3%] rounded-lg" />
          <Link href="/empresas" aria-label="Empresas" className="absolute left-[63.4%] top-[4.9%] h-[5.3%] w-[7.2%] rounded-lg" />
          <Link href="/nosotros" aria-label="Nosotros" className="absolute left-[70.8%] top-[4.9%] h-[5.3%] w-[7.0%] rounded-lg" />
          <Link href="/contacto" aria-label="Contacto" className="absolute left-[77.4%] top-[4.9%] h-[5.3%] w-[7.8%] rounded-lg" />
          <Link href="/productos" aria-label="Ver productos" className="absolute left-[3.2%] bottom-[17.4%] h-[9.0%] w-[21.0%] rounded-xl focus-visible:ring-4 focus-visible:ring-[#d6b17a]/70" />
          <Link href="/contacto" aria-label="Pedir diseño personalizado" className="absolute left-[25.8%] bottom-[17.4%] h-[9.0%] w-[19.5%] rounded-xl focus-visible:ring-4 focus-visible:ring-[#d6b17a]/70" />
        </div>
      </div>
      <div className="grid gap-3 bg-black px-5 py-5 md:hidden">
        <Link href="/productos" className="rounded-2xl bg-[#b68b52] py-4 text-center font-black text-white">Ver productos</Link>
        <Link href="/contacto" className="rounded-2xl border border-[#b68b52] py-4 text-center font-black text-[#d6b17a]">Pedir diseño personalizado</Link>
      </div>
    </section>
  );
}
