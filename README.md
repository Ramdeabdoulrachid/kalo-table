# KALO TABLE — Site Gastronomique Contemporain (Bobo-Dioulasso)

> **« Le goût d'ici, servi autrement. »**
> Projet de démonstration conçu et développé pour le portfolio de **Ramde Studio**.

---

## 1. Présentation du projet

**KALO TABLE** est une expérience web complète, éditoriale et interactive imaginée pour un restaurant de cuisine africaine contemporaine situé à **Bobo-Dioulasso (Burkina Faso)**.

Le site met en valeur les spécialités locales (poulet bicyclette braisé, poisson braisé et attiéké, riz gras au bœuf, poulet yassa, tô et sauce gombo, brochettes au kankankan, alloco, samoussas, boissons naturelles et dèguè) à travers une direction artistique lumineuse et chaleureuse ainsi qu'un parcours fonctionnel de commande et de réservation via **WhatsApp**.

### Fonctionnalités principales

- **Expérience éditoriale & Hero animé** : Composition asymétrique, typographies *Playfair Display* & *DM Sans*, animations d'entrée et parallaxe douce avec **GSAP + ScrollTrigger**.
- **Carte numérique interactive** :
  - Filtrage instantané par catégorie (*Tout afficher*, *Entrées*, *Plats principaux*, *Grillades*, *Boissons*, *Desserts*) avec compteurs dynamiques.
  - Recherche en temps réel par nom de plat ou ingrédient.
  - Fiche détaillée modale pour chaque plat (photographie grand format, description complète, ingrédients, accompagnements, sélecteur de quantité et calcul immédiat du prix en FCFA).
- **Panier persistant & Commande WhatsApp** :
  - Ajout, retrait, modification des quantités et vidage complet du panier.
  - Sauvegarde automatique dans `localStorage` (`kalo-table-cart-v1`).
  - Formulaire de finalisation validé avec **React Hook Form + Zod** (*À emporter* ou *Livraison*).
  - Génération et encodage du récapitulatif structuré pour **WhatsApp Click-to-Chat**, avec indication explicite que la commande est confirmée humainement par le restaurant.
- **Demande de réservation de table** :
  - Validation complète empêchant les champs vides, les dates passées, les jours de fermeture (lundi en démo), les horaires hors ouverture et les nombres de convives invalides.
  - Envoi structuré via WhatsApp avec rappel que la réservation devient effective après confirmation du restaurant.
- **Horaires dynamiques (`Africa/Ouagadougou`)** :
  - Calcul en temps réel du statut **« Ouvert actuellement »** ou **« Fermé actuellement »** selon le fuseau horaire du Burkina Faso (`UTC+0`).
- **Galerie photographique plein écran** :
  - Grille asymétrique éditoriale et visionneuse plein écran (navigation clavier `Échap` / flèches et swipe tactile sur mobile).
- **Accessibilité & Performances** :
  - Respect strict de `prefers-reduced-motion`.
  - Navigation clavier, attributs ARIA, contrastes soignés, données structurées Schema.org `Restaurant`, `sitemap.xml` et `robots.txt`.

---

## 2. Stack technique

- **Framework** : Next.js 15 (App Router) & React 19
- **Langage** : TypeScript
- **Styles** : Tailwind CSS v4
- **Motion Design** :
  - `gsap` + `@gsap/react` (`ScrollTrigger`) pour la timeline du Hero, la parallaxe et les révélations au défilement.
  - `motion` (`motion/react`) pour les transitions d'interface, filtres de la carte, cartes interactives, modales et tiroir du panier.
- **Formulaires & Validation** : `react-hook-form`, `zod`, `@hookform/resolvers`
- **Icônes & Notifications** : `lucide-react`, `sonner`

---

## 3. Architecture du projet

```text
kalo-table/
├── public/
│   └── images/                  # Photographies culinaires et d'ambiance optimisées
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system, palette chaude & règles d'accessibilité
│   │   ├── icon.tsx             # Favicon généré dynamiquement
│   │   ├── layout.tsx           # Polices, métadonnées SEO, OpenGraph & Schema.org
│   │   ├── page.tsx             # Assemblage complet des sections de la landing page
│   │   ├── robots.ts            # Règles d'indexation robots.txt
│   │   └── sitemap.ts           # Sitemap XML
│   ├── components/
│   │   ├── cart/
│   │   │   └── cart-drawer.tsx          # Panier latéral & tunnel de commande WhatsApp
│   │   ├── layout/
│   │   │   ├── header.tsx               # Barre d'info, statut live, navigation sticky & menu mobile
│   │   │   ├── footer.tsx               # Pied de page complet & mention Ramde Studio
│   │   │   └── mobile-bottom-bar.tsx    # Barre d'action rapide mobile (Commander / Réserver)
│   │   ├── menu/
│   │   │   ├── menu-section.tsx         # Carte interactive avec filtres et recherche
│   │   │   └── dish-detail-modal.tsx    # Fiche détaillée d'un plat
│   │   ├── motion/
│   │   │   └── scroll-reveal.tsx        # Wrapper GSAP ScrollTrigger respectant reduced-motion
│   │   ├── reservation/
│   │   │   └── reservation-section.tsx  # Formulaire de demande de réservation validé
│   │   └── sections/
│   │       ├── hero-section.tsx         # Hero éditorial avec parallaxe et plat vedette
│   │       ├── brand-marquee.tsx        # Bandeau défilant de marque
│   │       ├── about-section.tsx        # Présentation de l'univers KALO TABLE
│   │       ├── specialties-section.tsx  # Mise en avant des 6 spécialités phares
│   │       ├── gallery-section.tsx      # Galerie asymétrique & lightbox plein écran
│   │       ├── experience-section.tsx   # Section éditoriale Expérience & Ambiance
│   │       ├── location-section.tsx     # Localisation Bobo-Dioulasso & horaires temps réel
│   │       └── faq-section.tsx          # Accordéons de questions fréquentes
│   ├── config/
│   │   └── restaurant.ts        # Configuration centralisée (nom, ville, WhatsApp, horaires, réseaux)
│   ├── data/
│   │   ├── menu.ts              # Catalogue centralisé des plats et prix en FCFA
│   │   ├── gallery.ts           # Données de la galerie photographique
│   │   └── faq.ts               # Questions et réponses de la FAQ
│   ├── hooks/
│   │   └── use-cart.tsx         # Contexte du panier avec persistance localStorage
│   ├── lib/
│   │   ├── currency.ts          # Formatage monétaire en FCFA
│   │   ├── opening-hours.ts     # Calcul d'ouverture et validation Africa/Ouagadougou
│   │   ├── whatsapp.ts          # Génération et encodage des messages WhatsApp
│   │   └── utils.ts             # Utilitaire de classes CSS (clsx + tailwind-merge)
│   └── types/
│       └── index.ts             # Typages TypeScript globaux
└── package.json
```

---

## 4. Lancer le projet en local

### Prérequis
- **Node.js** 18.18+ (ou Node 20 / 22 / 24)
- **npm**

### Installation et démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Vérifier le build de production

```bash
npm run build
npm run start
```

---

## 5. Informations à modifier pour un vrai restaurant

Toutes les données de démonstration sont centralisées afin qu'aucune modification de composant ne soit nécessaire :

1. **Informations générales, WhatsApp, Horaires et Livraison (`src/config/restaurant.ts`)** :
   - `contact.whatsappNumber` : Renseigner le numéro WhatsApp réel au format international sans `+` ni espaces (ex. `"22670000000"`). Tant que ce champ est vide (`""`), le site utilise le mode partage WhatsApp universel pour permettre de tester sans inventer de numéro fictif.
   - `contact.phoneDisplay` & `contact.email` : Renseigner les coordonnées vérifiées.
   - `addressNote` & `maps.googleMapsUrl` : Renseigner l'adresse physique exacte et le lien Google Maps officiel de l'établissement.
   - `delivery.fixedFeeFcfa` : Définir un tarif fixe en FCFA ou laisser `null` si les frais varient selon le quartier de livraison.
   - `schedule` : Ajuster les horaires d'ouverture jour par jour.
   - `socials` : Remplacer `url: null` par les URLs officielles des pages Instagram, Facebook et TikTok.
2. **Carte des plats et tarifs (`src/data/menu.ts`)** :
   - Modifier les noms, descriptions, ingrédients, badges, prix en FCFA et chemins d'images dans le tableau `menuItems`.
3. **Photographies (`public/images/`)** :
   - Remplacer les visuels de démonstration par les photographies officielles du restaurant.

---

## 6. Déploiement sur Vercel

1. Poussez le dépôt Git sur **GitHub**, **GitLab** ou **Bitbucket**.
2. Connectez-vous sur [vercel.com](https://vercel.com/) et cliquez sur **Add New… → Project**.
3. Importez le dépôt `kalo-table`.
4. Vercel détecte automatiquement **Next.js** :
   - **Build Command** : `next build`
   - **Output Directory** : `.next`
5. Cliquez sur **Deploy**. Aucune variable d'environnement obligatoire n'est requise pour fonctionner.

