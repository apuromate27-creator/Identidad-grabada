
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
  personalization: string;
};

type CartInput = Omit<CartItem, "id" | "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalValue: number;
  hasQuotedItems: boolean;
};

const STORAGE_KEY = "identidad-grabada-cart-v17";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("identidad-grabada-cart");

      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  function addItem(item: CartInput) {
    const requestedQuantity = Math.max(1, Math.min(item.quantity ?? 1, 20));

    setItems((current) => {
      const existing = current.find(
        (entry) =>
          entry.slug === item.slug &&
          entry.personalization === item.personalization
      );

      if (existing) {
        return current.map((entry) =>
          entry.id === existing.id
            ? {
                ...entry,
                quantity: Math.min(existing.quantity + requestedQuantity, 20),
              }
            : entry
        );
      }

      const { quantity: _quantity, ...rest } = item;

      return [
        ...current,
        {
          ...rest,
          id: `${item.slug}-${Date.now()}`,
          quantity: requestedQuantity,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, 20) }
              : item
          )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalValue = items.reduce(
    (sum, item) => sum + item.priceValue * item.quantity,
    0
  );

  const hasQuotedItems = items.some((item) => item.priceValue <= 0);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalValue,
      hasQuotedItems,
    }),
    [items, totalItems, totalValue, hasQuotedItems]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
