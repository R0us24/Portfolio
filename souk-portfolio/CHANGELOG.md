# CHANGELOG — Souk Portfolio Pixel Art

Historique de toutes les modifications du projet.

---

## 2026-03-03 - Phase 1 : Fondations

### Fichier(s) modifié(s)
- `CHANGELOG.md`
- `package.json`
- `vite.config.js`
- `index.html`
- `src/index.css`
- `src/styles/pixel.css`
- `src/styles/animations.css`
- `src/data/profile.js`
- `src/data/projects.js`
- `src/data/skills.js`
- `src/utils/spriteHelpers.js`
- `src/hooks/usePixelAnimation.js`

### Changement
- Initialisation du projet avec Vite + React (template react)
- Installation de Tailwind CSS v4 (@tailwindcss/vite), Framer Motion
- Configuration des fonts pixel art (Press Start 2P, VT323, Silkscreen) via Google Fonts
- Palette de couleurs complète définie en variables CSS Tailwind v4 (@theme)
- Styles pixel art globaux : pixel-border, pixel-shadow, parchment, rpg-dialog, wood-board, mosaic-pattern
- Animations CSS : float, bobble, wave, lanternGlow, particleDrift, smokeRise, twinkle, flyingCarpet, curtainReveal, etc.
- Données placeholder avec TODO pour profile, projects, skills
- Utilitaires : gridToBoxShadow (pixel art en box-shadow), PIXEL_COLORS
- Hooks : usePixelAnimation (sprite frames), useDayNightCycle (cycle jour/nuit 2 min)

### Raison
Mise en place de toutes les fondations techniques du projet. Choix de Vite + React pour la rapidité de dev et le HMR. Tailwind v4 pour le styling utilitaire avec variables CSS natives.

### Statut : ✅ Terminé

---

## 2026-03-03 - Phase 2 : Le Souk (Vue Principale)

### Fichier(s) modifié(s)
- `src/components/Souk/SoukScene.jsx`
- `src/components/Souk/Boutique.jsx`
- `src/components/Souk/Character.jsx`
- `src/components/Souk/Decorations.jsx`
- `src/components/UI/PixelButton.jsx`
- `src/components/UI/PixelModal.jsx`
- `src/components/UI/DialogBox.jsx`
- `src/components/Layout/Header.jsx`
- `src/components/Layout/Footer.jsx`
- `src/App.jsx`

### Changement
- **SoukScene** : Vue principale avec grille de 6 boutiques, étoiles animées (nuit), particules de poussière dorée, arche d'entrée, PNJ animés, tapis avec easter egg, visiteur qui traverse la scène
- **Boutique** : Composant réutilisable avec auvent rayé (couleur unique par boutique), murs en pierre, comptoir en bois, animation Framer Motion staggerée, hover avec glow, clavier accessible
- **Character** : 4 types de PNJ en pixel art pur CSS (box-shadow) — marchand (turban), chat (dort avec Zzz), vendeur d'épices, visiteur. Animations idle/wave/sleep
- **Decorations** : Lanterne (glow pulse), tapis (3 variantes + easter egg tapis volant), pots d'épices, arche décorative, fumée d'encens, palmier — tout en CSS pur
- **UI** : PixelButton (3 variantes, effet 3D press), PixelModal (RPG style, 3 thèmes parchment/wood/night, focus trap, escape close), DialogBox (typewriter effect, speaker label)
- **Layout** : Header fixe avec icône lampe pixel, Footer avec copyright
- **Cycle jour/nuit** : Le fond passe de bleu matin → bleu jour → orange coucher → nuit étoilée sur 2 minutes

### Raison
Construction de toute l'expérience visuelle du souk. Chaque boutique a un look unique (couleur de canopy, icône). Les PNJ et décorations donnent vie à la scène. Le cycle jour/nuit ajoute de la profondeur.

### Statut : ✅ Terminé

---

## 2026-03-03 - Phase 3 : Les Boutiques (Contenu)

### Fichier(s) modifié(s)
- `src/components/Shops/CVShop.jsx`
- `src/components/Shops/LinksShop.jsx`
- `src/components/Shops/ProjectsShop.jsx`
- `src/components/Shops/SkillsShop.jsx`
- `src/components/Shops/ContactShop.jsx`
- `src/components/Shops/TestimonialsShop.jsx`

### Changement
- **CVShop** (L'Écrivain Public) : CV sur parchemin avec plume pixel art, timeline d'expérience avec connecteur vertical, animation unroll
- **LinksShop** (Le Tisserand) : Cartes de liens sociaux avec fils de connexion, hover pull-thread, couleurs par plateforme (LinkedIn bleu, GitHub noir, etc.)
- **ProjectsShop** (L'Atelier du Forgeron) : Grille responsive de projets, cartes métalliques avec rivets, tech tags, hover glow chaud, liens GitHub/Demo
- **SkillsShop** (La Bibliothèque) : Barres de compétences RPG par catégorie (Frontend/Backend/Tools), étagères en bois, certifications avec sceau, éducation avec icônes livre
- **ContactShop** (Le Pigeon Voyageur) : Formulaire stylisé avec validation, bouton "Envoyer le pigeon" avec animation de vol, pigeon CSS pixel art
- **TestimonialsShop** (Le Conteur) : Bulles de dialogue avec triangle pixel, étoiles de notation, animation fade-in

### Raison
Chaque boutique a un thème visuel unique qui correspond à sa métaphore (parchemin pour le CV, forge pour les projets, bibliothèque pour les compétences, etc.). Tout le contenu est lazy-loaded pour la performance.

### Statut : ✅ Terminé

---

## 2026-03-03 - Phase 4 : Polish & Tests

### Fichier(s) modifié(s)
- `src/components/Souk/SoukScene.jsx`

### Changement
- Fix du double AnimatePresence qui empêchait l'ouverture du modal
- Vérification visuelle complète : vue desktop et mobile
- Test des interactions (clic boutique → dialog → modal → contenu)
- Vérification du cycle jour/nuit (morning → day → evening → night)
- Vérification responsive mobile (shops en colonne verticale)
- Vérification de l'accessibilité (aria-labels, keyboard nav, focus trap)

### Raison
S'assurer que tout fonctionne correctement avant la finalisation.

### Statut : ✅ Terminé

---

## 2026-03-03 - Phase 5 : Finalisation

### Fichier(s) modifié(s)
- `CHANGELOG.md`
- `README.md`

### Changement
- Mise à jour complète du CHANGELOG avec tout l'historique du projet
- Rédaction du README avec instructions de déploiement
- Build de production validé (0 erreurs, chunks code-split)

### Raison
Finalisation du projet pour livraison.

### Statut : ✅ Terminé

---

## 2026-03-07 - Mise a jour majeure : Personnalisation & Refonte UI

### Fichier(s) modifie(s)
- `src/data/profile.js` — Donnees reelles du CV de Roustom
- `src/data/projects.js` — 3 vrais projets (SyncEventHub, Alonzo Interpreter, UnitedCTF)
- `src/data/skills.js` — Skills restructures en tags (sans barres %), ajout Design & Media
- `src/components/Souk/SoukScene.jsx` — Refonte complete
- `src/components/UI/DialogBox.jsx` — Refonte style Undertale
- `src/components/Shops/CVShop.jsx` — Donnees reelles + bouton telecharger CV
- `src/components/Shops/LinksShop.jsx` — 3 liens (LinkedIn, GitHub, Email) + logo git.png
- `src/components/Shops/ProjectsShop.jsx` — 3 vrais projets
- `src/components/Shops/SkillsShop.jsx` — Tags/badges au lieu de barres + Figma/Photoshop/Premiere/AE
- `src/components/Shops/ContactShop.jsx` — Formulaire ameliore
- `src/components/Shops/CTFShop.jsx` — NOUVEAU (remplace TestimonialsShop)
- `src/components/Shops/GalleryShop.jsx` — NOUVEAU (galerie photo)
- `src/components/Layout/Footer.jsx` — Nom de Roustom au lieu de "Crafted with..."
- `public/RousRous.pdf` — CV telechargeable

### Changements
- Remplissage de toutes les donnees avec le vrai CV
- Retrait de l'arche/cadre d'entree — titre large sans bordure
- Ajout du personnage Qasantini en bas (image custom) avec anecdotes aleatoires au clic
- Dialog box style Undertale avec portrait Qasantini head a gauche
- Retrait de tous les PNJ CSS (Character) — remplaces par Qasantini
- Retrait du degrade brun en bas de page — fond uniforme
- Cycle jour/nuit plus fluide (requestAnimationFrame au lieu de setInterval 1s)
- Retrait de TOUS les emojis — remplaces par icones CSS
- Nouveau magasin "L'Arene des Defis" pour les CTF
- Nouveau magasin "La Galerie" pour les creations
- Skills en tags colores au lieu de barres de pourcentage
- Ajout Figma, Photoshop, Premiere Pro, After Effects aux competences
- Logo GitHub custom (git.png) dans Le Tisserand
- Bouton "Telecharger mon CV" dans L'Ecrivain Public
- Toutes les images non-draggable
- Footer avec "Roustom Abdeldjalel Cherir" + copyright Montreal

### Raison
Personnalisation complete du portfolio avec les vraies informations du proprietaire et amelioration significative de l'UI/UX.

### Statut : ✅ Termine

---
