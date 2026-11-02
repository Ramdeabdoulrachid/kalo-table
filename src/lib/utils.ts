import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Préfixe automatiquement les chemins d'images statiques (/images/...) avec le basePath
 * lors d'un déploiement sur GitHub Pages (/kalo-table), tout en conservant "/" en local et sur Vercel.
 */
export function withBasePath(src: string): string {
  if (!src.startsWith("/")) return src;
  if (BASE_PATH && src.startsWith(`${BASE_PATH}/`)) return src;
  return `${BASE_PATH}${src}`;
}
