import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { AboutSection } from "@/components/sections/about-section";
import { SpecialtiesSection } from "@/components/sections/specialties-section";
import { MenuSection } from "@/components/menu/menu-section";
import { DishDetailModal } from "@/components/menu/dish-detail-modal";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { GallerySection } from "@/components/sections/gallery-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ReservationSection } from "@/components/reservation/reservation-section";
import { LocationSection } from "@/components/sections/location-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip">
      {/* Lien d'accès rapide au contenu principal pour la navigation au clavier */}
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#C76A45] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-[#FFFDF9]"
      >
        Aller au contenu principal
      </a>

      {/* SECTION 1 — Barre d'information & Navigation sticky */}
      <Header />

      <main className="flex-1">
        {/* SECTION 2 — Hero principal */}
        <HeroSection />

        {/* SECTION 3 — Bandeau de marque */}
        <BrandMarquee />

        {/* SECTION 4 — Présentation du restaurant */}
        <AboutSection />

        {/* SECTION 5 — Nos spécialités */}
        <SpecialtiesSection />

        {/* SECTION 6 — Menu complet et interactif */}
        <MenuSection />

        {/* SECTION 7 — Galerie photographique */}
        <GallerySection />

        {/* SECTION 8 — Section Expérience / Ambiance */}
        <ExperienceSection />

        {/* SECTION 6 (Réservation) — Demande de réservation de table */}
        <ReservationSection />

        {/* SECTION 9 — Localisation et horaires dynamiques */}
        <LocationSection />

        {/* SECTION 10 — Questions fréquentes (FAQ) */}
        <FaqSection />
      </main>

      {/* SECTION 11 — Footer */}
      <Footer />

      {/* Modale Fiche détaillée d'un plat */}
      <DishDetailModal />

      {/* Panneau latéral Panier & Commande WhatsApp */}
      <CartDrawer />

      {/* Barre d'action fixe mobile en bas d'écran */}
      <MobileBottomBar />
    </div>
  );
}

