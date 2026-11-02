"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Eye,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShoppingBag,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { menuCategories, menuItems } from "@/data/menu";
import { MenuCategory } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { formatFcfa } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function MenuSection() {
  const {
    addItem,
    incrementItem,
    decrementItem,
    getItemQuantity,
    openDishDetail,
    totalItems,
    subtotalFcfa,
    openCart,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Compteurs par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<MenuCategory, number> = {
      all: menuItems.length,
      entrees: 0,
      plats: 0,
      grillades: 0,
      boissons: 0,
      desserts: 0,
    };
    for (const item of menuItems) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtrage combiné (catégorie + recherche par nom/ingrédient)
  const filteredItems = useMemo(() => {
    const normalizedSearch = searchQuery
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!normalizedSearch) return true;

      const searchableText = [
        item.name,
        item.shortDescription,
        item.categoryLabel,
        ...item.ingredients,
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return searchableText.includes(normalizedSearch);
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryObj =
    menuCategories.find((c) => c.id === activeCategory) ?? menuCategories[0];

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <section
      id="carte"
      className="relative bg-[#F8F5EF] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de la carte */}
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C76A45]">
              <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
              Carte numérique interactive
            </span>
            <h2 className="mt-2.5 font-serif text-2xl font-bold text-[#29251F] sm:mt-3 sm:text-4xl lg:text-5xl">
              La carte de KALO TABLE
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#766E63] sm:mt-4 sm:text-base">
              Explorez nos entrées, plats mijotés, grillades au feu de bois,
              boissons naturelles et douceurs. Touchez un plat pour découvrir sa
              fiche détaillée ou composez directement votre commande.
            </p>
          </div>
        </ScrollReveal>

        {/* Barre d'outils : Recherche + Filtres horizontaux fluides sur mobile */}
        <div className="mt-7 rounded-3xl border border-[#E8E0D4] bg-[#FFFDF9] p-3.5 shadow-xs sm:mt-10 sm:p-6">
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
            {/* Onglets de catégories : défilement horizontal tactile sur mobile, wrap sur sm+ */}
            <div
              role="tablist"
              aria-label="Catégories du menu"
              className="no-scrollbar -mx-1 flex snap-x items-center gap-1.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
            >
              {menuCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = categoryCounts[cat.id];
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "relative inline-flex shrink-0 snap-start items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm cursor-pointer",
                      isSelected
                        ? "text-[#FFFDF9]"
                        : "bg-[#F8F5EF] text-[#766E63] hover:bg-[#F0E9DD] hover:text-[#29251F]"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeMenuCategoryBg"
                        className="absolute inset-0 rounded-full bg-[#29251F]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      {cat.label}
                    </span>
                    <span
                      className={cn(
                        "relative z-10 rounded-full px-1.5 py-0.5 text-[10px] sm:text-[11px]",
                        isSelected
                          ? "bg-[#FFFDF9]/20 text-[#FFFDF9]"
                          : "bg-[#E8E0D4]/70 text-[#29251F]"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Champ de recherche d'un plat par son nom (text-base sur mobile pour éviter le zoom iOS) */}
            <div className="relative w-full lg:w-72">
              <label htmlFor="menu-search-input" className="sr-only">
                Rechercher un plat par son nom
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#766E63]"
                aria-hidden="true"
              />
              <input
                id="menu-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un plat (ex: yassa, bissap...)"
                className="w-full rounded-full border border-[#E8E0D4] bg-[#F8F5EF] py-2.5 pr-9 pl-10 text-base text-[#29251F] placeholder:text-[#766E63]/80 focus:border-[#C76A45] focus:bg-[#FFFDF9] focus:outline-none sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-[#766E63] hover:text-[#29251F] cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Barre d'état : description de la catégorie active + nombre de résultats */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#E8E0D4]/80 pt-3 text-xs text-[#766E63]">
            <p className="hidden sm:block">{activeCategoryObj.description}</p>
            <p aria-live="polite" className="font-semibold text-[#29251F]">
              {filteredItems.length}{" "}
              {filteredItems.length > 1 ? "plats affichés" : "plat affiché"}
              {searchQuery.trim() ? ` pour « ${searchQuery.trim()} »` : ""}
            </p>
          </div>
        </div>

        {/* Grille des plats filtrés */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#E8E0D4] bg-[#FFFDF9] p-8 text-center sm:p-12">
            <p className="font-serif text-lg font-bold text-[#29251F] sm:text-xl">
              Aucun plat ne correspond à votre recherche
            </p>
            <p className="mt-2 text-xs text-[#766E63] sm:text-sm">
              Essayez un autre mot-clé ou affichez l&apos;ensemble de notre carte.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#C76A45] px-5 py-2.5 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#AE5633] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((dish) => {
                const qtyInCart = getItemQuantity(dish.id);

                return (
                  <motion.article
                    layout
                    key={dish.id}
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={cn(
                      "group flex flex-col overflow-hidden rounded-3xl border bg-[#FFFDF9] transition-all duration-300",
                      qtyInCart > 0
                        ? "border-[#C76A45] shadow-[0_12px_32px_rgb(199,106,69,0.12)]"
                        : "border-[#E8E0D4] shadow-2xs hover:border-[#D6AA61] hover:shadow-md"
                    )}
                  >
                    {/* Image cliquable pour ouvrir la fiche détaillée */}
                    <div
                      onClick={() => openDishDetail(dish)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ouvrir la fiche détaillée de ${dish.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openDishDetail(dish);
                        }
                      }}
                      className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0E9DD] cursor-pointer"
                    >
                      <Image
                        src={dish.image}
                        alt={dish.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/40 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-[#FFFDF9]/95 px-2.5 py-0.5 text-[11px] font-medium text-[#766E63]">
                          {dish.categoryLabel}
                        </span>
                        {dish.badge && (
                          <span className="rounded-full bg-[#29251F]/85 px-2.5 py-0.5 text-[11px] font-medium text-[#D6AA61]">
                            {dish.badge}
                          </span>
                        )}
                      </div>

                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#FFFDF9]/95 px-2.5 py-1 text-[11px] font-semibold text-[#29251F] shadow-xs">
                        <Eye
                          className="h-3 w-3 text-[#C76A45]"
                          aria-hidden="true"
                        />
                        <span>Fiche plat</span>
                      </span>
                    </div>

                    {/* Corps de la carte */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-lg font-bold text-[#29251F]">
                            <button
                              type="button"
                              onClick={() => openDishDetail(dish)}
                              className="text-left transition-colors hover:text-[#C76A45] focus-visible:outline-none cursor-pointer"
                            >
                              {dish.name}
                            </button>
                          </h3>
                          <span className="shrink-0 rounded-full bg-[#F8F5EF] px-2.5 py-0.5 font-sans text-sm font-bold text-[#C76A45] border border-[#E8E0D4]">
                            {formatFcfa(dish.price)}
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#766E63] sm:text-sm">
                          {dish.shortDescription}
                        </p>
                      </div>

                      {/* Contrôles d'ajout et de quantité immédiate (touch targets >= 40px) */}
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#E8E0D4]/70 pt-3.5">
                        {qtyInCart > 0 ? (
                          <>
                            <div className="inline-flex items-center rounded-full border border-[#C76A45]/40 bg-[#F8F5EF] p-0.5">
                              <button
                                type="button"
                                onClick={() => decrementItem(dish.id)}
                                aria-label={`Diminuer la quantité de ${dish.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-[#29251F] transition-colors hover:bg-[#F0E9DD] cursor-pointer"
                              >
                                <Minus className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <span
                                aria-live="polite"
                                className="min-w-8 text-center text-xs font-bold text-[#29251F]"
                              >
                                {qtyInCart}
                              </span>
                              <button
                                type="button"
                                onClick={() => incrementItem(dish.id)}
                                aria-label={`Augmenter la quantité de ${dish.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-[#29251F] transition-colors hover:bg-[#F0E9DD] cursor-pointer"
                              >
                                <Plus className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-[#66764D]">
                              {formatFcfa(dish.price * qtyInCart)}
                            </span>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => openDishDetail(dish)}
                              className="py-2 text-xs font-medium text-[#766E63] hover:text-[#29251F] cursor-pointer"
                            >
                              Voir les détails
                            </button>

                            <button
                              type="button"
                              onClick={() => addItem(dish, 1)}
                              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#C76A45] px-4 text-xs font-semibold text-[#FFFDF9] shadow-2xs transition-all hover:bg-[#AE5633] active:scale-95 cursor-pointer"
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Ajouter</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bandeau récapitulatif de commande si des articles sont dans le panier */}
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-[#C76A45]/40 bg-[#FFFDF9] p-4 shadow-md sm:mt-10 sm:flex-row sm:p-5 sm:px-7"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#C76A45]/15 text-[#C76A45]">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-base font-bold text-[#29251F]">
                  Votre commande ({totalItems} article
                  {totalItems > 1 ? "s" : ""})
                </p>
                <p className="text-xs text-[#766E63]">
                  Total des articles :{" "}
                  <strong className="font-semibold text-[#C76A45]">
                    {formatFcfa(subtotalFcfa)}
                  </strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCart}
              className="w-full rounded-full bg-[#C76A45] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-xs transition-colors hover:bg-[#AE5633] sm:w-auto cursor-pointer"
            >
              Voir le panier & Commander sur WhatsApp
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
