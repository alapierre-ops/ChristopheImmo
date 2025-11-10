# Christophe Immo

Site web simple pour présenter les propriétés à louer. Développé avec [Astro](https://astro.build).

## 🌐 Site en ligne

Le site est disponible à l'adresse : **https://christopheimmo.netlify.app**

## 📋 Description

Ce site permet de présenter une liste de propriétés à louer avec leurs détails complets, photos et caractéristiques. Il a été créé pour contourner les limitations du compte gratuit Leboncoin qui limite à 2 annonces.

## 🚀 Technologies utilisées

- **Astro** - Framework web moderne pour des sites statiques rapides
- **Swiper.js** - Galerie d'images interactive avec navigation
- **PostHog** - Analytics et suivi des visites
- **HTML/CSS** - Interface responsive et moderne
- **JSON** - Stockage des données des propriétés

## 📁 Structure du projet

```
/
├── public/
│   ├── images/          # Images des propriétés
│   └── favicon.svg
├── src/
│   ├── components/      # Composants Astro
│   ├── data/
│   │   └── properties.json  # Données des propriétés
│   ├── layouts/        # Layouts de pages
│   ├── pages/          # Pages du site
│   │   ├── index.astro # Page d'accueil
│   │   ├── bien/[id].astro  # Page de détails d'une propriété
│   │   └── 404.astro   # Page 404 (redirige vers l'accueil)
│   └── styles/         # Fichiers CSS
│       ├── global.css
│       ├── index.css
│       └── property-detail.css
└── package.json
```

## 🛠️ Installation et développement

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
npm install
```

### Développement

Lancer le serveur de développement :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:4321`

### Build

Générer la version de production :

```bash
npm run build
```

### Preview

Prévisualiser la version de production :

```bash
npm run preview
```

## 📝 Ajouter ou modifier une propriété

Pour ajouter ou modifier une propriété, éditez le fichier `src/data/properties.json` :

```json
{
  "id": "4",
  "title": "Titre de la propriété",
  "address": "Adresse complète",
  "price": 900,
  "surface": 50,
  "rooms": 2,
  "description": "Description détaillée",
  "images": [
    "/images/property-4-1.jpg",
    "/images/property-4-2.jpg"
  ],
  "features": ["Caractéristique 1", "Caractéristique 2"]
}
```

**Important :** Les images doivent être placées dans le dossier `public/images/` et référencées avec le chemin `/images/nom-du-fichier.jpg`

## 📊 Analytics avec PostHog

Le site utilise PostHog pour analyser les visites. Pour activer PostHog :

1. Créez un compte sur [PostHog](https://posthog.com)
2. Récupérez votre clé API (Project API Key)
3. Créez un fichier `.env` en local :
   ```
   PUBLIC_POSTHOG_KEY=phc_votre_cle_api
   ```

Le tracking est automatiquement désactivé si la clé n'est pas configurée.

### Événements trackés automatiquement

Le site track automatiquement les événements suivants dans PostHog :

- **`$pageview`** - Vue de page (home, property detail)
- **`property_card_clicked`** - Clic sur une carte de propriété (avec `property_id` et `property_title`)
- **`property_viewed`** - Vue d'une page de détails de propriété (avec `property_id` et `property_title`)
- **`back_to_list_clicked`** - Clic sur le bouton retour à la liste
- **`email_clicked`** - Clic sur le bouton email (avec `property_id` et `property_title`)
- **`phone_clicked`** - Clic sur le bouton téléphone (avec `property_id` et `property_title`)
- **`gallery_image_changed`** - Changement d'image dans la galerie (avec `property_id` et `image_index`)

## 🚢 Déploiement

Le site est déployé automatiquement sur Netlify à chaque push sur la branche principale.

## 📄 Licence

Projet privé - Tous droits réservés
