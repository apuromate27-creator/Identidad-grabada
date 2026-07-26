
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export function CartButton() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative rounded-xl border border-white/10 bg-[#1d130d]/40 px-4 py-3 font-bold transition hover:border-[#b68b52]"
        aria-label={`Abrir carrito. ${totalItems} productos`}
      >
        🛒 Carrito
        {totalItems > 0 && (
          <span className="ml-2 rounded-full bg-[#b68b52] px-2 py-1 text-xs text-white">
            {totalItems}
          </span>
        )}
      </button>

      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  );
}

function CartDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  const { totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999]">
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-black/64 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside className="v17-cart-drawer absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-[#d8aa62]/20">
        <div className="flex shrink-0 items-center justify-between border-b border-[#d8aa62]/14 p-5 md:p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-[#e2b46d]">
              Tu selección
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Carrito
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-xl text-stone-200 transition hover:border-[#d8aa62]/55"
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-6">
          <CartContent
            onCheckout={onClose}
            onContinue={onClose}
          />
        </div>
      </aside>
    </div>
  );
}

export function CartContent({
  onCheckout,
  onContinue,
}: {
  onCheckout?: () => void;
  onContinue?: () => void;
}) {
  const {
    items,
    removeItem,
    updateQuantity,
    totalValue,
    hasQuotedItems,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-[#d8aa62]/24 p-8 text-center">
        <p className="text-5xl">🛒</p>
        <h3 className="mt-4 text-2xl font-black text-white">
          Tu carrito está vacío
        </h3>
        <p className="mt-2 text-stone-400">
          Agregá un producto personalizado para comenzar.
        </p>
        <Link
          href="/productos"
          onClick={onContinue}
          className="mt-6 inline-flex rounded-xl bg-[#b68b52] px-6 py-4 font-black text-white"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="v17-cart-item rounded-[1.5rem] border border-white/8 p-4"
        >
          <div className="grid grid-cols-[72px_1fr] gap-4">
            <div className="grid h-[72px] place-items-center rounded-xl border border-[#d8aa62]/15 bg-[#21140d]/36 font-black text-[#e2b46d]">
              IG
            </div>

            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black leading-tight text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#e8c58f]">
                    {item.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs font-bold text-red-300 transition hover:text-red-200"
                >
                  Quitar
                </button>
              </div>

              {item.personalization && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs font-bold text-stone-400">
                    Ver personalización
                  </summary>
                  <p className="mt-2 rounded-xl bg-[#1d130d]/34 p-3 text-xs leading-relaxed text-stone-300">
                    {item.personalization}
                  </p>
                </details>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-[#1d130d]/40 text-white"
                aria-label="Reducir cantidad"
              >
                −
              </button>

              <span className="w-8 text-center font-black text-white">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-[#1d130d]/40 text-white"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="text-xs text-stone-500">Subtotal</p>
              <p className="font-black text-[#e8c58f]">
                {item.priceValue > 0
                  ? `$${(
                      item.priceValue * item.quantity
                    ).toLocaleString("es-AR")}`
                  : "A coordinar"}
              </p>
            </div>
          </div>
        </article>
      ))}

      <div className="v17-cart-total rounded-[1.5rem] border border-[#d8aa62]/22 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-stone-400">Subtotal</p>
            <p className="mt-1 text-2xl font-black text-white">
              {totalValue > 0
                ? `$${totalValue.toLocaleString("es-AR")}`
                : "A coordinar"}
            </p>
          </div>
          <p className="text-right text-xs leading-relaxed text-stone-500">
            Envío y descuentos se calculan en el checkout.
          </p>
        </div>

        {hasQuotedItems && (
          <p className="mt-4 rounded-xl border border-[#d8aa62]/14 bg-[#21140d]/28 p-3 text-xs leading-relaxed text-stone-300">
            Algunos productos requieren cotización antes del pago final.
          </p>
        )}
      </div>

      <div className="grid gap-3 pb-2">
        <Link
          href="/checkout"
          onClick={onCheckout}
          className="block rounded-xl bg-[#b68b52] py-4 text-center font-black text-white transition hover:bg-[#c99958]"
        >
          Finalizar compra
        </Link>

        <Link
          href="/productos"
          onClick={onContinue}
          className="block rounded-xl border border-white/10 py-4 text-center font-bold text-white transition hover:border-[#d8aa62]/55"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
