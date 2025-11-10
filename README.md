# Christophe Immo

Site web simple pour présenter les propriétés à louer. Développé avec [Astro](https://astro.build).

## 🌐 Site en ligne

Le site est disponible à l'adresse : **https://christopheimmo.netlify.app**

## 📋 Description

Ce site permet de présenter une liste de propriétés à louer avec leurs détails complets, photos et caractéristiques. Il a été créé pour contourner les limitations du compte gratuit Leboncoin qui limite à 2 annonces.

## 🚀 Technologies utilisées

- **Astro** - Framework web moderne pour des sites statiques rapides
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

## 🚢 Déploiement

Le site est déployé automatiquement sur Netlify à chaque push sur la branche principale.

## 📄 Licence

Projet privé - Tous droits réservés
