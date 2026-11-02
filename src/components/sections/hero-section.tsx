"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Flame,
  MapPin,
  Plus,
  ShoppingBag,
  Sparkles,
  Utensils,
} from "lucide-react";
import { restaurantConfig } from "@/config/restaurant";
import { menuItems } from "@/data/menu";
import { useCart } from "@/hooks/use-cart";
import { formatFcfa } from "@/lib/currency";
import { withBasePath } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { addItem, openCart, totalItems, openDishDetail } = useCart();

  const heroSignatureDish =
    menuItems.find((item) => item.id === "poulet-bicyclette-braise") ??
    menuItems[0];
  const secondaryDish =
    menuItems.find((item) => item.id === "poisson-braise-et-attieke") ??
    menuItems[1];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55 }
      )
        .fromTo(
          ".hero-title-line",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.35"
        )
        .fromTo(
          ".hero-MainImage",
          { opacity: 0, scale: 0.97, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power2.out" },
          "-=0.65"
        )
        .fromTo(
          ".hero-FloatingElement",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.45"
        );

      // Parallaxe uniquement sur tablette/desktop pour préserver la fluidité mobile
      if (window.innerWidth >= 768) {
        gsap.to(".hero-parallax-main", {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-parallax-secondary", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: heroRef }
  );

  const handleOrderNowClick = () => {
    if (totalItems > 0) {
      openCart();
      return;
    }
    const menuEl = document.getElementById("carte");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    } else {
      openCart();
    }
  };

  return (
    <section
      id="accueil"
      ref={heroRef}
      className="relative overflow-hidden bg-[#F8F5EF] pt-6 pb-14 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28"
    >
      {/* Halo lumineux chaleureux en arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[320px] w-[320px] rounded-full bg-[#D6AA61]/15 blur-3xl sm:h-[480px] sm:w-[480px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 h-[260px] w-[260px] rounded-full bg-[#C76A45]/10 blur-3xl sm:h-[380px] sm:w-[380px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Colonne Éditoriale Gauche */}
          <div className="lg:col-span-6">
            {/* Petit surtitre */}
            <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-[#E8E0D4] bg-[#FFFDF9] px-3.5 py-1.5 shadow-2xs">
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#C76A45]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#29251F] sm:text-xs">
                KALO TABLE — Bobo-Dioulasso
              </span>
            </div>

            {/* Titre Principal adapté mobile & desktop */}
            <h1 className="mt-4 font-serif text-[2.15rem] font-bold leading-[1.12] tracking-tight text-[#29251F] sm:mt-6 sm:text-5xl lg:text-6xl">
              <span className="hero-title-line block">Le goût d&apos;ici,</span>
              <span className="hero-title-line mt-1 block text-[#C76A45] italic">
                servi autrement.
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description mt-4 max-w-xl text-sm leading-relaxed text-[#766E63] sm:mt-6 sm:text-lg">
              Découvrez une cuisine africaine généreuse, des grillades
              savoureuses et des boissons naturelles, dans une ambiance pensée
              pour les bons moments.
            </p>

            {/* Boutons d'action : pleine largeur sur mobile pour une ergonomie à une main */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#carte"
                className="hero-cta group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#29251F] px-6 py-3.5 text-sm font-semibold text-[#FFFDF9] shadow-sm transition-all hover:bg-[#C76A45] sm:w-auto sm:px-7 sm:py-4 sm:text-base"
              >
                <span>Découvrir notre carte</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>

              <button
                type="button"
                onClick={handleOrderNowClick}
                className="hero-cta inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-[#C76A45] bg-[#FFFDF9] px-6 py-3.5 text-sm font-semibold text-[#C76A45] transition-all hover:bg-[#C76A45] hover:text-[#FFFDF9] sm:w-auto sm:px-7 sm:py-4 sm:text-base cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Commander maintenant</span>
              </button>
            </div>

            {/* Piliers culinaires : empilés proprement sur mobile, 3 colonnes sur sm+ */}
            <div className="hero-cta mt-7 grid grid-cols-1 gap-2.5 border-t border-[#E8E0D4] pt-5 sm:mt-10 sm:grid-cols-3 sm:gap-4 sm:pt-7">
              <div className="flex items-start gap-3 rounded-2xl border border-[#E8E0D4]/80 bg-[#FFFDF9]/80 p-3 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C76A45]">
                  <Flame className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Braise vive</span>
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#C76A45] sm:hidden">
                    Braise vive
                  </span>
                  <p className="mt-0.5 text-xs leading-snug text-[#766E63] sm:mt-1 sm:text-sm">
                    Poulet bicyclette, poisson & brochettes grillés minute
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#E8E0D4]/80 bg-[#FFFDF9]/80 p-3 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#66764D]">
                  <Utensils
                    className="h-4 w-4 sm:h-3.5 sm:w-3.5"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">Terroir & Fait maison</span>
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#66764D] sm:hidden">
                    Terroir & Fait maison
                  </span>
                  <p className="mt-0.5 text-xs leading-snug text-[#766E63] sm:mt-1 sm:text-sm">
                    Riz gras, tô & sauce gombo, attiéké et alloco doré
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#E8E0D4]/80 bg-[#FFFDF9]/80 p-3 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B38332]">
                  <Sparkles
                    className="h-4 w-4 sm:h-3.5 sm:w-3.5"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">100% Naturel</span>
                </span>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#B38332] sm:hidden">
                    100% Naturel
                  </span>
                  <p className="mt-0.5 text-xs leading-snug text-[#766E63] sm:mt-1 sm:text-sm">
                    Jus de bissap, gingembre, tamarin & dèguè onctueux
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Visuelle Droite */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Cadre décoratif uniquement sur tablette/desktop pour éviter tout débordement mobile */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -inset-3 rounded-[2.25rem] border border-[#D6AA61]/40 bg-[#F0E9DD]/60 -rotate-1"
              />

              {/* Image principale imposante */}
              <div className="hero-MainImage hero-parallax-main relative overflow-hidden rounded-3xl border border-[#E8E0D4] bg-[#FFFDF9] shadow-[0_20px_50px_rgb(41,37,31,0.12)] sm:rounded-[2rem]">
                <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                  <Image
                    src={withBasePath("/images/poulet-bicyclette.jpg")}
                    alt="Poulet bicyclette braisé, alloco doré et condiments frais chez KALO TABLE à Bobo-Dioulasso"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/60 via-transparent to-transparent" />

                  {/* Badge de localisation en haut à gauche */}
                  <div className="hero-FloatingElement absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF9]/95 px-3 py-1 text-[11px] font-semibold text-[#29251F] shadow-md backdrop-blur-xs sm:top-4 sm:left-4 sm:px-3.5 sm:py-1.5 sm:text-xs">
                    <MapPin
                      className="h-3.5 w-3.5 text-[#C76A45]"
                      aria-hidden="true"
                    />
                    <span>{restaurantConfig.regionLabel}</span>
                  </div>
                </div>

                {/* Carte du plat vedette : sous la photo sur mobile (pour ne pas masquer le plat), superposée sur sm+ */}
                <div className="flex items-center justify-between gap-3 border-t border-[#E8E0D4] bg-[#FFFDF9] p-3.5 sm:absolute sm:inset-x-4 sm:bottom-4 sm:rounded-2xl sm:border sm:border-[#FFFDF9]/25 sm:bg-[#FFFDF9]/95 sm:p-4 sm:shadow-lg sm:backdrop-blur-md">
                  <div
                    onClick={() => openDishDetail(heroSignatureDish)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openDishDetail(heroSignatureDish);
                      }
                    }}
                    className="min-w-0 flex-1 cursor-pointer"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#C76A45]">
                      L&apos;incontournable de la maison
                    </span>
                    <p className="truncate font-serif text-base font-bold text-[#29251F] sm:text-lg">
                      {heroSignatureDish.name}
                    </p>
                    <p className="text-xs font-semibold text-[#66764D]">
                      {formatFcfa(heroSignatureDish.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => addItem(heroSignatureDish, 1)}
                    aria-label={`Ajouter ${heroSignatureDish.name} à la commande`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#C76A45] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] shadow-xs transition-all hover:bg-[#AE5633] active:scale-95 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>

              {/* Petite image secondaire */}
              <div
                onClick={() => openDishDetail(secondaryDish)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openDishDetail(secondaryDish);
                  }
                }}
                className="hero-FloatingElement hero-parallax-secondary group mt-3 flex items-center gap-3 rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] p-2.5 shadow-md transition-transform hover:-translate-y-0.5 sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-72 sm:shadow-xl cursor-pointer"
              >
                <div className="relative h-14 w-18 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-20">
                  <Image
                    src={withBasePath("/images/poisson-braise.jpg")}
                    alt="Poisson braisé et attiéké"
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-1">
                  <span className="inline-block rounded-full bg-[#66764D]/15 px-2 py-0.5 text-[10px] font-semibold text-[#66764D]">
                    Grillade braisée
                  </span>
                  <p className="mt-0.5 truncate font-serif text-sm font-bold text-[#29251F]">
                    {secondaryDish.name}
                  </p>
                  <p className="text-xs font-medium text-[#C76A45]">
                    {formatFcfa(secondaryDish.price)} • Voir le plat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
