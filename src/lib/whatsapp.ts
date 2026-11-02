import { restaurantConfig } from "@/config/restaurant";
import { CartItem, OrderFormValues, ReservationFormValues } from "@/types";
import { formatFcfa } from "@/lib/currency";
import { formatFrenchTime } from "@/lib/opening-hours";

/**
 * Construit le message WhatsApp de commande en respectant scrupuleusement
 * le format demandé dans le cahier des charges.
 */
export function buildOrderWhatsAppMessage(
  values: OrderFormValues,
  items: CartItem[],
  subtotalFcfa: number
): string {
  const modeLabel = values.mode === "delivery" ? "Livraison" : "À emporter";

  const itemsLines = items
    .map(
      ({ item, quantity }) =>
        `- ${item.name} × ${quantity} — ${formatFcfa(item.price * quantity)}`
    )
    .join("\n");

  const lines: string[] = [
    `Bonjour ${restaurantConfig.name},`,
    "",
    "Je souhaite passer une commande.",
    "",
    `Nom : ${values.fullName.trim()}`,
    `Téléphone : ${values.phone.trim()}`,
    `Mode : ${modeLabel}`,
    "",
    "Commande :",
    itemsLines,
    "",
    `Total des articles : ${formatFcfa(subtotalFcfa)}`,
  ];

  if (values.mode === "delivery") {
    if (restaurantConfig.delivery.fixedFeeFcfa === null) {
      lines.push(
        "Frais de livraison : À confirmer avec le restaurant selon le secteur"
      );
    } else {
      lines.push(
        `Frais de livraison : ${formatFcfa(restaurantConfig.delivery.fixedFeeFcfa)}`
      );
    }
    lines.push("");
    lines.push(`Adresse : ${values.address?.trim() || "À préciser"}`);
  } else {
    lines.push("");
    lines.push(`Adresse : Retrait sur place (${restaurantConfig.city})`);
  }

  lines.push("");
  lines.push(
    `Instructions : ${values.instructions?.trim() ? values.instructions.trim() : "Aucune instruction particulière"}`
  );
  lines.push("");
  lines.push("Merci de confirmer ma commande.");

  return lines.join("\n");
}

/**
 * Construit le message WhatsApp pour une demande de réservation de table.
 */
export function buildReservationWhatsAppMessage(
  values: ReservationFormValues
): string {
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${values.date}T12:00:00Z`));

  const lines: string[] = [
    `Bonjour ${restaurantConfig.name},`,
    "",
    "Je souhaite effectuer une demande de réservation de table.",
    "",
    `Nom : ${values.fullName.trim()}`,
    `Téléphone : ${values.phone.trim()}`,
    `Date souhaitée : ${formattedDate} (${values.date})`,
    `Heure souhaitée : ${formatFrenchTime(values.time)}`,
    `Nombre de personnes : ${values.guests} ${values.guests > 1 ? "personnes" : "personne"}`,
    "",
    `Demandes particulières : ${values.notes?.trim() ? values.notes.trim() : "Aucune demande particulière"}`,
    "",
    "Merci de me confirmer la disponibilité de la table.",
  ];

  return lines.join("\n");
}

/**
 * Construit l'URL WhatsApp Click-to-Chat.
 * - Si un numéro WhatsApp est configuré dans restaurantConfig.contact.whatsappNumber,
 *   utilise https://wa.me/<numero>?text=<encoded>
 * - Si aucun numéro n'est configuré (mode démonstration), utilise
 *   https://api.whatsapp.com/send?text=<encoded> qui ouvre WhatsApp avec le message
 *   prérempli sans inventer de numéro de téléphone.
 */
export function buildWhatsAppUrl(message: string): {
  url: string;
  hasConfiguredNumber: boolean;
} {
  const encoded = encodeURIComponent(message);
  const rawNumber = restaurantConfig.contact.whatsappNumber.replace(/\D/g, "");

  if (rawNumber.length >= 8) {
    return {
      url: `https://wa.me/${rawNumber}?text=${encoded}`,
      hasConfiguredNumber: true,
    };
  }

  return {
    url: `https://api.whatsapp.com/send?text=${encoded}`,
    hasConfiguredNumber: false,
  };
}

