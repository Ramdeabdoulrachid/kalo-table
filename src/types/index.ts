export type MenuCategory =
  | "all"
  | "entrees"
  | "plats"
  | "grillades"
  | "boissons"
  | "desserts";

export interface CategoryOption {
  id: MenuCategory;
  label: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, "all">;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  price: number; // En FCFA
  image: string;
  imageAlt: string;
  ingredients: string[];
  accompaniments?: string[];
  prepTime?: string;
  isSignature?: boolean;
  badge?: string;
  spicyLevel?: 0 | 1 | 2;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderMode = "pickup" | "delivery";

export interface OrderFormValues {
  fullName: string;
  phone: string;
  mode: OrderMode;
  address?: string;
  instructions?: string;
}

export interface ReservationFormValues {
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Plats" | "Grillades" | "Boissons" | "Ambiance" | "Dressage";
  caption: string;
  image: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square" | "wide";
  spanClass: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface DaySchedule {
  dayIndex: number; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  dayName: string;
  shortName: string;
  isOpen: boolean;
  openTime: string; // Format "HH:mm" ex: "11:30"
  closeTime: string; // Format "HH:mm" ex: "22:30"
  note?: string;
}

export interface SocialLink {
  platform: "Instagram" | "Facebook" | "TikTok";
  label: string;
  url: string | null; // null = non configuré pour la démo
  handle: string;
}

export interface RestaurantConfig {
  name: string;
  shortName: string;
  tagline: string;
  positioning: string;
  city: string;
  country: string;
  regionLabel: string;
  addressNote: string;
  isDemoConcept: boolean;
  demoDisclaimer: string;
  studioCredit: string;
  timezone: string;
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  contact: {
    /**
     * Numéro WhatsApp au format international sans '+' ni espaces (ex: "22670000000").
     * Laisser vide ("") en mode démonstration pour utiliser le partage WhatsApp universel
     * avec message prérempli sans inventer de numéro de téléphone réel.
     */
    whatsappNumber: string;
    /**
     * Numéro de téléphone affiché (null en mode démo pour ne pas inventer de faux numéro).
     */
    phoneDisplay: string | null;
    email: string | null;
  };
  delivery: {
    enabled: boolean;
    /**
     * null = les frais de livraison ne sont pas prédéfinis et sont confirmés par le restaurant.
     */
    fixedFeeFcfa: number | null;
    deliveryNote: string;
    pickupNote: string;
  };
  reservation: {
    minGuests: number;
    maxGuestsPerOnlineRequest: number;
    slotIntervalMinutes: number;
    confirmationNote: string;
  };
  maps: {
    searchQuery: string;
    googleMapsUrl: string;
  };
  schedule: DaySchedule[];
  scheduleSummary: string;
  socials: SocialLink[];
}

