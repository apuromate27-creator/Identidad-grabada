
import Link from "next/link";
import type { StoreCategory } from "../../data/categories";

export function CategoryCarouselCard({
  category,
}: {
  category: StoreCategory;
}) {
  return (
    <Link
      href={category.href}
      className="v16-category-card group relative block shrink-0 snap-center overflow-hidden rounded-[2rem] border border-[#e1b46b]/22 shadow-[0_28px_75px_rgba(0,0,0,.40)]"
    >
      <div
        className="absolute inset-0 scale-[1.02] bg-cover transition duration-700 group-hover:scale-[1.08]"
        style={{
          backgroundImage: `url("${category.image}")`,
          backgroundPosition: category.position,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0805]/95 via-[#150c07]/40 to-[#080503]/8" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#100905]/48 via-transparent to-transparent" />

      <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#e1b46b]/55 bg-[#1b1009]/68 font-serif text-lg text-[#edc988] backdrop-blur-md">
        {category.number}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#e1b46b]">
          {category.eyebrow}
        </p>

        <h3 className="mt-3 font-serif text-4xl text-white md:text-5xl">
          {category.title}
        </h3>

        <p className="mt-4 max-w-sm leading-relaxed text-stone-200">
          {category.description}
        </p>

        <div className="mt-7 inline-flex items-center gap-3 font-black text-[#edc988]">
          Explorar colección
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
