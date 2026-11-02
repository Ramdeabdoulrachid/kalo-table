"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatFcfa } from "@/lib/currency";

export function DishDetailModal() {
  const { selectedDish, closeDishDetail, addItem, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  // Réinitialiser la quantité à 1 à chaque ouverture d'un nouveau plat
  useEffect(() => {
    if (selectedDish) {
      setQuantity(1);
    }
  }, [selectedDish]);

  // Fermer avec Échap et bloquer le défilement arrière-plan
  useEffect(() => {
    if (!selectedDish) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDishDetail();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDish, closeDishDetail]);

  if (!selectedDish) return null;

  const existingCartQty = getItemQuantity(selectedDish.id);
  const lineTotal = selectedDish.price * quantity;

  const handleConfirmAdd = () => {
    addItem(selectedDish, quantity);
    closeDishDetail();
  };

  return (
    <AnimatePresence>
      {selectedDish && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
        >
          {/* Fond assombri */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDishDetail}
            className="fixed inset-0 bg-[#29251F]/65 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Fenêtre modale responsive */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] border border-[#E8E0D4] bg-[#FFFDF9] shadow-2xl sm:rounded-[2rem]"
          >
            {/* Grande photographie en haut */}
            <div className="relative h-64 w-full shrink-0 bg-[#F0E9DD] sm:h-80">
              <Image
                src={selectedDish.image}
                alt={selectedDish.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/70 via-transparent to-[#29251F]/25" />

              {/* Badges sur l'image */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#FFFDF9]/95 px-3.5 py-1 text-xs font-semibold text-[#29251F] shadow-xs">
                  {selectedDish.categoryLabel}
                </span>
                {selectedDish.badge && (
                  <span className="rounded-full bg-[#C76A45] px-3.5 py-1 text-xs font-semibold text-[#FFFDF9] shadow-xs">
                    {selectedDish.badge}
                  </span>
                )}
              </div>

              {/* Bouton Fermer */}
              <button
                type="button"
                onClick={closeDishDetail}
                aria-label="Fermer la fiche du plat"
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFDF9]/95 text-[#29251F] shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Titre et prix superposés au bas de l'image */}
              <div className="absolute inset-x-6 bottom-4 flex items-end justify-between gap-4">
                <div>
                  <h2
                    id="dish-modal-title"
                    className="font-serif text-2xl font-bold text-[#FFFDF9] sm:text-3xl"
                  >
                    {selectedDish.name}
                  </h2>
                  {selectedDish.prepTime && (
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#F0E9DD]">
                      <Clock className="h-3.5 w-3.5 text-[#D6AA61]" aria-hidden="true" />
                      <span>Préparation : {selectedDish.prepTime}</span>
                    </span>
                  )}
                </div>

                <div className="shrink-0 rounded-2xl bg-[#FFFDF9] px-4 py-2 text-right shadow-md">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#766E63]">
                    Prix unitaire
                  </span>
                  <span className="font-serif text-lg font-bold text-[#C76A45]">
                    {formatFcfa(selectedDish.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Corps scrollable de la fiche */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7">
              {existingCartQty > 0 && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#66764D]/15 px-3.5 py-1 text-xs font-semibold text-[#66764D]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    Déjà {existingCartQty} portion{existingCartQty > 1 ? "s" : ""}{" "}
                    dans votre panier
                  </span>
                </div>
              )}

              <p className="text-sm leading-relaxed text-[#29251F] sm:text-base">
                {selectedDish.fullDescription}
              </p>

              {/* Ingrédients principaux */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 font-serif text-base font-bold text-[#29251F]">
                  <Utensils className="h-4 w-4 text-[#C76A45]" aria-hidden="true" />
                  <span>Ingrédients & composition</span>
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selectedDish.ingredients.map((ingredient) => (
                    <li
                      key={ingredient}
                      className="rounded-full border border-[#E8E0D4] bg-[#F8F5EF] px-3.5 py-1.5 text-xs font-medium text-[#29251F]"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accompagnements & note d'assaisonnement */}
              {selectedDish.accompaniments &&
                selectedDish.accompaniments.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-[#E8E0D4] bg-[#F8F5EF] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                      Servi avec
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#29251F]">
                      {selectedDish.accompaniments.join(" • ")}
                    </p>
                  </div>
                )}

              {typeof selectedDish.spicyLevel === "number" &&
                selectedDish.spicyLevel > 0 && (
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#766E63]">
                    <Flame className="h-3.5 w-3.5 text-[#C76A45]" aria-hidden="true" />
                    <span>
                      Le piment maison est toujours servi à part pour s&apos;adapter
                      à votre goût.
                    </span>
                  </p>
                )}
            </div>

            {/* Barre d'action inférieure : Sélecteur de quantité + Ajouter au panier */}
            <div className="flex flex-col gap-3 border-t border-[#E8E0D4] bg-[#F8F5EF] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
              {/* Sélecteur de quantité */}
              <div className="flex items-center justify-between gap-4 sm:justify-start">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                  Quantité
                </span>
                <div className="inline-flex items-center rounded-full border border-[#E8E0D4] bg-[#FFFDF9] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Diminuer la quantité"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#29251F] transition-colors hover:bg-[#F0E9DD] disabled:opacity-40 cursor-pointer"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span
                    aria-live="polite"
                    className="min-w-10 text-center font-sans text-sm font-bold text-[#29251F]"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(30, q + 1))}
                    aria-label="Augmenter la quantité"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#29251F] transition-colors hover:bg-[#F0E9DD] cursor-pointer"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Bouton Ajouter au panier avec montant calculé immédiatement */}
              <button
                type="button"
                onClick={handleConfirmAdd}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#C76A45] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-md transition-all hover:bg-[#AE5633] active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Ajouter au panier</span>
                <span className="rounded-full bg-[#FFFDF9]/20 px-2.5 py-0.5 text-xs font-bold">
                  {formatFcfa(lineTotal)}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

