
export function TrustStrip() {
  const items = [
    ["Pago seguro", "Mercado Pago y tarjeta"],
    ["Diseño aprobado", "Antes del grabado"],
    ["Producción cuidada", "Control de terminación"],
    ["Envíos nacionales", "A toda Argentina"],
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="ig-soft-glow grid gap-4 rounded-[2.5rem] border border-[#b68b52]/20 bg-[#2d1d13] p-5 md:grid-cols-4">
        {items.map(([title, text], index) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-[#1d130d]/30 p-5"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#d6b17a]">
              0{index + 1}
            </p>
            <p className="mt-3 font-black">{title}</p>
            <p className="mt-1 text-sm text-zinc-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
