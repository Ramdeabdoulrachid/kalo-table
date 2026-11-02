"use client";

import React from "react";
import Image from "next/image";
import { Briefcase, Calendar, Sparkles, Users, Utensils } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const MOMENTS = [
  {
    icon: Users,
    tag: "En famille",
    title: "Les grandes tablées du week-end",
    description:
      "Un accueil chaleureux pour toutes les générations, autour de plats généreux où chacun retrouve les saveurs familières d'ici.",
  },
  {
    icon: Briefcase,
    tag: "Entre collègues",
    title: "La pause déjeuner soignée",
    description:
      "Un service attentif et un cadre calme pour vos déjeuners professionnels ou vos pauses gourmandes en semaine.",
  },
  {
    icon: Sparkles,
    tag: "Entre amis",
    title: "Les soirées grillades & jus frais",
    description:
      "Brochettes parfumées au kankankan, poisson braisé, alloco croustillant et carafes de bissap glacé lorsque tombe la douceur du soir.",
  },
  {
    icon: Utensils,
    tag: "À partager",
    title: "Le plaisir des plats conviviaux",
    description:
      "À table ou à emporter, composez un assortiment d'entrées, de grillades et d'accompagnements à déguster ensemble.",
  },
];

export function ExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Colonne gauche : Récit de l'expérience et cartes de moments (7 colonnes) */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#66764D]">
                <span className="h-px w-8 bg-[#66764D]" />
                L&apos;art de vivre KALO TABLE
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#29251F] sm:text-4xl lg:text-[2.6rem]">
                Une ambiance pensée pour chaque bon moment.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#766E63]">
                Que vous veniez pour un déjeuner rapide, une soirée détendue entre
                proches ou un repas de fête, KALO TABLE conjugue simplicité,
                confort et attention portée aux détails.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {MOMENTS.map((moment) => {
                  const Icon = moment.icon;
                  return (
                    <div
                      key={moment.title}
                      className="rounded-3xl border border-[#E8E0D4] bg-[#FFFDF9] p-5 shadow-2xs transition-all hover:border-[#D6AA61] hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-[#F0E9DD] px-3 py-1 text-[11px] font-semibold text-[#C76A45]">
                          {moment.tag}
                        </span>
                        <Icon
                          className="h-4 w-4 text-[#66764D]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-3.5 font-serif text-lg font-bold text-[#29251F]">
                        {moment.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#766E63] sm:text-sm">
                        {moment.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Colonne droite : Composition photographique éditoriale (5 colonnes) */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="slide-right" delay={0.1}>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E0D4] bg-[#FFFDF9] p-3 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-[#F0E9DD]">
                  <Image
                    src="/images/riz-gras.jpg"
                    alt="Table conviviale garnie de riz gras, poisson grillé et brochettes à partager"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#29251F]/80 via-[#29251F]/20 to-transparent" />

                  <div className="absolute inset-x-6 bottom-6 text-[#FFFDF9]">
                    <p className="font-serif text-xl italic text-[#D6AA61]">
                      « Le goût d&apos;ici, servi autrement. »
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#F0E9DD]/90 sm:text-sm">
                      Une table ouverte à tous les appétits, où la tradition
                      dialogue avec une présentation contemporaine.
                    </p>
                    <a
                      href="#reservation"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C76A45] px-5 py-2.5 text-xs font-semibold text-[#FFFDF9] shadow-sm transition-colors hover:bg-[#AE5633]"
                    >
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Réserver votre table</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

