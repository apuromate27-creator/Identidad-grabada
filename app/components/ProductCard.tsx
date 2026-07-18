
import Link from "next/link";
import { ImageSlot } from "./ui";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="ig-card ig-hover-lift group rounded-[2.25rem]">
      <Link href={`/productos/${product.slug}`} className="block">
        <div className="relative h-80 overflow-hidden bg-[#111]">
          <ImageSlot title={product.categoryLabel} small />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          <div className="absolute left-5 top-5 flex gap-2">
            <span className="rounded-full border border-[#b68b52]/40 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#d6b17a] backdrop-blur">
              {product.badge}
            </span>

            {product.bestSeller && (
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                Más vendido
              </span>
            )}
          </div>

          <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-black/65 px-4 py-2 text-xs text-zinc-300 backdrop-blur">
            Personalizable
          </div>
        </div>
      </Link>

      <div className="relative space-y-5 p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#d6b17a]">
            {product.categoryLabel}
          </p>
          <h3 className="mt-3 text-3xl font-black leading-tight">
            {product.name}
          </h3>
          <p className="mt-3 leading-relaxed text-zinc-500">
            {product.shortDescription}
          </p>
        </div>

        <div className="ig-gold-line" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-[#d6b17a]">{product.price}</p>
            <p className="mt-1 text-xs text-zinc-500">{product.stock}</p>
          </div>

          <Link
            href={`/productos/${product.slug}`}
            className="rounded-2xl bg-[#b68b52] px-5 py-3 font-black text-white transition hover:scale-[1.03]"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </article>
  );
}
