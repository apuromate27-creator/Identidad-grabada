
import Link from "next/link";
import { ImageSlot } from "./ui";

export function PremiumHero() {
  return (
    <section className="relative min-h-[92vh] border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(182,139,82,0.35),transparent_32%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/60" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 min-h-[92vh] grid lg:grid-cols-[1.05fr_.95fr] gap-14 items-center">
        <div className="space-y-9">
          <div className="inline-flex items-center gap-3 border border-[#b68b52]/30 bg-[#b68b52]/10 rounded-full px-5 py-3">
            <span className="text-[#d6b17a]">✦</span>
            <span className="text-[#d6b17a] uppercase tracking-[0.25em] text-xs">Diseño, precisión y trabajo artesanal</span>
          </div>
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">Regalos personalizados grabados con precisión láser.</h1>
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-2xl">Elegí el mate, contanos tu idea y aprobá el diseño antes de que lo grabemos.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/productos" className="bg-[#b68b52] text-white px-9 py-5 rounded-2xl font-black text-lg hover:scale-[1.03] transition">Comprar ahora</Link>
            <Link href="/trabajos" className="border border-white/15 bg-white/5 px-9 py-5 rounded-2xl font-black text-lg hover:border-[#b68b52] transition">Ver trabajos</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 pt-3">
            <TrustMini icon="✓" title="Diseño aprobado" text="Antes del grabado" />
            <TrustMini icon="✦" title="Producción cuidada" text="Terminación premium" />
            <TrustMini icon="🚚" title="Envíos nacionales" text="A toda Argentina" />
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-10 rounded-full bg-[#b68b52]/15 blur-3xl" />
          <div className="relative min-h-[650px] rounded-[3.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            <ImageSlot title="Video o foto principal" />
            <div className="absolute inset-x-8 bottom-8 bg-black/75 border border-white/10 rounded-[2rem] p-6 backdrop-blur">
              <p className="text-[#d6b17a] uppercase tracking-[0.25em] text-xs">Producto destacado</p>
              <h2 className="text-3xl font-black mt-3">Mate Torpedo Cincelado</h2>
              <p className="text-zinc-400 mt-2">Personalización premium con nombre, frase o logo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustMini({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="border border-white/10 bg-white/5 rounded-2xl p-4">
      <p className="text-[#d6b17a] text-xl">{icon}</p>
      <p className="font-black mt-2">{title}</p>
      <p className="text-zinc-500 text-sm">{text}</p>
    </div>
  );
}
