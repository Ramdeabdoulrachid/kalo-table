import { RestaurantConfig } from "@/types";

/**
 * Configuration centralisée de KALO TABLE.
 * Toutes les données du restaurant (horaires, livraison, WhatsApp, localisation, réseaux)
 * sont regroupées ici pour pouvoir être adaptées en un seul endroit.
 *
 * NOTE : Ce projet est un concept de démonstration réalisé pour le portfolio de Ramde Studio.
 * Aucun numéro de téléphone réel ni adresse postale vérifiée n'est inventé par défaut.
 */
export const restaurantConfig: RestaurantConfig = {
  name: "KALO TABLE",
  shortName: "KALO",
  tagline: "Le goût d'ici, servi autrement.",
  positioning:
    "Cuisine africaine contemporaine, grillades au feu de bois, accompagnements du terroir et boissons naturelles à Bobo-Dioulasso.",
  city: "Bobo-Dioulasso",
  country: "Burkina Faso",
  regionLabel: "Bobo-Dioulasso, Burkina Faso",
  addressNote:
    "Bobo-Dioulasso, Burkina Faso (Emplacement de démonstration — adresse précise configurable)",
  isDemoConcept: true,
  demoDisclaimer:
    "Projet conceptuel de démonstration conçu par Ramde Studio. Les horaires, tarifs et canaux de contact présentés sont des valeurs de démonstration configurables.",
  studioCredit: "Concept de démonstration réalisé par Ramde Studio.",
  timezone: "Africa/Ouagadougou",
  currency: {
    code: "XOF",
    symbol: "FCFA",
    locale: "fr-BF",
  },
  contact: {
    // Laisser "" en mode démo : l'application utilise alors https://api.whatsapp.com/send?text=...
    // ce qui permet de tester l'envoi réel sur WhatsApp sans inventer de numéro fictif.
    // Pour un déploiement réel, renseigner par ex. "22670000000".
    whatsappNumber: "",
    phoneDisplay: null,
    email: null,
  },
  delivery: {
    enabled: true,
    fixedFeeFcfa: null, // null = frais confirmés directement avec le restaurant selon le quartier
    deliveryNote:
      "Les frais de livraison à Bobo-Dioulasso vous seront confirmés par le restaurant sur WhatsApp selon votre secteur.",
    pickupNote:
      "Retrait sur place à Bobo-Dioulasso. Votre commande est préparée à la demande après confirmation du restaurant.",
  },
  reservation: {
    minGuests: 1,
    maxGuestsPerOnlineRequest: 16,
    slotIntervalMinutes: 30,
    confirmationNote:
      "Votre demande de réservation est transmise via WhatsApp et sera effective dès confirmation par l'équipe de KALO TABLE.",
  },
  maps: {
    searchQuery: "KALO TABLE Bobo-Dioulasso Burkina Faso",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bobo-Dioulasso+Burkina+Faso",
  },
  scheduleSummary: "Mar – Dim : 11h30 – 22h30 (Horaires de démo)",
  schedule: [
    {
      dayIndex: 1,
      dayName: "Lundi",
      shortName: "Lun",
      isOpen: false,
      openTime: "11:30",
      closeTime: "22:00",
      note: "Fermeture hebdomadaire (démo)",
    },
    {
      dayIndex: 2,
      dayName: "Mardi",
      shortName: "Mar",
      isOpen: true,
      openTime: "11:30",
      closeTime: "22:30",
      note: "Service continu déjeuner & dîner",
    },
    {
      dayIndex: 3,
      dayName: "Mercredi",
      shortName: "Mer",
      isOpen: true,
      openTime: "11:30",
      closeTime: "22:30",
      note: "Service continu déjeuner & dîner",
    },
    {
      dayIndex: 4,
      dayName: "Jeudi",
      shortName: "Jeu",
      isOpen: true,
      openTime: "11:30",
      closeTime: "22:30",
      note: "Service continu déjeuner & dîner",
    },
    {
      dayIndex: 5,
      dayName: "Vendredi",
      shortName: "Ven",
      isOpen: true,
      openTime: "11:30",
      closeTime: "23:00",
      note: "Soirée grillades & partage",
    },
    {
      dayIndex: 6,
      dayName: "Samedi",
      shortName: "Sam",
      isOpen: true,
      openTime: "11:30",
      closeTime: "23:00",
      note: "Service week-end en continu",
    },
    {
      dayIndex: 0,
      dayName: "Dimanche",
      shortName: "Dim",
      isOpen: true,
      openTime: "12:00",
      closeTime: "22:00",
      note: "Grandes tablées familiales",
    },
  ],
  socials: [
    {
      platform: "Instagram",
      label: "Instagram",
      url: null, // Non configuré en mode démo
      handle: "@kalotable.bf (démo)",
    },
    {
      platform: "Facebook",
      label: "Facebook",
      url: null,
      handle: "Kalo Table Bobo (démo)",
    },
    {
      platform: "TikTok",
      label: "TikTok",
      url: null,
      handle: "@kalotable (démo)",
    },
  ],
};

