# Prompt pour Claude Code — Refonte Portfolio Souk Pixel Art

## Contexte du projet

Le projet est un portfolio interactif en pixel art avec un thème de souk arabe, construit en React + Vite + Framer Motion + Tailwind CSS. Le code source est dans `C:\Users\roust\Desktop\portfolio\souk-portfolio\`. Les images personnalisées sont dans `C:\Users\roust\Desktop\portfolio\image\` et contiennent :
- `Qasantini.png` — personnage full-body d'une personne qui sert du thé (créé par moi)
- `Qasantini head.png` — tête du personnage (pour les dialogues style Undertale)
- `git.png` — logo GitHub custom

Mon CV se trouve dans `C:\Users\roust\Desktop\RousResume2.pdf`. Lis-le et utilise TOUTES les informations pertinentes (nom, compétences, expériences, formations, projets, etc.) pour remplir les données de chaque magasin.

---

## TÂCHES À EFFECTUER (dans l'ordre de priorité)

### 1. REMPLIR TOUTES LES DONNÉES AVEC MON CV

- Lis le fichier `C:\Users\roust\Desktop\RousResume2.pdf`
- Remplis `src/data/profile.js` avec mes vrais coordonnées et informations :
  - **Email** : `roustom235@gmail.com`
  - **GitHub** : `https://github.com/R0us24`
  - **LinkedIn** : `https://www.linkedin.com/in/roustom-abdeldjalel-cherir-819170356/`
  - Supprime le champ `website` (pas nécessaire)
- Remplis `src/data/skills.js` avec les compétences de mon CV (supprime les fausses données placeholder)
- Remplis `src/data/projects.js` avec mes vrais projets tirés du CV
- Remplis toutes les sections d'éducation et certifications

### 2. SUPPRIMER TOUS LES EMOJIS

- Dans `SoukScene.jsx`, remplace TOUS les emojis (`📜`, `🔗`, `⚒️`, `📚`, `🕊️`, `⭐`, `🧞`) par des icônes pixel art créées en CSS pur (box-shadow pixel art ou formes CSS simples).
- Supprime le composant `ShopIcon` qui utilise des emojis et remplace-le par de vraies icônes pixel art thématiques pour chaque boutique.
- Pas d'emojis nulle part dans tout le projet.

### 3. HEADER / ENTRÉE DU SOUK (SoukEntrance)

- **Retire le cadre** (le composant `<Arch>`) et la forme de cloche/keystone en haut.
- **Agrandir le titre** "BIENVENUE AU SOUK" significativement (au moins 2x plus grand).
- Si tu peux créer un meilleur cadre en style pixel art (bordure pixelisée décorative avec des motifs orientaux), fais-le en CSS pur. Sinon, dis-moi explicitement "Je n'ai pas pu créer un cadre pixel art satisfaisant, tu peux en créer un avec Photoshop et me l'envoyer".

### 4. PERSONNAGE QASANTINI EN BAS DE PAGE

- **Supprime TOUS les personnages PNG/pixel art en bas de page** (le `Character` visitor qui se déplace, les NPCs `merchant`, `cat`, `spiceVendor`).
- À la place, en bas de la page (sous les magasins, au-dessus du footer), affiche l'image `Qasantini.png` depuis `../../image/Qasantini.png` :
  - Dimensions adaptées (environ 150-200px de hauteur, proportions conservées)
  - Centrée horizontalement
  - **Non-draggable** (voir tâche 14)
- **Au clic sur le personnage**, affiche un message drôle/anecdote dans le style des messages Minecraft (splash text), avec un pool de messages aléatoires du genre :
  - "Le thé est prêt, mais le code ne compile toujours pas..."
  - "Un bon développeur boit 3 thés par bug corrigé"
  - "404 : Sucre non trouvé dans le thé"
  - "J'ai essayé de debug en buvant du thé... ça a marché"
  - "Le thé c'est comme le code : amer sans sucre, parfait avec patience"
  - (Ajoute 5-10 autres messages drôles sur le thème dev/thé)
- Le message apparaît dans une boîte stylisée qui pop avec une animation (comme les splash texts Minecraft : apparition rapide + léger rebond + disparition après 3 secondes).

### 5. SYSTÈME JOUR/NUIT — TRANSITIONS FLUIDES

- Dans `usePixelAnimation.js`, le hook `useDayNightCycle` :
  - Augmente la fréquence de mise à jour de `1000ms` à `100ms` pour des transitions plus fluides
  - Utilise une interpolation de couleurs linéaire (lerp) entre les phases au lieu de couleurs discrètes fixes
  - La transition entre chaque phase doit être un dégradé progressif et continu (pas de saut brusque)
- Dans `SoukScene.jsx` :
  - **SUPPRIME le dégradé vertical** dans le background (`#C4A882 65%, #A0522D 100%`). Le ciel/background doit rester UNIFORME (même couleur) sur toute la hauteur de la page. Seule la couleur du ciel change avec le cycle jour/nuit.
  - **GARDE les trois tapis** (`<Carpet>`) — ne les supprime pas
  - Le thème visuel doit rester cohérent de haut en bas

### 6. INTERFACE DES MAGASINS — REFONTE UX/UI

Pour chaque magasin (`PixelModal` + composant intérieur), améliore l'interface pour qu'elle soit plus belle et plus immersive. Chaque magasin doit avoir un thème visuel qui lui correspond :

- **L'Écrivain Public (CVShop)** : Thème parchemin/écriture. Ajoute un bouton "Télécharger mon CV" qui permet de télécharger le fichier `RousResume2.pdf` au format PDF. Copie le PDF dans `public/` pour qu'il soit servi en statique.
- **Le Tisserand (LinksShop)** : Thème fils/tissage. Supprime le lien "Site Web" (pas nécessaire). Pour le logo GitHub, utilise l'image `git.png` du dossier `image/` au lieu de l'icône CSS. Mets les vrais liens (voir section 1).
- **L'Atelier du Forgeron (ProjectsShop)** : Thème forge/métal. Affiche mes vrais projets.
- **La Bibliothèque (SkillsShop)** : Thème livres/savoir. **SUPPRIME les barres de pourcentage** (`SkillBar` avec les progress bars) — ce n'est pas professionnel. Affiche les compétences sous forme de liste ou de tags/badges pixel art. En plus des compétences du CV, rajoute : **Figma, Photoshop, Adobe Premiere Pro, After Effects**. Devant chaque nom de langage/compétence, ajoute son **logo** (utilise des icônes SVG simples inline ou des logos CSS pixel art).
- **Le Pigeon Voyageur (ContactShop)** : Thème postal/pigeon voyageur.
- **Le Conteur → REMPLACÉ** par un magasin **"CTF"** (Capture The Flag) où je montre tous les CTF que j'ai fait (crée une structure de données pour lister des CTF avec : nom, date, classement, plateforme). Donne un thème approprié (hacking/cyber/mystère).
- **NOUVEAU MAGASIN** : Ajoute un 7e magasin appelé **"La Galerie"** (ou un nom plus thématique souk) — c'est une galerie photo de mes créations (images, designs, etc.). Crée la structure de données vide et le composant avec un beau layout de galerie en grid. Le thème doit être artistique/exposition.

Si tu n'arrives pas à faire une belle interface pour un magasin, dis-le moi explicitement en commentaire dans le code : `/* BESOIN D'UNE INTERFACE CUSTOM — À REMPLACER */`

### 7. BOÎTE DE DIALOGUE — CORRECTIONS ET AMÉLIORATIONS

Dans `DialogBox.jsx` et dans `SoukScene.jsx` où le dialog est affiché :

- **Corrige le bug de décalage** : la boîte de dialogue a un léger décalage quand elle apparaît. Assure-toi que la position est exactement fixée (`position: fixed`, `bottom: 24px`, `left: 50%`, `transform: translateX(-50%)`). Supprime le doublon de positionnement (le `DialogBox` définit déjà sa position en fixed, et le wrapper `motion.div` dans `SoukScene` aussi — il faut que UN SEUL contrôle la position).
- **Animation d'entrée** : l'animation doit venir du **bas vers le haut** (slide up) de manière fluide, mais la position finale doit être exactement la même qu'actuellement.
- **Portrait du personnage** : À gauche du texte dans la boîte de dialogue, ajoute l'image `Qasantini head.png` (du dossier `image/`) en style **Undertale** :
  - Dimensions : environ 64x64px
  - Bordure pixel art autour de l'image
  - L'image est à gauche, le texte à droite (layout flex horizontal)
  - L'image est présente pour chaque message de dialogue

### 8. LIENS ET INFORMATIONS DE CONTACT

Mets à jour partout dans le code :
- **Email** : `roustom235@gmail.com`
- **GitHub** : `https://github.com/R0us24`
- **LinkedIn** : `https://www.linkedin.com/in/roustom-abdeldjalel-cherir-819170356/`
- **Supprime** tout lien vers "Site Web" / "website"
- Dans le magasin du Tisserand, utilise l'image `git.png` du dossier `image/` comme logo pour GitHub (en `<img>` avec les bonnes dimensions ~28x28px, non-draggable)

### 9. FOOTER

- Remplace le texte "Crafted with pixels & passion" par mon nom complet (que tu trouveras dans mon CV) avec un format du style : `© 2026 [Mon Nom] — Portfolio`
- Garde le style pixel art du footer

### 10. IMAGES NON-DRAGGABLES

**TOUTES les images** du site (que ce soit `<img>`, ou des éléments avec `background-image`) doivent être **non-draggables** :
- Ajoute `draggable="false"` sur toutes les balises `<img>`
- Ajoute `onDragStart={(e) => e.preventDefault()}` sur toutes les balises `<img>`
- Ajoute un style CSS global : `img { user-select: none; -webkit-user-drag: none; pointer-events: auto; }` et optionnellement `* { -webkit-user-drag: none; }` dans `index.css`
- L'utilisateur ne doit PAS pouvoir glisser-déposer les images sur son bureau

### 11. COPIE DES ASSETS

- Copie les images nécessaires du dossier `C:\Users\roust\Desktop\portfolio\image\` vers `C:\Users\roust\Desktop\portfolio\souk-portfolio\public\images\` (crée le dossier si nécessaire) :
  - `Qasantini.png`
  - `Qasantini head.png`
  - `git.png`
- Copie le CV `C:\Users\roust\Desktop\RousResume2.pdf` vers `C:\Users\roust\Desktop\portfolio\souk-portfolio\public\RousResume2.pdf`
- Référence ces images dans le code avec des chemins relatifs depuis `public/` (ex: `/images/Qasantini.png`)

---

## RÈGLES STRICTES

1. **ZÉRO EMOJI** dans tout le code — utilise des icônes CSS pixel art ou des SVG simples
2. **Ne casse rien** — le site doit rester fonctionnel après chaque modification
3. **Conserve le thème pixel art** souk arabe partout
4. **Conserve les trois tapis** avec l'easter egg du tapis volant
5. **Conserve les lanternes** et le système de particules
6. Si tu ne peux pas accomplir une tâche, indique-le clairement au lieu de faire un résultat médiocre
7. Toutes les images doivent être non-draggables
8. Les transitions jour/nuit doivent être fluides (pas de sauts de couleur)
9. Pas de barres de pourcentage pour les compétences

---

## STRUCTURE DES FICHIERS À MODIFIER

```
souk-portfolio/
├── public/
│   ├── images/          ← CRÉER ce dossier, y mettre les images
│   │   ├── Qasantini.png
│   │   ├── Qasantini head.png
│   │   └── git.png
│   └── RousResume2.pdf  ← CV à télécharger
├── src/
│   ├── index.css                          ← Ajouter CSS anti-drag
│   ├── data/
│   │   ├── profile.js                     ← Remplir avec données CV
│   │   ├── projects.js                    ← Remplir avec vrais projets
│   │   ├── skills.js                      ← Refaire (pas de %, ajouter compétences)
│   │   └── ctfs.js                        ← NOUVEAU : données CTF
│   ├── components/
│   │   ├── Layout/
│   │   │   └── Footer.jsx                 ← Changer texte footer
│   │   ├── Shops/
│   │   │   ├── CVShop.jsx                 ← Ajouter bouton télécharger CV
│   │   │   ├── LinksShop.jsx              ← Vrais liens, suppr website, img git
│   │   │   ├── ProjectsShop.jsx           ← Vrais projets
│   │   │   ├── SkillsShop.jsx             ← Suppr barres %, ajouter logos
│   │   │   ├── ContactShop.jsx            ← Vrais contacts
│   │   │   ├── CTFShop.jsx                ← NOUVEAU : remplace TestimonialsShop
│   │   │   └── GalleryShop.jsx            ← NOUVEAU : galerie photo
│   │   ├── Souk/
│   │   │   ├── SoukScene.jsx              ← Refonte majeure
│   │   │   ├── Boutique.jsx               ← OK (garder)
│   │   │   ├── Character.jsx              ← Supprimer les NPCs du bas
│   │   │   └── Decorations.jsx            ← Garder lanternes, tapis, épices
│   │   └── UI/
│   │       ├── DialogBox.jsx              ← Ajouter portrait Undertale
│   │       ├── PixelModal.jsx             ← Améliorer UI
│   │       └── PixelButton.jsx            ← OK
│   └── hooks/
│       └── usePixelAnimation.js           ← Améliorer transitions jour/nuit
```
