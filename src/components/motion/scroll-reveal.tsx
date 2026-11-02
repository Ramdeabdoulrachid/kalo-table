"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "slide-left" | "slide-right" | "scale-reveal";
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * Composant d'animation au scroll propulsé par GSAP + ScrollTrigger.
 * Respecte prefers-reduced-motion et ne laisse jamais un élément invisible si JS/ScrollTrigger est inactif.
 */
export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.85,
  yOffset = 32,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(el, { clearProps: "all" });
        return;
      }

      const fromVars: gsap.TweenVars = {
        opacity: 0,
      };

      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      };

      if (variant === "fade-up") {
        fromVars.y = yOffset;
        toVars.y = 0;
      } else if (variant === "slide-left") {
        fromVars.x = -36;
        toVars.x = 0;
      } else if (variant === "slide-right") {
        fromVars.x = 36;
        toVars.x = 0;
      } else if (variant === "scale-reveal") {
        fromVars.scale = 0.96;
        fromVars.y = 20;
        toVars.scale = 1;
        toVars.y = 0;
      }

      gsap.fromTo(el, fromVars, toVars);
    },
    { scope: containerRef, dependencies: [variant, delay, duration, yOffset] }
  );

  return (
    <div ref={containerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

