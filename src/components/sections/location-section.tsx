"use client";

import React, { useEffect, useState } from "react";
import {
  Clock,
  Compass,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Sparkles,
} from "lucide-react";
import { restaurantConfig } from "@/config/restaurant";
import {
  formatFrenchTime,
  getRestaurantOpenStatus,
  OpenStatusResult,
} from "@/lib/opening-hours";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function LocationSection() {
  const [openStatus, setOpenStatus] = useState<OpenStatusResult | null>(null);

  useEffect(() => {
    const update = () => {
      setOpenStatus(getRestaurantOpenStatus(new Date()));
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const contactWa = buildWhatsAppUrl(
    `Bonjour ${restaurantConfig.name}, je souhaite obtenir des informations pratiques (horaires / itinéraire à ${restaurantConfig.city}).`
  );

  return (
    <section
      id="contact"
      className="relative bg-[#F8F5EF] py-20 sm:py-28 border-t border-[#E8E0D4]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C76A45]">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Informations pratiques
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#29251F] sm:text-4xl lg:text-5xl">
              Nous retrouver à Bobo-Dioulasso
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#766E63]">
              Consultez nos horaires d&apos;accueil mis à jour en temps réel sur le
              fuseau horaire du Burkina Faso ({restaurantConfig.timezone}) ou
              contactez-nous directement.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Carte Localisation & Contact (5 colonnes) */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="slide-left">
              <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#E8E0D4] bg-[#FFFDF9] p-6 shadow-md sm:p-8">
                <div>
                  {/* Représentation graphique éditoriale de la ville */}
                  <div className="relative overflow-hidden rounded-2xl border border-[#E8E0D4] bg-woven-pattern p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF9] px-3 py-1 text-xs font-semibold text-[#29251F] shadow-2xs">
                        <Compass
                          className="h-3.5 w-3.5 text-[#C76A45]"
                          aria-hidden="true"
                        />
                        <span>Hauts-Bassins • Burkina Faso</span>
                      </span>
                      <span className="rounded-full bg-[#29251F] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6AA61]">
                        Démo
                      </span>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-serif text-2xl font-bold text-[#29251F]">
                        {restaurantConfig.city}, {restaurantConfig.country}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#766E63] sm:text-sm">
                        {restaurantConfig.addressNote}
                      </p>
                    </div>
                  </div>

                  {/* Détails de contact */}
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-[#F8F5EF] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                        Modes de service proposés
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#29251F]">
                        Sur place • À emporter • Livraison à Bobo-Dioulasso
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5EF] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#766E63]">
                        Canal de contact privilégié
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#766E63]">
                        Commandes, demandes de réservation et renseignements
                        pratiques par message WhatsApp.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action : Voir l'itinéraire & Contacter le restaurant */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={restaurantConfig.maps.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#29251F]/20 bg-[#F8F5EF] px-5 py-3.5 text-xs font-semibold text-[#29251F] transition-colors hover:border-[#C76A45] hover:text-[#C76A45] sm:text-sm"
                  >
                    <Navigation className="h-4 w-4 text-[#C76A45]" aria-hidden="true" />
                    <span>Voir l&apos;itinéraire</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                  <a
                    href={contactWa.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C76A45] px-5 py-3.5 text-xs font-semibold text-[#FFFDF9] shadow-sm transition-colors hover:bg-[#AE5633] sm:text-sm"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Contacter le restaurant</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Tableau des horaires dynamiques (7 colonnes) */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="slide-right" delay={0.1}>
              <div className="rounded-[2rem] border border-[#E8E0D4] bg-[#FFFDF9] p-6 shadow-md sm:p-8">
                {/* En-tête avec statut dynamique temps réel Africa/Ouagadougou */}
                <div className="flex flex-col justify-between gap-4 border-b border-[#E8E0D4] pb-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock
                        className="h-5 w-5 text-[#C76A45]"
                        aria-hidden="true"
                      />
                      <h3 className="font-serif text-2xl font-bold text-[#29251F]">
                        Horaires d&apos;ouverture
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-[#766E63]">
                      Valeurs de démonstration configurables • Fuseau{" "}
                      <code className="rounded bg-[#F0E9DD] px-1.5 py-0.5 text-[11px] text-[#29251F]">
                        {restaurantConfig.timezone}
                      </code>
                      {openStatus
                        ? ` (Heure locale : ${openStatus.localTimeFormatted})`
                        : ""}
                    </p>
                  </div>

                  {openStatus && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-2.5 self-start rounded-full px-4 py-2 text-xs font-bold sm:self-auto",
                        openStatus.isOpen
                          ? "bg-[#66764D]/15 text-[#66764D] border border-[#66764D]/30"
                          : "bg-[#C76A45]/12 text-[#C76A45] border border-[#C76A45]/30"
                      )}
                    >
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          openStatus.isOpen
                            ? "bg-[#66764D] animate-pulse"
                            : "bg-[#C76A45]"
                        )}
                      />
                      <span>{openStatus.label}</span>
                    </div>
                  )}
                </div>

                {openStatus && (
                  <p className="mt-3 text-xs font-medium text-[#66764D]">
                    {openStatus.detail}
                  </p>
                )}

                {/* Liste des jours de la semaine */}
                <div className="mt-5 divide-y divide-[#E8E0D4]/70">
                  {restaurantConfig.schedule.map((day) => {
                    const isToday =
                      openStatus?.todaySchedule.dayIndex === day.dayIndex;

                    return (
                      <div
                        key={day.dayName}
                        className={cn(
                          "flex flex-wrap items-center justify-between gap-2 py-3.5 px-3 rounded-xl transition-colors",
                          isToday ? "bg-[#F0E9DD]/75 font-semibold" : ""
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-serif text-base text-[#29251F]">
                            {day.dayName}
                          </span>
                          {isToday && (
                            <span className="rounded-full bg-[#C76A45] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#FFFDF9]">
                              Aujourd&apos;hui
                            </span>
                          )}
                          {day.note && (
                            <span className="hidden text-xs text-[#766E63] sm:inline">
                              • {day.note}
                            </span>
                          )}
                        </div>

                        <div className="text-sm">
                          {day.isOpen ? (
                            <span className="font-semibold text-[#29251F]">
                              {formatFrenchTime(day.openTime)} –{" "}
                              {formatFrenchTime(day.closeTime)}
                            </span>
                          ) : (
                            <span className="font-medium text-[#C76A45]">
                              Fermé
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#F8F5EF] p-3.5 text-xs text-[#766E63]">
                  <Sparkles
                    className="h-4 w-4 shrink-0 text-[#D6AA61]"
                    aria-hidden="true"
                  />
                  <span>
                    Ces horaires de démonstration sont centralisés dans{" "}
                    <code className="font-mono text-[11px] text-[#29251F]">
                      src/config/restaurant.ts
                    </code>{" "}
                    et mettent automatiquement à jour le statut d&apos;ouverture et
                    les créneaux de réservation.
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

