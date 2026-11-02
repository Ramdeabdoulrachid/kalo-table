"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const isOpen = activeIndex !== null;
  const currentItem =
    activeIndex !== null ? galleryItems[activeIndex] ?? null : null;

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + galleryItems.length) % galleryItems.length;
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % galleryItems.length;
    });
  }, []);

  // Navigation clavier (Échap, Flèche gauche, Flèche droite)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Navigation tactile sur mobile (Swipe gauche / droite)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0]?.clientX ?? null);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="galerie"
      className="relative bg-[#F0E9DD]/60 py-14 sm:py-24 lg:py-28 border-t border-[#E8E0D4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C76A45]">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Regard gourmand
              </span>
              <h2 className="mt-2.5 font-serif text-2xl font-bold text-[#29251F] sm:mt-3 sm:text-4xl lg:text-[2.65rem]">
                Instantanés de notre table
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#766E63] sm:mt-3 sm:text-base">
                Plats mijotés, grillades sur braise, boissons fraîches et
                atmosphère chaleureuse. Touchez une photographie pour
                l&apos;explorer en plein écran.
              </p>
            </div>

            <span className="text-xs font-medium text-[#766E63]">
              {galleryItems.length} photographies • Plein écran & navigation tactile
            </span>
          </div>
        </ScrollReveal>

        {/* Grille asymétrique sur mobile (2 colonnes avec éléments mis en avant) ET sur desktop (12 colonnes) */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-12 md:auto-rows-[240px]">
          {galleryItems.map((item, idx) => {
            // Sur mobile, les photos 0, 3 et 6 prennent toute la largeur (col-span-2) pour créer un rythme asymétrique
            const isMobileFeatured = idx % 3 === 0;

            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ y: -3 }}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Agrandir la photographie : ${item.title}`}
                className={cn(
                  "group relative w-full overflow-hidden rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] text-left shadow-xs focus-visible:outline-none sm:rounded-3xl cursor-pointer",
                  isMobileFeatured
                    ? "col-span-2 min-h-[210px] sm:min-h-[240px]"
                    : "col-span-1 min-h-[165px] sm:min-h-[240px]",
                  item.spanClass
                )}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/85 via-[#29251F]/15 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                {/* Catégorie en haut à gauche */}
                <span className="absolute top-2.5 left-2.5 rounded-full bg-[#FFFDF9]/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#29251F] backdrop-blur-xs sm:top-4 sm:left-4 sm:px-3 sm:py-1 sm:text-[11px]">
                  {item.category}
                </span>

                {/* Icône plein écran en haut à droite */}
                <span className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#29251F]/65 text-[#FFFDF9] backdrop-blur-xs transition-opacity duration-200 sm:top-4 sm:right-4 sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </span>

                {/* Légende en bas */}
                <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-4">
                  <h3 className="font-serif text-sm font-bold leading-snug text-[#FFFDF9] sm:text-xl">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#F0E9DD]/90 sm:mt-1 sm:text-xs",
                      !isMobileFeatured && "hidden sm:line-clamp-2"
                    )}
                  >
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Visionneuse Plein Écran (Lightbox) avec support clavier & tactile */}
      <AnimatePresence>
        {isOpen && currentItem && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galerie plein écran : ${currentItem.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-50 flex h-[100dvh] flex-col justify-between bg-[#29251F]/95 p-4 backdrop-blur-md sm:p-8"
          >
            {/* Barre supérieure Lightbox */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-[#F8F5EF]">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-[#C76A45] px-3 py-1 text-xs font-bold text-[#FFFDF9]">
                  {activeIndex + 1} / {galleryItems.length}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-[#D6AA61]">
                  {currentItem.category}
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer la galerie plein écran (Échap)"
                className="inline-flex items-center gap-2 rounded-full border border-[#F8F5EF]/20 bg-[#F8F5EF]/10 px-4 py-2 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#C76A45] cursor-pointer"
              >
                <span>Fermer</span>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Zone centrale : Image */}
            <div className="relative mx-auto my-3 flex w-full max-w-5xl flex-1 items-center justify-center">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Photographie précédente"
                className="hidden sm:flex absolute left-4 z-20 h-11 w-11 items-center justify-center rounded-full border border-[#F8F5EF]/20 bg-[#29251F]/80 text-[#FFFDF9] shadow-lg transition-colors hover:bg-[#C76A45] cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>

              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative h-[52dvh] w-full overflow-hidden rounded-2xl border border-[#F8F5EF]/15 bg-[#1E1B16] sm:h-[68vh] sm:rounded-3xl"
              >
                <Image
                  src={currentItem.image}
                  alt={currentItem.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Photographie suivante"
                className="hidden sm:flex absolute right-4 z-20 h-11 w-11 items-center justify-center rounded-full border border-[#F8F5EF]/20 bg-[#29251F]/80 text-[#FFFDF9] shadow-lg transition-colors hover:bg-[#C76A45] cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Légende & Contrôles tactiles mobiles en bas */}
            <div className="mx-auto w-full max-w-4xl text-center">
              <h3 className="font-serif text-lg font-bold text-[#FFFDF9] sm:text-2xl">
                {currentItem.title}
              </h3>
              <p className="mt-1 text-xs text-[#F0E9DD]/85 sm:text-sm">
                {currentItem.caption}
              </p>

              {/* Boutons Précédent / Suivant dédiés au mobile */}
              <div className="mt-3 flex items-center justify-center gap-4 sm:hidden">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Photographie précédente"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#F8F5EF]/20 bg-[#F8F5EF]/10 px-4 py-2 text-xs font-semibold text-[#FFFDF9]"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Précédent</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Photographie suivante"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#F8F5EF]/20 bg-[#F8F5EF]/10 px-4 py-2 text-xs font-semibold text-[#FFFDF9]"
                >
                  <span>Suivant</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
