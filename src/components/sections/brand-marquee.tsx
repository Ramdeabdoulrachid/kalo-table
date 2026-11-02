"use client";

import React from "react";
import { Sparkles } from "lucide-react";

const MARQUEE_ITEMS = [
  "CUISINE GÉNÉREUSE",
  "SAVEURS LOCALES",
  "GRILLADES AU FEU DE BOIS",
  "MOMENTS À PARTAGER",
  "BOISSONS NATURELLES",
  "BOBO-DIOULASSO",
];

export function BrandMarquee() {
  return (
    <div
      aria-label="Signature de marque KALO TABLE"
      className="relative overflow-hidden border-y border-[#E8E0D4] bg-[#F0E9DD] py-4 text-[#29251F]"
    >
      <div className="animate-marquee flex items-center">
        {[0, 1].map((loopIndex) => (
          <div
            key={loopIndex}
            className="flex shrink-0 items-center justify-around gap-8 px-4"
            aria-hidden={loopIndex === 1 ? "true" : undefined}
          >
            {MARQUEE_ITEMS.map((item, idx) => (
              <div key={`${loopIndex}-${idx}`} className="flex items-center gap-8">
                <span className="font-serif text-xs font-bold tracking-[0.24em] text-[#29251F] sm:text-sm">
                  {item}
                </span>
                <Sparkles
                  className="h-3.5 w-3.5 text-[#C76A45]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

