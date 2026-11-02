"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-[#F0E9DD]/50 py-20 sm:py-28 border-t border-[#E8E0D4]"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C76A45]">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Questions fréquentes
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#29251F] sm:text-4xl">
              Tout savoir avant votre commande ou visite
            </h2>
            <p className="mt-3 text-base text-[#766E63]">
              Des réponses simples et transparentes sur le fonctionnement de nos
              commandes WhatsApp, réservations et horaires.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-3.5">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const contentId = `faq-panel-${item.id}`;
            const triggerId = `faq-trigger-${item.id}`;

            return (
              <div
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-3xl border bg-[#FFFDF9] transition-colors",
                  isOpen
                    ? "border-[#C76A45] shadow-sm"
                    : "border-[#E8E0D4] hover:border-[#D6AA61]"
                )}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-serif text-base font-bold text-[#29251F] sm:text-lg cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-200",
                        isOpen
                          ? "rotate-180 border-[#C76A45] bg-[#C76A45] text-[#FFFDF9]"
                          : "border-[#E8E0D4] bg-[#F8F5EF] text-[#29251F]"
                      )}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                    >
                      <div className="border-t border-[#E8E0D4]/70 px-6 pt-3 pb-5 text-sm leading-relaxed text-[#766E63]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

