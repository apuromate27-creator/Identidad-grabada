
import Link from "next/link";
import { ImageSlot } from "./ui";

export function BrandStory() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div className="ig-card min-h-[640px] rounded-[3.5rem]">
          <ImageSlot title="Proceso artesanal" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 rounded-2xl border border-white/10 bg-[#1d130d]/65 px-5 py-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-[#d6b17a]">
              Identidad Grabada
            </p>
            <p className="mt-2 font-black">Diseño, precisión y trabajo artesanal</p>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.34em] text-[#d6b17a]">
            Nuestra forma de trabajar
          </p>

          <h2 className="text-5xl font-black leading-tight md:text-7xl">
            No grabamos objetos.
            <span className="block text-[#c99249]">Grabamos historias.</span>
          </h2>

          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            Cada producto se prepara para que el diseño, la posición y la terminación representen la idea del cliente.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Point title="Diseño aprobado" text="Confirmamos la propuesta antes de producir." />
            <Point title="Terminación cuidada" text="Revisamos cada pieza antes del despacho." />
            <Point title="Materiales seleccionados" text="Buscamos una presentación coherente y premium." />
            <Point title="Atención directa" text="Acompañamos el pedido durante todo el proceso." />
          </div>

          <Link
            href="/trabajos"
            className="inline-block rounded-2xl bg-[#b68b52] px-8 py-5 font-black text-white"
          >
            Conocer nuestros trabajos
          </Link>
        </div>
      </div>
    </section>
  );
}

function Point({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <p className="font-black text-[#d6b17a]">✓ {title}</p>
      <p className="mt-2 text-sm text-zinc-500">{text}</p>
    </div>
  );
}
