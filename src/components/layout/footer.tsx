"use client";

import React from "react";
import {
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { restaurantConfig } from "@/config/restaurant";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const generalContactWa = buildWhatsAppUrl(
    `Bonjour ${restaurantConfig.name}, je vous contacte depuis votre site web pour une demande d'information.`
  );

  const handleUnconfiguredSocial = (platform: string, handle: string) => {
    toast.info(`Canal ${platform} en mode démonstration`, {
      description: `Le compte ${handle} est un exemple configurable dans src/config/restaurant.ts.`,
    });
  };

  return (
    <footer className="border-t border-[#E8E0D4] bg-[#F0E9DD] pb-24 pt-16 text-[#29251F] md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Colonne 1 : Marque & signature */}
          <div className="lg:col-span-4">
            <a
              href="#accueil"
              className="inline-flex items-center gap-3 focus-visible:outline-none"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C76A45] text-[#FFFDF9] shadow-sm">
                <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold tracking-wider text-[#29251F]">
                  {restaurantConfig.name}
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-[#766E63]">
                  {restaurantConfig.city} • {restaurantConfig.country}
                </span>
              </div>
            </a>

            <p className="mt-4 font-serif text-lg italic text-[#C76A45]">
              « {restaurantConfig.tagline} »
            </p>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#766E63]">
              {restaurantConfig.positioning}
            </p>

            {/* Réseaux sociaux configurables */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#29251F]">
                Réseaux sociaux (configurables)
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {restaurantConfig.socials.map((social) =>
                  social.url ? (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E0D4] bg-[#FFFDF9] px-3.5 py-1.5 text-xs font-medium text-[#29251F] transition-colors hover:border-[#C76A45] hover:text-[#C76A45]"
                    >
                      <span>{social.label}</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      key={social.platform}
                      type="button"
                      onClick={() =>
                        handleUnconfiguredSocial(social.platform, social.handle)
                      }
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E0D4] bg-[#FFFDF9]/80 px-3.5 py-1.5 text-xs font-medium text-[#766E63] transition-colors hover:border-[#C76A45] hover:text-[#29251F] cursor-pointer"
                      title={`Canal ${social.platform} non configuré (mode démo)`}
                    >
                      <span>{social.label}</span>
                      <span className="rounded bg-[#F0E9DD] px-1.5 py-0.5 text-[10px] text-[#766E63]">
                        Démo
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-base font-semibold text-[#29251F]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#766E63]">
              <li>
                <a
                  href="#accueil"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#histoire"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Notre histoire
                </a>
              </li>
              <li>
                <a
                  href="#specialites"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Nos spécialités
                </a>
              </li>
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  La carte interactive
                </a>
              </li>
              <li>
                <a
                  href="#galerie"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Galerie photo
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Réserver une table
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Questions fréquentes
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Accès direct à la carte */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-semibold text-[#29251F]">
              À découvrir à la carte
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#766E63]">
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Poulet bicyclette braisé — 4 000 FCFA
                </a>
              </li>
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Poisson braisé & attiéké — 4 500 FCFA
                </a>
              </li>
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Riz gras au bœuf — 3 000 FCFA
                </a>
              </li>
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Tô & sauce gombo — 2 500 FCFA
                </a>
              </li>
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Jus naturels (Bissap, Gingembre, Tamarin)
                </a>
              </li>
              <li>
                <a
                  href="#carte"
                  className="transition-colors hover:text-[#C76A45]"
                >
                  Dèguè maison — 1 000 FCFA
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Informations pratiques & Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-semibold text-[#29251F]">
              Informations pratiques
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#766E63]">
              <p className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#C76A45]"
                  aria-hidden="true"
                />
                <span>{restaurantConfig.addressNote}</span>
              </p>

              <p className="flex items-start gap-2.5">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#66764D]"
                  aria-hidden="true"
                />
                <span>{restaurantConfig.scheduleSummary}</span>
              </p>

              <div className="pt-2">
                <a
                  href={generalContactWa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#29251F] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#C76A45]"
                >
                  <MessageCircle className="h-4 w-4 text-[#D6AA61]" aria-hidden="true" />
                  <span>Écrire sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de footer : Copyright & mention discrète Ramde Studio */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E8E0D4] pt-8 text-xs text-[#766E63] sm:flex-row">
          <p>
            © {currentYear} {restaurantConfig.name} ({restaurantConfig.city}). Tous droits réservés.
          </p>

          <p className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E0D4] bg-[#FFFDF9]/70 px-3.5 py-1.5 text-[11px] font-medium text-[#766E63]">
            <Sparkles className="h-3 w-3 text-[#C76A45]" aria-hidden="true" />
            <span>{restaurantConfig.studioCredit}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

