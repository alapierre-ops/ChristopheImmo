# ChristopheImmo

Astro marketing site for furnished rentals (listings, detail pages, galleries, Leaflet map). Built to work around Leboncoin’s free-account listing limit.

**Live:** https://christopheimmo.axel-lapierre.dev

## Stack

- **Astro** — static site
- **Swiper** — image galleries
- **Leaflet** — map
- **PostHog** — analytics (optional via env)
- Property data in `src/data/properties.json`

## Project structure

```
/
├── public/images/          # property photos
├── src/
│   ├── components/
│   ├── data/properties.json
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── bien/[id].astro
│   │   └── 404.astro
│   └── styles/
└── package.json
```

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Adding a property

Edit `src/data/properties.json` and put images under `public/images/`:

```json
{
  "id": "4",
  "title": "Titre de la propriété",
  "address": "Adresse complète",
  "price": 900,
  "surface": 50,
  "rooms": 2,
  "description": "Description détaillée",
  "images": ["/images/property-4-1.jpg"],
  "features": ["Caractéristique 1", "Caractéristique 2"]
}
```

## Analytics (PostHog)

Create a local `.env`:

```
PUBLIC_POSTHOG_KEY=phc_votre_cle_api
```

Tracking is off when the key is missing. Events include `$pageview`, `property_card_clicked`, `property_viewed`, `email_clicked`, `phone_clicked`, `gallery_image_changed`, etc.

## License

Private — all rights reserved.
