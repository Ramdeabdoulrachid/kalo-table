"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem, MenuItem } from "@/types";
import { menuItems } from "@/data/menu";
import { toast } from "sonner";

const CART_STORAGE_KEY = "kalo-table-cart-v1";

interface CartContextValue {
  items: CartItem[];
  isHydrated: boolean;
  isCartOpen: boolean;
  selectedDish: MenuItem | null;
  totalItems: number;
  subtotalFcfa: number;
  openCart: () => void;
  closeCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  openDishDetail: (dish: MenuItem) => void;
  closeDishDetail: () => void;
  addItem: (item: MenuItem, quantity?: number, silent?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Hydratation initiale depuis localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{
          itemId: string;
          quantity: number;
        }>;
        if (Array.isArray(parsed)) {
          const restored: CartItem[] = [];
          for (const entry of parsed) {
            const catalogItem = menuItems.find((m) => m.id === entry.itemId);
            if (
              catalogItem &&
              typeof entry.quantity === "number" &&
              entry.quantity > 0
            ) {
              restored.push({
                item: catalogItem,
                quantity: Math.min(99, Math.floor(entry.quantity)),
              });
            }
          }
          setItems(restored);
        }
      }
    } catch {
      // Ignorer un localStorage corrompu ou indisponible
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sauvegarde dans localStorage après hydratation
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const serialized = items.map((entry) => ({
        itemId: entry.item.id,
        quantity: entry.quantity,
      }));
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serialized));
    } catch {
      // Ignorer en navigation privée stricte
    }
  }, [items, isHydrated]);

  const addItem = useCallback(
    (item: MenuItem, quantity = 1, silent = false) => {
      const safeQty = Math.max(1, Math.floor(quantity));
      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.item.id === item.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(99, updated[existingIndex].quantity + safeQty),
          };
          return updated;
        }
        return [...prev, { item, quantity: Math.min(99, safeQty) }];
      });

      if (!silent) {
        toast.success(`${item.name} ajouté à la commande`, {
          description:
            safeQty > 1
              ? `${safeQty} portions ajoutées au panier.`
              : "Consultez votre panier pour finaliser sur WhatsApp.",
          action: {
            label: "Voir le panier",
            onClick: () => setIsCartOpen(true),
          },
        });
      }
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const safeQty = Math.floor(quantity);
    if (safeQty <= 0) {
      setItems((prev) => prev.filter((i) => i.item.id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((entry) =>
        entry.item.id === itemId
          ? { ...entry, quantity: Math.min(99, safeQty) }
          : entry
      )
    );
  }, []);

  const incrementItem = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.item.id === itemId
          ? { ...entry, quantity: Math.min(99, entry.quantity + 1) }
          : entry
      )
    );
  }, []);

  const decrementItem = useCallback((itemId: string) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.item.id === itemId
            ? { ...entry, quantity: entry.quantity - 1 }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast("Panier vidé", {
      description: "Tous les plats ont été retirés de votre sélection.",
    });
  }, []);

  const getItemQuantity = useCallback(
    (itemId: string) => {
      const found = items.find((entry) => entry.item.id === itemId);
      return found ? found.quantity : 0;
    },
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items]
  );

  const subtotalFcfa = useMemo(
    () =>
      items.reduce(
        (sum, entry) => sum + entry.item.price * entry.quantity,
        0
      ),
    [items]
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openDishDetail = useCallback(
    (dish: MenuItem) => setSelectedDish(dish),
    []
  );
  const closeDishDetail = useCallback(() => setSelectedDish(null), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isHydrated,
      isCartOpen,
      selectedDish,
      totalItems,
      subtotalFcfa,
      openCart,
      closeCart,
      setIsCartOpen,
      openDishDetail,
      closeDishDetail,
      addItem,
      removeItem,
      updateQuantity,
      incrementItem,
      decrementItem,
      clearCart,
      getItemQuantity,
    }),
    [
      items,
      isHydrated,
      isCartOpen,
      selectedDish,
      totalItems,
      subtotalFcfa,
      openCart,
      closeCart,
      openDishDetail,
      closeDishDetail,
      addItem,
      removeItem,
      updateQuantity,
      incrementItem,
      decrementItem,
      clearCart,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

