"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, Eye, Plus, Sparkles } from "lucide-react";
import { signatureDishes } from "@/data/menu";
import { useCart } from "@/hooks/use-cart";
import { formatFcfa } from "@/lib/currency";
import { MenuItem } from "@/types";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function SpecialtiesSection() {
  const { addItem, openDishDetail, getItemQuantity } = useCart();
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleQuickAdd = (dish: MenuItem) => {
    addItem(dish, 1);
    setRecentlyAddedId(dish.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === dish.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      id="specialites"
      className="relative bg-[#F0E9DD]/65 py-20 sm:py-28 border-y border-[#E8E0D4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de section éditorial */}
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C76A45]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Les incontournables de KALO TABLE
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#29251F] sm:text-4xl lg:text-[2.6rem]">
                Nos spécialités emblématiques
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#766E63]">
                Six créations phares qui incarnent l&apos;esprit de notre table :
                cuissons à la braise, sauces longuement mijotées et accompagnements
                généreux.
              </p>
            </div>

            <a
              href="#carte"
              className="inline-flex items-center gap-2 rounded-full border border-[#29251F]/20 bg-[#FFFDF9] px-5 py-2.5 text-sm font-semibold text-[#29251F] transition-colors hover:border-[#C76A45] hover:text-[#C76A45]"
            >
              <span>Explorer toute la carte</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Grille asymétrique et respirante des 6 spécialités */}
        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {signatureDishes.slice(0, 6).map((dish, index) => {
            const isJustAdded = recentlyAddedId === dish.id;
            const inCartQty = getItemQuantity(dish.id);

            return (
              <motion.article
                key={dish.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#E8E0D4] bg-[#FFFDF9] shadow-[0_10px_30px_rgb(41,37,31,0.05)] transition-shadow hover:shadow-[0_20px_45px_rgb(41,37,31,0.1)]"
              >
                {/* Photographie du plat avec zoom subtil au survol */}
                <div
                  onClick={() => openDishDetail(dish)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Voir les détails de ${dish.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openDishDetail(dish);
                    }
                  }}
                  className="relative aspect-[16/11] w-full overflow-hidden bg-[#F0E9DD] cursor-pointer"
                >
                  <Image
                    src={dish.image}
                    alt={dish.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/45 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

                  {/* Badge spécialité */}
                  {dish.badge && (
                    <span className="absolute top-3.5 left-3.5 rounded-full bg-[#FFFDF9]/95 px-3 py-1 text-[11px] font-semibold text-[#29251F] shadow-xs backdrop-blur-xs">
                      {dish.badge}
                    </span>
                  )}

                  {/* Numéro éditorial discret */}
                  <span className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#29251F]/65 font-serif text-xs font-medium text-[#FFFDF9] backdrop-blur-xs">
                    0{index + 1}
                  </span>

                  {/* Bouton aperçu rapide au survol */}
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF9]/90 px-3 py-1 text-xs font-medium text-[#29251F] opacity-0 shadow-xs backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
                    <Eye className="h-3.5 w-3.5 text-[#C76A45]" aria-hidden="true" />
                    <span>Détails</span>
                  </span>
                </div>

                {/* Contenu de la carte */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-bold text-[#29251F] group-hover:text-[#C76A45] transition-colors">
                        <button
                          type="button"
                          onClick={() => openDishDetail(dish)}
                          className="text-left focus-visible:outline-none cursor-pointer"
                        >
                          {dish.name}
                        </button>
                      </h3>
                      <span className="shrink-0 rounded-full bg-[#F8F5EF] px-3 py-1 font-sans text-sm font-bold text-[#C76A45] border border-[#E8E0D4]">
                        {formatFcfa(dish.price)}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#766E63]">
                      {dish.shortDescription}
                    </p>
                  </div>

                  {/* Pied de carte : bouton Ajouter à la commande */}
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#E8E0D4]/80 pt-4">
                    <button
                      type="button"
                      onClick={() => openDishDetail(dish)}
                      className="text-xs font-semibold text-[#766E63] underline-offset-4 hover:text-[#29251F] hover:underline cursor-pointer"
                    >
                      Fiche & ingrédients
                    </button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleQuickAdd(dish)}
                      className={
                        isJustAdded
                          ? "inline-flex items-center gap-2 rounded-full bg-[#66764D] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] shadow-xs transition-colors cursor-pointer"
                          : "inline-flex items-center gap-2 rounded-full bg-[#29251F] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] shadow-xs transition-colors hover:bg-[#C76A45] cursor-pointer"
                      }
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Ajouté au panier</span>
                        </>
                      ) : (
                        <>
                          <Plus
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-90"
                            aria-hidden="true"
                          />
                          <span>
                            Ajouter à la commande
                            {inCartQty > 0 ? ` (${inCartQty})` : ""}
                          </span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

