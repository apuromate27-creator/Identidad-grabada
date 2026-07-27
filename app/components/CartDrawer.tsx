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
        className="v173-cart-trigger"
        aria-label={`Abrir carrito. ${totalItems} productos`}
      >
        <span aria-hidden="true">🛒</span>
        <span className="v173-cart-label">Carrito</span>
        {totalItems > 0 && <b>{totalItems}</b>}
      </button>
      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  );
}

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { totalItems } = useCart();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999]">
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="v17-cart-drawer v173-cart-drawer absolute right-0 top-0 flex h-[100dvh] w-full max-w-[420px] flex-col border-l border-[#d8aa62]/20">
        <header className="flex items-center justify-between border-b border-[#d8aa62]/14 px-5 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[.26em] text-[#e2b46d]">Tu selección</p>
            <h2 className="mt-1 text-2xl font-black text-white">Tu carrito</h2>
            <p className="mt-1 text-xs text-stone-500">
              {totalItems} {totalItems === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-lg text-white"
            aria-label="Cerrar carrito"
          >×</button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <CartContent onCheckout={onClose} onContinue={onClose} />
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
  const { items, removeItem, updateQuantity, totalValue, hasQuotedItems } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-[1.4rem] border border-dashed border-[#d8aa62]/24 p-8 text-center">
        <p className="text-4xl">🛒</p>
        <h3 className="mt-4 text-xl font-black text-white">Tu carrito está vacío</h3>
        <Link href="/productos" onClick={onContinue}
          className="mt-5 inline-flex rounded-xl bg-[#b98239] px-5 py-3 font-black text-white">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <article key={item.id} className="v17-cart-item rounded-[1.2rem] border border-white/8 p-3.5">
          <div className="grid grid-cols-[64px_1fr] gap-3">
            <div className="grid h-16 place-items-center rounded-xl border border-[#d8aa62]/15 bg-[#21140d]/36 font-black text-[#e2b46d]">IG</div>
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black leading-tight text-white">{item.name}</h3>
                  <p className="mt-1 text-sm font-black text-[#e8c58f]">{item.price}</p>
                </div>
                <button type="button" onClick={() => removeItem(item.id)} className="text-xs text-red-300">🗑</button>
              </div>
              {item.personalization && (
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-stone-400">
                  {item.personalization}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10">−</button>
              <span className="w-5 text-center text-sm font-black">{item.quantity}</span>
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10">+</button>
            </div>
            <p className="text-sm font-black text-[#e8c58f]">
              {item.priceValue > 0
                ? `$${(item.priceValue * item.quantity).toLocaleString("es-AR")}`
                : "A coordinar"}
            </p>
          </div>
        </article>
      ))}

      <div className="rounded-[1.2rem] border border-[#d8aa62]/18 bg-[#21140d]/24 p-4">
        <div className="flex items-end justify-between">
          <p className="text-lg font-black text-white">Total</p>
          <p className="text-2xl font-black text-[#e3a94e]">
            {totalValue > 0 ? `$${totalValue.toLocaleString("es-AR")}` : "A coordinar"}
          </p>
        </div>
        {hasQuotedItems && (
          <p className="mt-3 text-[11px] text-stone-400">
            Algunos productos requieren cotización antes del pago.
          </p>
        )}
      </div>

      <Link href="/checkout" onClick={onCheckout}
        className="block rounded-xl bg-[#b98239] py-3.5 text-center font-black text-white">
        Finalizar compra
      </Link>
      <Link href="/checkout" onClick={onCheckout}
        className="block rounded-xl border border-[#d8aa62]/35 py-3.5 text-center font-black text-[#e8c58f]">
        Ver carrito completo
      </Link>
      <p className="pb-2 text-center text-[11px] text-stone-500">🔒 Compra 100% segura</p>
    </div>
  );
}
