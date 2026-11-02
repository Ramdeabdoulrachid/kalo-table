"use client";

import React from "react";
import Image from "next/image";
import { Flame, HeartHandshake, Leaf, Utensils } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const VALUES = [
  {
    icon: Leaf,
    title: "Produits frais du marché",
    description:
      "Légumes croquants, herbes aromatiques, volailles locales et fleurs d'hibiscus sélectionnés avec exigence.",
  },
  {
    icon: Flame,
    title: "Cuissons justes & braise",
    description:
      "Des marinades équilibrées et une maîtrise de la braise qui respectent le goût naturel de chaque ingrédient.",
  },
  {
    icon: HeartHandshake,
    title: "Générosité de l'accueil",
    description:
      "L'hospitalité chaleureuse de Bobo-Dioulasso dans un cadre lumineux, pensé pour prendre le temps d'être ensemble.",
  },
];

export function AboutSection() {
  return (
    <section
      id="histoire"
      className="relative overflow-hidden bg-[#F8F5EF] py-14 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Colonne Texte Éditorial : affichée en premier sur mobile (order-1 lg:order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C76A45]">
                <span className="h-px w-6 bg-[#C76A45] sm:w-8" />
                Notre philosophie culinaire
              </span>

              <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-[#29251F] sm:mt-4 sm:text-4xl lg:text-[2.65rem]">
                Une histoire de saveurs et de partage.
              </h2>

              <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#766E63] sm:mt-6 sm:space-y-4 sm:text-base">
                <p>
                  Chez{" "}
                  <strong className="font-semibold text-[#29251F]">
                    KALO TABLE
                  </strong>
                  , nous célébrons la richesse du patrimoine gastronomique
                  burkinabè et ouest-africain en lui offrant un écrin
                  contemporain, lumineux et chaleureux.
                </p>
                <p>
                  Du fumet délicat d&apos;un poulet bicyclette braisé au feu de
                  bois à l&apos;onctuosité d&apos;une sauce gombo accompagnant un
                  tô souple, chaque assiette est pensée pour mettre en valeur le
                  produit brut, la fraîcheur des épices et la justesse des
                  cuissons.
                </p>
                <p>
                  Plus qu&apos;un simple repas, nous imaginons la table comme un
                  lieu de rencontre : on s&apos;y retrouve pour un déjeuner
                  gourmand, un dîner en famille ou une soirée autour de grillades
                  et de boissons naturelles préparées maison.
                </p>
              </div>

              {/* Piliers éditoriaux */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                {VALUES.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={val.title}
                      className="flex items-start gap-3.5 rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] p-3.5 shadow-2xs transition-colors hover:border-[#C76A45]/40 sm:block sm:p-4"
                    >
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0E9DD] text-[#C76A45]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#29251F] sm:mt-3">
                          {val.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#766E63]">
                          {val.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Colonne Visuelle Éditoriale Asymétrique (order-2 lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <ScrollReveal variant="slide-left">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Photographie principale */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#E8E0D4] bg-[#F0E9DD] shadow-xl sm:aspect-[4/5] sm:w-[86%] sm:rounded-[2rem]">
                  <Image
                    src="/images/poulet-yassa.jpg"
                    alt="Dressage contemporain du Poulet Yassa aux oignons caramélisés et citron vert"
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                  />
                </div>

                {/* Image secondaire en superposition sur sm+, côte-à-côte compacte sur mobile */}
                <div className="mt-3 flex items-center gap-3.5 overflow-hidden rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] p-2.5 shadow-lg sm:absolute sm:-right-2 sm:bottom-8 sm:mt-0 sm:block sm:w-64 sm:rounded-3xl sm:border-4 sm:border-[#F8F5EF] sm:p-0 sm:shadow-2xl">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl sm:aspect-[4/3] sm:h-auto sm:w-full sm:rounded-none">
                    <Image
                      src="/images/table-partage.jpg"
                      alt="Salle chaleureuse et lumineuse de KALO TABLE"
                      fill
                      sizes="(max-width: 640px) 80px, 260px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 sm:p-3.5">
                    <p className="font-serif text-xs font-bold uppercase tracking-wider text-[#C76A45]">
                      L&apos;art de recevoir
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#766E63]">
                      Un lieu lumineux et convivial au cœur de Bobo-Dioulasso.
                    </p>
                  </div>
                </div>

                {/* Badge éditorial discret */}
                <div className="hidden sm:flex absolute -top-5 right-8 items-center gap-2 rounded-2xl border border-[#E8E0D4] bg-[#FFFDF9] px-4 py-2.5 shadow-md">
                  <Utensils
                    className="h-4 w-4 text-[#66764D]"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-xs font-semibold text-[#29251F]">
                    Cuisine africaine contemporaine
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
