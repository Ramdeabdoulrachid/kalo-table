"use client";

import React from "react";
import { Calendar, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatFcfa } from "@/lib/currency";

export function MobileBottomBar() {
  const { totalItems, subtotalFcfa, openCart, isCartOpen, selectedDish } =
    useCart();

  // Ne pas superposer la barre si le panier ou une fiche plat est ouverte
  if (isCartOpen || selectedDish) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Actions rapides mobiles"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E8E0D4] bg-[#FFFDF9]/95 px-4 py-2.5 shadow-[0_-8px_24px_rgb(41,37,31,0.08)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href="#reservation"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#29251F]/20 bg-[#F8F5EF] px-4 py-2.5 text-xs font-semibold text-[#29251F] active:scale-[0.98]"
        >
          <Calendar className="h-4 w-4 text-[#C76A45]" aria-hidden="true" />
          <span>Réserver</span>
        </a>

        <button
          type="button"
          onClick={openCart}
          className="flex flex-[1.45] items-center justify-center gap-2 rounded-full bg-[#C76A45] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] shadow-sm active:scale-[0.98] cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          <span>
            Commander {totalItems > 0 ? `(${totalItems})` : ""}
          </span>
          {totalItems > 0 && (
            <span className="rounded-full bg-[#FFFDF9]/20 px-2 py-0.5 text-[11px]">
              {formatFcfa(subtotalFcfa)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

