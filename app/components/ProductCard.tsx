
import Link from "next/link";
import { ImageSlot } from "./ui";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="v15-unified-card group overflow-hidden rounded-[2rem] border border-[#d8aa62]/20 shadow-[0_25px_70px_rgba(0,0,0,.34)]">
      <Link href={`/productos/${product.slug}`} className="block">
        <div className="v15-unified-card-media relative h-80 overflow-hidden">
          <ImageSlot title={product.categoryLabel} small />

          <div className="absolute inset-0 bg-gradient-to-t from-[#180e08]/62 via-transparent to-transparent" />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#d8aa62]/40 bg-[#1d120b]/72 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#e5bd7c] backdrop-blur-md">
              {product.badge}
            </span>

            {product.bestSeller && (
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                Más vendido
              </span>
            )}
          </div>

          <div className="absolute bottom-5 right-5 rounded-full border border-white/10 bg-[#1d120b]/68 px-4 py-2 text-xs text-stone-200 backdrop-blur-md">
            Personalizable
          </div>
        </div>
      </Link>

      <div className="v15-unified-card-content relative p-7">
        <div className="absolute inset-x-0 top-0 h-24 -translate-y-full bg-gradient-to-t from-[#2a190f]/94 to-transparent" />

        <p className="text-xs uppercase tracking-[0.28em] text-[#dfb36d]">
          {product.categoryLabel}
        </p>

        <h3 className="mt-3 text-3xl font-black leading-tight text-white">
          {product.name}
        </h3>

        <p className="mt-3 min-h-[3.5rem] leading-relaxed text-stone-300">
          {product.shortDescription}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-[#d8aa62]/35 via-[#d8aa62]/12 to-transparent" />

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-[#e4b76f]">
              {product.price}
            </p>
            <p className="mt-1 text-xs text-stone-400">{product.stock}</p>
          </div>

          <Link
            href={`/productos/${product.slug}`}
            className="rounded-xl border border-[#d8aa62]/35 bg-[#b9853f] px-5 py-3 font-black text-white shadow-[0_10px_28px_rgba(185,133,63,.20)] transition duration-300 hover:-translate-y-1 hover:bg-[#ca9650]"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </article>
  );
}
