
const benefits = [
  {
    icon: "✦",
    title: "Grabado láser",
    text: "Alta precisión y terminaciones cuidadas.",
  },
  {
    icon: "▣",
    title: "Personalizá",
    text: "Nombres, frases, fechas o logos.",
  },
  {
    icon: "◇",
    title: "Calidad premium",
    text: "Materiales seleccionados para durar.",
  },
  {
    icon: "▱",
    title: "Envíos nacionales",
    text: "Entregas coordinadas en toda Argentina.",
  },
];

export function StoreBenefits({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "v16-benefits-grid grid gap-px overflow-hidden rounded-[2rem] border border-[#d8aa62]/22",
        compact ? "md:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-4",
      ].join(" ")}
    >
      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="v16-benefit-item flex items-start gap-4 p-5 md:p-6"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d8aa62]/45 bg-[#24160d]/55 text-xl text-[#e2b46d] backdrop-blur">
            {benefit.icon}
          </div>

          <div>
            <p className="font-black text-white">{benefit.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-stone-300">
              {benefit.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
