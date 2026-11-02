import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { restaurantConfig } from "@/config/restaurant";
import { CartProvider } from "@/hooks/use-cart";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kalo-table.vercel.app"),
  title: {
    default: `${restaurantConfig.name} — ${restaurantConfig.tagline} | ${restaurantConfig.city}`,
    template: `%s | ${restaurantConfig.name}`,
  },
  description:
    "Découvrez KALO TABLE à Bobo-Dioulasso (Burkina Faso) : cuisine africaine contemporaine, poulet bicyclette braisé, grillades au feu de bois, plats traditionnels revisités et boissons naturelles. Commande et réservation via WhatsApp.",
  keywords: [
    "KALO TABLE",
    "restaurant Bobo-Dioulasso",
    "cuisine africaine contemporaine",
    "gastronomie Burkina Faso",
    "poulet bicyclette braisé",
    "poisson braisé attiéké",
    "riz gras",
    "tô sauce gombo",
    "Ramde Studio",
  ],
  authors: [{ name: "Ramde Studio" }],
  openGraph: {
    type: "website",
    locale: "fr_BF",
    siteName: restaurantConfig.name,
    title: `${restaurantConfig.name} — ${restaurantConfig.tagline}`,
    description: restaurantConfig.positioning,
    images: [
      {
        url: "/images/poulet-bicyclette.jpg",
        width: 1200,
        height: 900,
        alt: `${restaurantConfig.name} — ${restaurantConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurantConfig.name} — ${restaurantConfig.tagline}`,
    description: restaurantConfig.positioning,
    images: ["/images/poulet-bicyclette.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Données structurées Schema.org de type Restaurant strictement fidèles à la configuration
  // (sans avis fictifs, sans note inventée ni coordonnées GPS artificielles)
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantConfig.name,
    description: restaurantConfig.positioning,
    slogan: restaurantConfig.tagline,
    servesCuisine: [
      "Cuisine burkinabè",
      "Cuisine ouest-africaine contemporaine",
      "Grillades au feu de bois",
    ],
    priceRange: "1 000 FCFA - 4 500 FCFA",
    currenciesAccepted: restaurantConfig.currency.code,
    address: {
      "@type": "PostalAddress",
      addressLocality: restaurantConfig.city,
      addressCountry: "BF",
    },
    hasMenu: "https://kalo-table.vercel.app/#carte",
    acceptsReservations: "True",
  };

  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8F5EF] font-sans text-[#29251F] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd),
          }}
        />
        <CartProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#FFFDF9",
                color: "#29251F",
                border: "1px solid #E8E0D4",
                borderRadius: "1rem",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}

