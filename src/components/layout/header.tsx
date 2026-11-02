"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Menu,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { restaurantConfig } from "@/config/restaurant";
import { getRestaurantOpenStatus, OpenStatusResult } from "@/lib/opening-hours";
import { useCart } from "@/hooks/use-cart";
import { formatFcfa } from "@/lib/currency";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "histoire", label: "Notre histoire", href: "#histoire" },
  { id: "carte", label: "La carte", href: "#carte" },
  { id: "galerie", label: "Galerie", href: "#galerie" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Header() {
  const { totalItems, subtotalFcfa, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [openStatus, setOpenStatus] = useState<OpenStatusResult | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      setOpenStatus(getRestaurantOpenStatus(new Date()));
    };
    updateStatus();
    const timer = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observation de la section active au défilement
  useEffect(() => {
    const sectionIds = [
      "accueil",
      "histoire",
      "specialites",
      "carte",
      "galerie",
      "reservation",
      "contact",
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "specialites") {
              setActiveSection("carte");
            } else if (id === "reservation") {
              setActiveSection("contact");
            } else {
              setActiveSection(id);
            }
          }
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Bloquer le scroll arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Fermer le menu mobile avec la touche Échap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Petite barre d'information supérieure compacte sur mobile */}
      <div className="bg-[#29251F] text-[#F8F5EF] border-b border-[#3D372E] text-[11px] sm:text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3.5 py-1.5 sm:px-6 sm:py-2 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <span className="inline-flex truncate items-center gap-1.5 text-[#F0E9DD]">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-[#D6AA61]"
                aria-hidden="true"
              />
              <span className="truncate">{restaurantConfig.regionLabel}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#E8E0D4]/90">
              <Clock className="h-3.5 w-3.5 text-[#C76A45]" aria-hidden="true" />
              <span>{restaurantConfig.scheduleSummary}</span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            {openStatus && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF9]/10 px-2.5 py-0.5 text-[10px] font-medium sm:text-[11px]"
                title={openStatus.detail}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2",
                    openStatus.isOpen
                      ? "bg-[#88A85D] animate-pulse"
                      : "bg-[#D6AA61]"
                  )}
                />
                <span>{openStatus.label}</span>
              </span>
            )}

            <a
              href="#reservation"
              className="hidden sm:inline-flex items-center gap-1 font-medium text-[#D6AA61] underline-offset-4 hover:underline focus-visible:outline-none"
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Réservation rapide</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "bg-[#F8F5EF]/95 shadow-[0_8px_30px_rgb(41,37,31,0.06)] backdrop-blur-md border-b border-[#E8E0D4]"
            : "bg-[#F8F5EF]/90 backdrop-blur-sm border-b border-[#E8E0D4]/60"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3.5 py-2.5 sm:px-6 sm:py-3.5 lg:px-8">
          {/* Logo KALO TABLE */}
          <a
            href="#accueil"
            onClick={() => handleNavClick("accueil")}
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3 focus-visible:outline-none"
            aria-label="KALO TABLE — Retour à l'accueil"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C76A45] text-[#FFFDF9] shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
              <UtensilsCrossed
                className="h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-serif text-lg font-bold tracking-wider text-[#29251F] sm:text-2xl">
                KALO TABLE
              </span>
              <span className="truncate text-[9px] font-medium uppercase tracking-[0.2em] text-[#766E63] sm:text-[10px]">
                Bobo-Dioulasso
              </span>
            </div>
          </a>

          {/* Liens de navigation Desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-1 rounded-full border border-[#E8E0D4] bg-[#FFFDF9]/80 px-2 py-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleNavClick(link.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-[#29251F]"
                      : "text-[#766E63] hover:text-[#29251F]"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[#F0E9DD]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Boutons d'action Desktop & Mobile */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="#reservation"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-[#29251F]/20 bg-[#FFFDF9] px-4 py-2.5 text-sm font-medium text-[#29251F] transition-all hover:border-[#C76A45] hover:text-[#C76A45]"
            >
              <Calendar className="h-4 w-4 text-[#C76A45]" aria-hidden="true" />
              <span>Réserver une table</span>
            </a>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Commander — Panier (${totalItems} article${totalItems > 1 ? "s" : ""})`}
              className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#C76A45] px-3.5 text-xs font-semibold text-[#FFFDF9] shadow-sm transition-all hover:bg-[#AE5633] active:scale-[0.98] sm:h-auto sm:px-4 sm:py-2.5 sm:text-sm cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden xs:inline sm:inline">Commander</span>
              <motion.span
                key={totalItems}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFFDF9] px-1.5 text-[11px] font-bold text-[#C76A45]"
              >
                {totalItems}
              </motion.span>
            </button>

            {/* Bouton Menu Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileMenuOpen
                  ? "Fermer le menu de navigation"
                  : "Ouvrir le menu de navigation"
              }
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8E0D4] bg-[#FFFDF9] text-[#29251F] transition-colors hover:border-[#C76A45] lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tiroir Menu Mobile Pleine Hauteur (100dvh) parfaitement adapté à tous les écrans */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#29251F]/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu mobile KALO TABLE"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex h-[100dvh] w-full max-w-sm flex-col justify-between border-l border-[#E8E0D4] bg-[#FFFDF9] p-5 shadow-2xl"
            >
              <div>
                {/* En-tête du menu mobile */}
                <div className="flex items-center justify-between border-b border-[#E8E0D4] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C76A45] text-[#FFFDF9]">
                      <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block font-serif text-lg font-bold text-[#29251F]">
                        KALO TABLE
                      </span>
                      <span className="block text-[10px] uppercase tracking-widest text-[#766E63]">
                        Navigation
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Fermer le menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E0D4] bg-[#F8F5EF] text-[#29251F] cursor-pointer"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Statut d'ouverture */}
                {openStatus && (
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#F8F5EF] px-3.5 py-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#29251F]">
                      <Sparkles
                        className="h-3.5 w-3.5 text-[#C76A45]"
                        aria-hidden="true"
                      />
                      Statut actuel
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        openStatus.isOpen ? "text-[#66764D]" : "text-[#C76A45]"
                      )}
                    >
                      {openStatus.label}
                    </span>
                  </div>
                )}

                {/* Liens de navigation */}
                <nav
                  aria-label="Menu mobile"
                  className="mt-5 flex flex-col space-y-1.5"
                >
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={() => handleNavClick(link.id)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3.5 font-serif text-lg font-medium transition-colors",
                          isActive
                            ? "bg-[#F0E9DD] text-[#C76A45]"
                            : "text-[#29251F] hover:bg-[#F8F5EF]"
                        )}
                      >
                        <span>{link.label}</span>
                        <span className="font-sans text-xs uppercase tracking-widest text-[#766E63]">
                          0{idx + 1}
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Actions bas de menu mobile */}
              <div className="space-y-3 border-t border-[#E8E0D4] pt-4">
                <a
                  href="#reservation"
                  onClick={() => handleNavClick("contact")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#29251F]/20 bg-[#F8F5EF] px-4 py-3.5 text-sm font-semibold text-[#29251F]"
                >
                  <Calendar className="h-4 w-4 text-[#C76A45]" aria-hidden="true" />
                  <span>Réserver une table</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C76A45] px-4 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Mon panier ({totalItems})
                    {totalItems > 0 ? ` • ${formatFcfa(subtotalFcfa)}` : ""}
                  </span>
                </button>

                <p className="text-center text-[11px] text-[#766E63]">
                  {restaurantConfig.regionLabel} • {restaurantConfig.scheduleSummary}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
