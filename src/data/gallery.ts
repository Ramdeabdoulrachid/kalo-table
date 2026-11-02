import { GalleryItem } from "@/types";
import { withBasePath } from "@/lib/utils";

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-poulet-bicyclette",
    title: "Poulet bicyclette à la braise",
    category: "Grillades",
    caption:
      "Marinade aux herbes fraîches et cuisson maîtrisée au charbon de bois pour un fumet authentique.",
    image: withBasePath("/images/poulet-bicyclette.jpg"),
    alt: "Poulet bicyclette braisé dressé sur une assiette en céramique artisanale",
    aspect: "portrait",
    spanClass: "md:col-span-5 md:row-span-2",
  },
  {
    id: "gal-poisson-braise",
    title: "Poisson braisé & attiéké",
    category: "Grillades",
    caption:
      "Poisson entier grillé minute, accompagné d'attiéké léger et d'un condiment tomate-oignon-citron vert.",
    image: withBasePath("/images/poisson-braise.jpg"),
    alt: "Poisson entier braisé servi avec attiéké et légumes frais",
    aspect: "wide",
    spanClass: "md:col-span-7 md:row-span-1",
  },
  {
    id: "gal-poulet-yassa",
    title: "Poulet Yassa au citron vert",
    category: "Plats",
    caption:
      "Volaille fondante mijotée dans un confit d'oignons caramélisés et jus de citron vert pressé.",
    image: withBasePath("/images/poulet-yassa.jpg"),
    alt: "Poulet yassa aux oignons caramélisés et riz parfumé",
    aspect: "square",
    spanClass: "md:col-span-4 md:row-span-1",
  },
  {
    id: "gal-boissons",
    title: "Bissap, Gingembre & Tamarin",
    category: "Boissons",
    caption:
      "Nos jus naturels préparés chaque jour à partir de fleurs d'hibiscus, de racines de gingembre et de pulpe de tamarin.",
    image: withBasePath("/images/boissons-naturelles.jpg"),
    alt: "Verre glacé de boisson naturelle au citron vert et menthe fraîche",
    aspect: "square",
    spanClass: "md:col-span-3 md:row-span-1",
  },
  {
    id: "gal-table-partage",
    title: "Un espace lumineux & chaleureux",
    category: "Ambiance",
    caption:
      "Matières naturelles, bois massif et lumière naturelle pour les déjeuners entre collègues ou en famille.",
    image: withBasePath("/images/table-partage.jpg"),
    alt: "Salle lumineuse et conviviale du restaurant avec tables en bois",
    aspect: "landscape",
    spanClass: "md:col-span-6 md:row-span-1",
  },
  {
    id: "gal-riz-gras",
    title: "Riz gras & table de fête",
    category: "Plats",
    caption:
      "Riz parfumé cuit lentement dans un bouillon de tomates mûres et d'épices douces.",
    image: withBasePath("/images/riz-gras.jpg"),
    alt: "Plat de riz gras africain aux légumes et épices",
    aspect: "landscape",
    spanClass: "md:col-span-6 md:row-span-1",
  },
  {
    id: "gal-brochettes",
    title: "Brochettes sur braise vive",
    category: "Grillades",
    caption:
      "Bœuf tendre enrobé d'épices torréfiées et saisi au feu de bois, accompagné de sauces maison.",
    image: withBasePath("/images/brochettes-boeuf.jpg"),
    alt: "Brochettes de viande grillées sur planche avec sauces et légumes rôtis",
    aspect: "square",
    spanClass: "md:col-span-4 md:row-span-1",
  },
  {
    id: "gal-samoussas",
    title: "Samoussas croustillants",
    category: "Dressage",
    caption:
      "Pliés à la main et dorés minute pour ouvrir le repas avec gourmandise.",
    image: withBasePath("/images/alloco-samoussas.jpg"),
    alt: "Samoussas dorés et croustillants servis sur plateau en bois",
    aspect: "square",
    spanClass: "md:col-span-4 md:row-span-1",
  },
  {
    id: "gal-degue",
    title: "Douceurs lactées & Dèguè",
    category: "Dressage",
    caption:
      "La touche finale fraîche et veloutée : yaourt brassé onctueux et perles céréalières.",
    image: withBasePath("/images/degue.jpg"),
    alt: "Verrines de dessert lacté onctueux",
    aspect: "square",
    spanClass: "md:col-span-4 md:row-span-1",
  },
];
