import { restaurantConfig } from "@/config/restaurant";

/**
 * Formate un montant en Franc CFA (FCFA) avec séparateur de milliers lisible en français.
 * Exemple : 4500 -> "4 500 FCFA"
 */
export function formatFcfa(amount: number): string {
  const formattedNumber = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u202f/g, " ")
    .replace(/\u00a0/g, " ");

  return `${formattedNumber} ${restaurantConfig.currency.symbol}`;
}

