# Souk Portfolio — Pixel Art

Portfolio interactif en pixel art avec un theme de souk arabe (marche traditionnel). Chaque boutique du souk represente une section du portfolio.

## Les Boutiques

| Boutique | Contenu | Theme visuel |
|----------|---------|--------------|
| L'Ecrivain Public | CV / A propos | Parchemin & scribe |
| Le Tisserand des Liens | LinkedIn, GitHub, contacts | Fils tisses |
| L'Atelier du Forgeron | Projets techniques | Forge & metal |
| La Bibliotheque du Sage | Competences & formations | Livres & etageres |
| Le Pigeon Voyageur | Formulaire de contact | Pigeon messager |
| Le Conteur | Temoignages | Conteur & etoiles |

## Stack technique

- **Framework** : React 19 (Vite 7)
- **Styling** : Tailwind CSS v4 + CSS custom
- **Animations** : Framer Motion + CSS keyframes
- **Pixel Art** : 100% CSS (box-shadow technique, gradients, borders) — aucune image IA
- **Fonts** : Press Start 2P, VT323, Silkscreen (Google Fonts)

## Fonctionnalites

- Cycle jour/nuit automatique (2 minutes)
- PNJ animes (marchand, chat, vendeur d'epices, visiteur)
- Particules (poussiere doree, fumee d'encens, etoiles)
- Easter egg : cliquer 3 fois rapidement sur le premier tapis
- Modals RPG avec 3 themes (parchemin, bois, nuit)
- Dialog box avec effet typewriter
- Responsive mobile-first
- Lazy loading des boutiques
- Accessible (aria-labels, focus trap, navigation clavier)

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd souk-portfolio

# Installer les dependances
npm install

# Lancer le serveur de dev
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

## Personnalisation

Chercher tous les `TODO: REMPLACER` dans le dossier `src/data/` :

- **`src/data/profile.js`** — Nom, titre, bio, liens sociaux, experience
- **`src/data/projects.js`** — Projets avec description, technologies, liens
- **`src/data/skills.js`** — Competences (niveaux), certifications, education

## Deploiement

Le projet est pret pour Vercel ou Netlify :

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deployer le dossier dist/
```

### Configuration
- Build command : `npm run build`
- Output directory : `dist`
- Node version : 18+

## Structure du projet

```
souk-portfolio/
├── CHANGELOG.md
├── README.md
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── components/
    │   ├── Souk/
    │   │   ├── SoukScene.jsx      # Vue principale du souk
    │   │   ├── Boutique.jsx       # Boutique reutilisable
    │   │   ├── Character.jsx      # PNJ pixel art (CSS)
    │   │   └── Decorations.jsx    # Lanternes, tapis, epices...
    │   ├── Shops/
    │   │   ├── CVShop.jsx         # L'Ecrivain Public
    │   │   ├── LinksShop.jsx      # Le Tisserand
    │   │   ├── ProjectsShop.jsx   # L'Atelier du Forgeron
    │   │   ├── SkillsShop.jsx     # La Bibliotheque
    │   │   ├── ContactShop.jsx    # Le Pigeon Voyageur
    │   │   └── TestimonialsShop.jsx # Le Conteur
    │   ├── UI/
    │   │   ├── PixelButton.jsx
    │   │   ├── PixelModal.jsx
    │   │   └── DialogBox.jsx
    │   └── Layout/
    │       ├── Header.jsx
    │       └── Footer.jsx
    ├── data/
    │   ├── profile.js
    │   ├── projects.js
    │   └── skills.js
    ├── hooks/
    │   └── usePixelAnimation.js
    ├── styles/
    │   ├── pixel.css
    │   └── animations.css
    ├── utils/
    │   └── spriteHelpers.js
    ├── App.jsx
    └── main.jsx
```

## Ajouter une boutique

1. Creer un composant dans `src/components/Shops/NouveauShop.jsx`
2. L'ajouter au tableau `SHOPS` dans `src/components/Souk/SoukScene.jsx`
3. Choisir une couleur, un emoji, et un variant de modal

## Licence

MIT
