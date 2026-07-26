
import Link from "next/link";

export default function ResponsivePreviewPage() {
  const sizes = [
    ["Celular compacto", "375 × 667"],
    ["Celular moderno", "390 × 844"],
    ["Tablet", "768 × 1024"],
  ];

  return (
    <main className="min-h-screen bg-[#16100b] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#d6a85f]">
          Vista de prueba
        </p>
        <h1 className="mt-3 text-4xl font-black">
          Comprobación responsive V16.5
        </h1>
        <p className="mt-4 text-stone-300">
          Probá estos tamaños desde las herramientas de desarrollador del navegador.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sizes.map(([name, size]) => (
            <article key={name} className="rounded-[2rem] border border-[#d6a85f]/20 bg-[#2a1a10]/70 p-6">
              <p className="font-black">{name}</p>
              <p className="mt-2 font-mono text-[#e8c58f]">{size}</p>
            </article>
          ))}
        </div>
        <Link href="/" className="mt-10 inline-flex rounded-xl bg-[#b68b52] px-6 py-4 font-black">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
