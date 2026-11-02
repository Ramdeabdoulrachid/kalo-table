import { CategoryOption, MenuItem } from "@/types";
import { withBasePath } from "@/lib/utils";

export const menuCategories: CategoryOption[] = [
  {
    id: "all",
    label: "Tout afficher",
    description: "L'ensemble de notre carte préparée à la commande",
  },
  {
    id: "entrees",
    label: "Entrées",
    description: "Bouchées chaudes et gourmandises pour ouvrir l'appétit",
  },
  {
    id: "plats",
    label: "Plats principaux",
    description: "Recettes emblématiques mijotées et spécialités du terroir",
  },
  {
    id: "grillades",
    label: "Grillades",
    description: "Cuissons sur braise vive, marinades maison et garnitures fraîches",
  },
  {
    id: "boissons",
    label: "Boissons",
    description: "Nectars et infusions glacées préparés avec des fruits et fleurs locaux",
  },
  {
    id: "desserts",
    label: "Desserts",
    description: "Douceurs lactées et céréalières d'Afrique de l'Ouest",
  },
];

/**
 * Données centralisées du menu de démonstration de KALO TABLE.
 * Tous les tarifs sont exprimés en FCFA et modifiables en un seul endroit.
 */
export const menuItems: MenuItem[] = [
  // ENTRÉES
  {
    id: "alloco",
    name: "Alloco",
    category: "entrees",
    categoryLabel: "Entrées",
    shortDescription:
      "Bananes plantains bien mûres dorées à souhait, servies avec une sauce tomate pimentée aux oignons frais.",
    fullDescription:
      "Des rondelles de banane plantain mûre sélectionnées pour leur douceur naturelle, frites jusqu'à obtenir une robe caramélisée et un cœur fondant. Accompagnées d'un condiment maison aux tomates fraîches, oignons ciselés et piment doux à doser selon votre envie.",
    price: 1000,
    image: withBasePath("/images/poulet-bicyclette.jpg"),
    imageAlt: "Assiette d'alloco doré et croustillant avec condiment tomate",
    ingredients: [
      "Bananes plantains mûres",
      "Tomates fraîches",
      "Oignons violets",
      "Piment frais (à part)",
      "Fleur de sel",
    ],
    accompaniments: ["Condiment tomate-oignon", "Piment maison à part"],
    prepTime: "10 min",
    isSignature: false,
    badge: "Incontournable",
    spicyLevel: 1,
  },
  {
    id: "samoussas",
    name: "Samoussas",
    category: "entrees",
    categoryLabel: "Entrées",
    shortDescription:
      "Chaussons triangulaires croustillants farcis au bœuf finement épicé, herbes fraîches et oignons.",
    fullDescription:
      "Une pâte fine pliée à la main et dorée minute, renfermant une farce savoureuse au bœuf haché, ail, gingembre frais, persil et oignons verts. Servis chauds avec une sauce acidulée pour un début de repas plein de caractère.",
    price: 1500,
    image: withBasePath("/images/alloco-samoussas.jpg"),
    imageAlt: "Samoussas dorés au bœuf épicé et herbes fraîches",
    ingredients: [
      "Feuilles de blé croustillantes",
      "Bœuf haché assaisonné",
      "Oignons nouveaux & persil",
      "Gingembre frais & ail",
      "Sauce pimentée douce",
    ],
    accompaniments: ["Sauce verte citronnée", "Quartier de citron vert"],
    prepTime: "12 min",
    isSignature: false,
    badge: "Fait maison",
    spicyLevel: 1,
  },

  // PLATS PRINCIPAUX
  {
    id: "poulet-bicyclette-braise",
    name: "Poulet bicyclette braisé",
    category: "plats",
    categoryLabel: "Plats principaux",
    shortDescription:
      "L'emblème du Faso : volaille locale fermière marinée aux épices douces et braisée lentement au charbon de bois.",
    fullDescription:
      "Véritable institution culinaire au Burkina Faso, notre poulet bicyclette est longuement massé avec une marinade d'ail, gingembre, poivre de Guinée et herbes aromatiques, puis braisé sur braise ardente. Sa chair ferme et goûteuse s'accompagne d'oignons sautés, d'alloco doré et d'une sauce relevée.",
    price: 4000,
    image: withBasePath("/images/poulet-bicyclette.jpg"),
    imageAlt: "Poulet bicyclette braisé au feu de bois servi avec oignons, alloco et herbes",
    ingredients: [
      "Poulet local fermier (poulet bicyclette)",
      "Marinade ail, gingembre & poivre africain",
      "Oignons caramélisés à la braise",
      "Tomates concassées",
      "Piment frais servi à part",
    ],
    accompaniments: ["Oignons braisés", "Sauce moyó", "Citron vert"],
    prepTime: "25 min",
    isSignature: true,
    badge: "Spécialité du Faso",
    spicyLevel: 1,
  },
  {
    id: "riz-gras-au-boeuf",
    name: "Riz gras au bœuf",
    category: "plats",
    categoryLabel: "Plats principaux",
    shortDescription:
      "Riz parfumé cuit dans un bouillon riche de tomates, oignons et épices avec des morceaux de bœuf fondants.",
    fullDescription:
      "Un grand classique de nos tables familiales revisité avec soin : chaque grain de riz absorbe un bouillon mijoté aux tomates mûres, ail, laurier et légumes du marché, couronné de généreux morceaux de bœuf tendrement braisés.",
    price: 3000,
    image: withBasePath("/images/riz-gras.jpg"),
    imageAlt: "Riz gras au bœuf mijoté aux légumes et tomates fraîches",
    ingredients: [
      "Riz long grain parfumé",
      "Pièces de bœuf mijotées",
      "Bouillon de tomates & oignons doux",
      "Carottes, chou & poivrons",
      "Ail, laurier & persil plat",
    ],
    accompaniments: ["Légumes mijotés", "Sauce pimentée maison"],
    prepTime: "20 min",
    isSignature: true,
    badge: "Recette familiale",
    spicyLevel: 1,
  },
  {
    id: "poulet-yassa",
    name: "Poulet yassa",
    category: "plats",
    categoryLabel: "Plats principaux",
    shortDescription:
      "Volaille dorée puis mijotée dans un confit d'oignons fondants, moutarde douce et jus de citron vert frais.",
    fullDescription:
      "Un équilibre vibrant entre la douceur des oignons longuement compotés et la fraîcheur acidulée du citron vert. Le poulet, d'abord saisi sur la braise pour conserver son fumet, finit sa cuisson dans cette sauce onctueuse servie avec un riz blanc parfumé.",
    price: 3500,
    image: withBasePath("/images/poulet-yassa.jpg"),
    imageAlt: "Poulet yassa aux oignons caramélisés et citron vert accompagné de riz",
    ingredients: [
      "Cuisses et hauts de cuisse de poulet",
      "Oignons dorés en abondance",
      "Jus de citron vert pressé",
      "Pointe de moutarde à l'ancienne",
      "Riz blanc parfumé",
    ],
    accompaniments: ["Riz blanc parfumé", "Quartiers de citron vert"],
    prepTime: "20 min",
    isSignature: true,
    badge: "Grand classique",
    spicyLevel: 1,
  },
  {
    id: "to-et-sauce-gombo",
    name: "Tô et sauce gombo",
    category: "plats",
    categoryLabel: "Plats principaux",
    shortDescription:
      "Tô traditionnel souple et léger, servi avec une sauce gombo fraîchement battue et viande mijotée.",
    fullDescription:
      "Hommage à la gastronomie burkinabè : notre tô est travaillé avec patience pour une texture lisse et aérienne, dressé avec élégance aux côtés d'une sauce gombo verte, parfumée au soumbala doux et enrichie de morceaux de bœuf fondants.",
    price: 2500,
    image: withBasePath("/images/to-sauce-gombo.jpg"),
    imageAlt: "Tô burkinabè servi avec une sauce gombo fraîche et viande mijotée",
    ingredients: [
      "Farine de mil / maïs sélectionnée",
      "Gombos frais du marché",
      "Morceaux de bœuf tendres",
      "Soumbala traditionnel dosé avec finesse",
      "Tomates et oignons doux",
    ],
    accompaniments: ["Sauce gombo au bœuf", "Piment frais à part"],
    prepTime: "18 min",
    isSignature: true,
    badge: "Tradition Burkinabè",
    spicyLevel: 1,
  },

  // GRILLADES
  {
    id: "poisson-braise-et-attieke",
    name: "Poisson braisé et attiéké",
    category: "grillades",
    categoryLabel: "Grillades",
    shortDescription:
      "Poisson entier mariné aux herbes et braisé à la flamme, accompagné d'attiéké léger et d'une garniture fraîche.",
    fullDescription:
      "Un poisson entier choisi pour sa fraîcheur, entaillé et parfumé d'une pâte d'herbes, d'ail et de gingembre avant d'être grillé sur braise. Servi avec une semoule de manioc (attiéké) aérienne et un condiment croquant aux tomates, oignons et citron.",
    price: 4500,
    image: withBasePath("/images/poisson-braise.jpg"),
    imageAlt: "Poisson entier braisé accompagné d'attiéké et de légumes frais",
    ingredients: [
      "Poisson entier frais mariné",
      "Attiéké (semoule de manioc) vapeur",
      "Tomates, concombres & oignons ciselés",
      "Marinade verte persil, ail & citron",
      "Piment maison à part",
    ],
    accompaniments: ["Attiéké chaud", "Condiment frais tomate-oignon", "Citron vert"],
    prepTime: "25 min",
    isSignature: true,
    badge: "Coup de cœur",
    spicyLevel: 1,
  },
  {
    id: "brochettes-de-boeuf",
    name: "Brochettes de bœuf",
    category: "grillades",
    categoryLabel: "Grillades",
    shortDescription:
      "Brochettes de filet de bœuf tendre enrobées d'épices torréfiées kankankan, saisies au charbon de bois.",
    fullDescription:
      "Des cubes de bœuf soigneusement parés, marinés à l'huile parfumée et relevés d'un mélange maison d'arachides torréfiées et d'épices douces (inspiré du kankankan / suya), grillés minute sur la braise et servis avec oignons rouges croquants.",
    price: 3500,
    image: withBasePath("/images/brochettes-boeuf.jpg"),
    imageAlt: "Brochettes de bœuf grillées aux épices kankankan et oignons rouges",
    ingredients: [
      "Filet de bœuf sélectionné",
      "Épices kankankan (arachide & épices douces)",
      "Oignons rouges & poivrons grillés",
      "Coriandre & persil frais",
    ],
    accompaniments: ["Oignons émincés", "Épices kankankan à part", "Pain grillé"],
    prepTime: "18 min",
    isSignature: true,
    badge: "Braise vive",
    spicyLevel: 2,
  },

  // BOISSONS
  {
    id: "jus-de-bissap",
    name: "Jus de bissap",
    category: "boissons",
    categoryLabel: "Boissons",
    shortDescription:
      "Infusion glacée de fleurs d'hibiscus rouge, délicatement parfumée à la menthe fraîche et à la vanille.",
    fullDescription:
      "Préparé chaque matin à partir de calices d'hibiscus sabdariffa infusés lentement avec des feuilles de menthe fraîche et une pointe de fleur d'oranger. Peu sucré, désaltérant et d'une robe rubis intense.",
    price: 700,
    image: withBasePath("/images/boissons-naturelles.jpg"),
    imageAlt: "Verre de jus de bissap glacé à la menthe fraîche",
    ingredients: [
      "Fleurs d'hibiscus rouge (bissap)",
      "Menthe fraîche du jardin",
      "Soupçon de vanille naturelle",
      "Sucre de canne léger",
    ],
    prepTime: "Service immédiat",
    isSignature: false,
    badge: "100% Naturel",
    spicyLevel: 0,
  },
  {
    id: "jus-de-gingembre",
    name: "Jus de gingembre",
    category: "boissons",
    categoryLabel: "Boissons",
    shortDescription:
      "Nectar tonique de gingembre frais pressé, adouci au jus d'ananas et relevé d'une touche de citron vert.",
    fullDescription:
      "Une boisson vivifiante au caractère franc : racines de gingembre frais pressées à froid, équilibrées par la rondeur du jus d'ananas mûr et le zeste de citron vert. Idéal pour accompagner nos grillades au feu de bois.",
    price: 700,
    image: withBasePath("/images/boissons-naturelles.jpg"),
    imageAlt: "Carafe de jus de gingembre frais et citron vert",
    ingredients: [
      "Rhizomes de gingembre frais",
      "Jus de citron vert pressé",
      "Touche d'ananas frais",
      "Sucre de canne modéré",
    ],
    prepTime: "Service immédiat",
    isSignature: false,
    badge: "Tonique maison",
    spicyLevel: 1,
  },
  {
    id: "jus-de-tamarin",
    name: "Jus de tamarin",
    category: "boissons",
    categoryLabel: "Boissons",
    shortDescription:
      "Boisson veloutée à la pulpe de tamarin naturel, aux notes douces et délicatement acidulées.",
    fullDescription:
      "La pulpe de tamarin macérée et filtrée avec soin offre une texture soyeuse et une fraîcheur fruitée incomparable, entre douceur miellée et vivacité acidulée.",
    price: 700,
    image: withBasePath("/images/boissons-naturelles.jpg"),
    imageAlt: "Verre de jus de tamarin frais ambré",
    ingredients: [
      "Pulpe de tamarin naturel",
      "Eau filtrée fraîche",
      "Pointe de vanille & citron",
      "Sucre de canne",
    ],
    prepTime: "Service immédiat",
    isSignature: false,
    badge: "Saveur d'ici",
    spicyLevel: 0,
  },

  // DESSERTS
  {
    id: "degue",
    name: "Dèguè",
    category: "desserts",
    categoryLabel: "Desserts",
    shortDescription:
      "Perles de couscous de petit mil roulées à la main dans un yaourt onctueux légèrement vanillé.",
    fullDescription:
      "Le dessert emblématique des tables ouest-africaines : des grains de petit mil cuits à la vapeur pour rester tendres et légers, mariés à un lait fermenté et yaourt brassé onctueux, subtilement parfumé à la vanille et à la fleur d'oranger.",
    price: 1000,
    image: withBasePath("/images/degue.jpg"),
    imageAlt: "Coupe de dèguè crémeux au petit mil et yaourt vanillé",
    ingredients: [
      "Couscous de petit mil roulé à la main",
      "Yaourt brassé onctueux",
      "Gousse de vanille",
      "Soupçon de muscade râpée",
    ],
    prepTime: "Service immédiat",
    isSignature: false,
    badge: "Douceur lactée",
    spicyLevel: 0,
  },
];

export const signatureDishes: MenuItem[] = menuItems.filter(
  (item) => item.isSignature
);
