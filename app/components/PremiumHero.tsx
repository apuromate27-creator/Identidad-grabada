
import Image from "next/image";
import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black">
      <div className="relative mx-auto max-w-[1536px]">
        <div className="relative aspect-[3/2] min-h-[560px] max-h-[900px] w-full overflow-hidden bg-black">
          <Image
            src="/hero/hero-v11-1.png"
            alt="Identidad Grabada: regalos personalizados con tecnología láser"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center hero-scene-motion"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />

          <Link href="/" aria-label="Inicio" className="absolute left-[22.4%] top-[5%] h-[5.2%] w-[5.5%]" />
          <Link href="/productos" aria-label="Productos" className="absolute left-[28.2%] top-[5%] h-[5.2%] w-[8.6%]" />
          <Link href="/#como-trabajamos" aria-label="Cómo trabajamos" className="absolute left-[36.4%] top-[5%] h-[5.2%] w-[12.5%]" />
          <Link href="/trabajos" aria-label="Trabajos realizados" className="absolute left-[48%] top-[5%] h-[5.2%] w-[14.5%]" />
          <Link href="/empresas" aria-label="Empresas" className="absolute left-[60.8%] top-[5%] h-[5.2%] w-[8%]" />
          <Link href="/nosotros" aria-label="Nosotros" className="absolute left-[68.8%] top-[5%] h-[5.2%] w-[7.5%]" />
          <Link href="/contacto" aria-label="Contacto" className="absolute left-[75.7%] top-[5%] h-[5.2%] w-[8%]" />

          <Link href="/productos" aria-label="Ver productos" className="absolute bottom-[23.2%] left-[4.3%] h-[7.6%] w-[18.3%] rounded-xl focus-visible:ring-4 focus-visible:ring-[#d6b17a]/70" />
          <Link href="/contacto" aria-label="Pedir diseño personalizado" className="absolute bottom-[23.2%] left-[23.9%] h-[7.6%] w-[21.6%] rounded-xl focus-visible:ring-4 focus-visible:ring-[#d6b17a]/70" />
        </div>
      </div>

      <div className="grid gap-3 bg-black px-5 py-5 md:hidden">
        <Link href="/productos" className="rounded-2xl bg-[#b68b52] py-4 text-center font-black text-white">
          Ver productos
        </Link>
        <Link href="/contacto" className="rounded-2xl border border-[#b68b52] py-4 text-center font-black text-[#d6b17a]">
          Pedir diseño personalizado
        </Link>
      </div>
    </section>
  );
}
