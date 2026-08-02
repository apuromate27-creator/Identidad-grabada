
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { products, categories } from "../data/products";

const quickCategories = [
  { id: "todos", label: "Todos", icon: "▦", href: "/productos" },
  { id: "imperiales", label: "Imperiales", icon: "♕", href: "/productos/categoria/imperiales" },
  { id: "camioneros", label: "Camioneros", icon: "◉", href: "/productos/categoria/camioneros" },
  { id: "torpedos", label: "Torpedos", icon: "◆", href: "/productos/categoria/torpedos" },
  { id: "rancheros", label: "Rancheros", icon: "♢", href: "/productos/categoria/rancheros" },
];

export function ProductCatalog({
  initialCategory = "todos",
}: {
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("destacados");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list =
      category === "todos"
        ? products
        : products.filter((product) => product.category === category);

    const normalized = query.trim().toLowerCase();

    if (normalized) {
      list = list.filter((product) =>
        `${product.name} ${product.categoryLabel} ${product.material} ${product.tags.join(" ")}`
          .toLowerCase()
          .includes(normalized)
      );
    }

    if (sort === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "mas-vendidos") {
      list = [...list].sort(
        (a, b) => Number(b.bestSeller) - Number(a.bestSeller)
      );
    }

    if (sort === "nuevos") {
      list = [...list].reverse();
    }

    return list;
  }, [category, sort, query]);

  return (
    <>
      <div className="v16-catalog-controls v188-sticky-filters mt-10 rounded-[2rem] border border-[#d8aa62]/22 p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Buscar productos</span>
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#d8aa62]">
              ⌕
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar imperial, camionero, algarrobo..."
              className="w-full rounded-2xl border border-white/10 bg-[#1d130d]/58 py-4 pl-12 pr-5 text-white outline-none backdrop-blur transition placeholder:text-stone-400 focus:border-[#b68b52]"
            />
          </label>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="min-w-56 rounded-2xl border border-white/10 bg-[#1d130d]/72 px-5 py-4 text-white outline-none backdrop-blur focus:border-[#b68b52]"
            aria-label="Ordenar productos"
          >
            <option value="destacados">Destacados</option>
            <option value="mas-vendidos">Más vendidos</option>
            <option value="nuevos">Nuevos</option>
            <option value="az">Nombre A–Z</option>
          </select>
        </div>

        <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {quickCategories.map((item) => {
              const active = category === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setCategory(item.id)}
                  className={[
                    "inline-flex shrink-0 items-center gap-2 rounded-xl border px-5 py-3 text-sm font-black transition",
                    active
                      ? "border-[#b68b52] bg-[#b68b52] text-white shadow-[0_10px_28px_rgba(182,139,82,.22)]"
                      : "border-white/10 bg-[#24160d]/42 text-stone-200 backdrop-blur hover:border-[#b68b52]/65 hover:text-[#edc988]",
                  ].join(" ")}
                >
                  <span className="text-[#edc988]">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <p className="shrink-0 text-sm text-stone-300">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="v16-empty-state mt-10 rounded-[2rem] border border-dashed border-[#d8aa62]/24 p-12 text-center backdrop-blur">
          <p className="text-2xl font-black text-white">
            No encontramos productos
          </p>
          <p className="mt-3 text-stone-300">
            Probá otra búsqueda o elegí una categoría diferente.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("todos");
            }}
            className="mt-6 rounded-xl bg-[#b68b52] px-6 py-3 font-black text-white"
          >
            Ver todos
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
