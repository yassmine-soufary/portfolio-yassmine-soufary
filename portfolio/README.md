# Yassmine Soufary — Portfolio Personnel Data Science & IA

> **Étudiante ingénieure en informatique | Data Science & Intelligence Artificielle**  
> **Recherche active : Stage PFE de fin d'études — Février 2027 (4 à 6 mois)**  
> **Université Mundiapolis (Casablanca) & Double diplomation Big Data (Yiwu Industrial & Commercial College)**

---

## ⚡ Présentation du projet

Ce portfolio personnel haut de gamme est conçu avec une esthétique futuriste inspirée de la **Data Science, de l'Intelligence Artificielle et de l'ingénierie numérique**. Il allie une rigueur professionnelle absolue (100% conforme au CV officiel, sans statistiques ni résultats inventés) à des interactions visuelles avancées.

### 🌟 Points forts et fonctionnalités

- **Pluie binaire & éclairs électriques (HTML5 Canvas)** : Arrière-plan dynamique et immersif composé de chiffres binaires `0` et `1` avec champs de force énergétiques réactifs à la souris, nœuds neuronaux et arcs de foudre. Capped DPR (1.5 max) et mise en pause automatique lors du changement d'onglet pour des performances optimales.
- **Portrait interactif `maphotos`** : Cadre cybernétique avec anneaux gyroscopiques, effet 3D tilt, éclair électrique sur le pourtour et dissolution en particules binaires sur survol (desktop) et toucher (mobile), avec retour fluide à la photo réelle.
- **Palette chromatique Cyber** : Fond nuit `#050510`, cartes `#0B1020`, accents Bleu Électrique `#1677FF`, Bleu Néon `#38BDF8`, et Violet `#8B5CF6`.
- **Mode Sombre / Mode Clair** : Bascule instantanée avec tokens Tailwind CSS optimisés.
- **Internationalisation bilingue (FR / EN)** : Dictionnaire de traduction complet couvrant l'intégralité des sections, modals et fiches projets.
- **Palette de commandes (Ctrl+K / Cmd+K)** : Navigation clavier rapide vers les sections, projets, compétences et téléchargement du CV.
- **Modal Recruteur express** : Fiche synthétique en un clic conçue pour les recruteurs et responsables RH avec accès direct au CV et coordonnées.
- **Pages de cas d'études détaillées (`/projects/:slug`)** : Structure réutilisable (Contexte, Objectif, Architecture, Technologies, Résultats) sans données fictives.
- **Vie associative & Galeries photos authentiques** : Mise en valeur des engagements associatifs (Club GENTECH, Club Legends) et galeries carrousels avec photos réelles d'actions caritatives (Iftar Ramadan, Maison de retraite, Orphelinat, Enfants en situation de handicap).
- **Activité GitHub en direct** : Intégration de l'API publique GitHub avec gestion du rate-limit et données de secours.

---

## 🛠️ Stack technologique

- **Framework** : [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routage** : [React Router v7](https://reactrouter.com/)
- **Styles** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/) + Composants SVG sur mesure pour les logos de marque
- **Canvas Effects** : HTML5 Canvas natif optimisé 60 FPS avec `requestAnimationFrame`

---

## 🚀 Installation et exécution locale

### Prérequis
- [Node.js](https://nodejs.org/) v18+ installé
- npm v9+

### Démarrage rapide

```bash
# 1. Naviguer dans le dossier du portfolio
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement local
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Commandes utiles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le serveur de développement Vite avec HMR ultra-rapide |
| `npm run build` | Compile l'application pour la production dans le dossier `dist/` |
| `npm run preview` | Prévisualise le build de production localement |
| `npm run lint` | Lance le linter `oxlint` pour vérifier le code |

---

## 📁 Architecture des fichiers

```text
portfolio/
├── public/
│   ├── cv.pdf                         # CV officiel au format PDF téléchargeable
│   └── images/
│       ├── profile/
│       │   └── maphotos.jpg           # Photo portrait officielle
│       └── associative/               # Photos réelles des actions associatives
│           ├── iftar-ramadan/
│           ├── maison-retraite/
│           ├── orphelinat/
│           └── enfants-handicap/
├── src/
│   ├── components/                    # Composants modulaires d'interface
│   │   ├── About.jsx                  # Section "De la donnée à la décision" + Fiche Recruteur
│   │   ├── AssociativeLife.jsx        # Clubs + Galeries carrousels + Lightbox
│   │   ├── AwardsCertifications.jsx   # NXP Competition 2ème place + Certifications
│   │   ├── BinaryRainBackground.jsx   # Arrière-plan binaire + éclairs Canvas
│   │   ├── BrandIcons.jsx             # Icônes SVG conformes (GitHub, LinkedIn)
│   │   ├── CommandPalette.jsx         # Recherche Ctrl+K
│   │   ├── Contact.jsx                # Formulaire mailto + Coordonnées vérifiées
│   │   ├── Cursor.jsx                 # Curseur personnalisé interactif
│   │   ├── Education.jsx              # Timeline académique
│   │   ├── Experience.jsx             # Timeline professionnelle extensible
│   │   ├── GithubActivity.jsx         # Flux GitHub temps réel
│   │   ├── Hero.jsx                   # Titre bicolore, machine à écrire, CTAs
│   │   ├── Languages.jsx              # Niveaux de langues CECRL
│   │   ├── Navbar.jsx                 # Navigation sticky, toggles FR/EN & Dark/Light
│   │   ├── PersonalPhotoCard.jsx      # Portrait avec effets cyber & dissolution
│   │   ├── Projects.jsx               # Grille des projets + Filtres dynamiques
│   │   ├── RecruiterModal.jsx         # Modal de synthèse pour recruteurs
│   │   ├── SkillsSection.jsx          # Compétences techniques & interactions
│   │   └── TechMarquee.jsx            # Bandeau défilant des technologies
│   ├── context/
│   │   └── AppContext.jsx             # État global (langue, thème, modals, filtres)
│   ├── data/                          # Données typées et centralisées
│   │   ├── associative.js             # Données des clubs et galeries
│   │   ├── certifications.js          # Distinctions et certifications
│   │   ├── education.js               # Cursus académique
│   │   ├── experiences.js             # Expériences professionnelles
│   │   ├── languages.js               # Compétences linguistiques
│   │   ├── profile.js                 # Coordonnées et biographie
│   │   ├── projects.js                # Fiches complètes des projets
│   │   └── skills.js                  # Compétences par domaine
│   ├── i18n/
│   │   └── translations.js            # Dictionnaires bilingues FR et EN
│   ├── pages/
│   │   ├── Home.jsx                   # Page d'accueil principale
│   │   ├── ProjectCase.jsx            # Page de cas d'étude détaillée (/projects/:slug)
│   │   └── NotFound.jsx               # Page 404 futuriste
│   ├── App.jsx                        # Configuration des routes et fournisseurs
│   ├── index.css                      # Thème Tailwind v4, tokens de couleurs et polices
│   └── main.jsx                       # Point d'entrée React
└── dist/                              # Fichiers compilés prêts au déploiement statique
```

---

## ✏️ Modifier et personnaliser le contenu

Toutes les informations sont centralisées dans le dossier `src/data/` :

1. **Mettre à jour le CV** : Déposez simplement le nouveau fichier PDF dans `public/cv.pdf`.
2. **Modifier les coordonnées** : Éditez `src/data/profile.js` (email, téléphone, liens GitHub, LinkedIn).
3. **Ajouter un projet** : Ajoutez un objet dans `src/data/projects.js` avec son identifiant `slug`. La page de cas d'étude sera automatiquement générée sur `/projects/:slug`.
4. **Mettre à jour les expériences ou formations** : Modifiez respectivement `src/data/experiences.js` ou `src/data/education.js`.
5. **Ajouter des photos aux galeries associatives** : Placez les images dans le dossier correspondant sous `public/images/associative/` et référencez-les dans `src/data/associative.js`.
6. **Mettre à jour les traductions** : Ajoutez ou modifiez les textes dans `src/i18n/translations.js`.

---

## 🌐 Déploiement statique

Le site est entièrement statique (aucun backend requis) et optimisé pour le déploiement sur les plateformes modernes :

### Déploiement sur Vercel
1. Installez le CLI Vercel (`npm i -g vercel`) ou connectez votre dépôt GitHub sur [vercel.com](https://vercel.com).
2. Définissez le répertoire racine (`portfolio`) et la commande de build (`npm run build`), dossier de sortie (`dist`).

### Déploiement sur GitHub Pages
1. Assurez-vous que `base` est correctement configuré dans `vite.config.js` si le site n'est pas déployé à la racine du domaine :
   ```js
   export default defineConfig({
     base: '/nom-du-repo/',
     plugins: [react(), tailwindcss()],
   })
   ```
2. Lancez `npm run build` et poussez le contenu du dossier `dist/` sur la branche `gh-pages` (ou via une GitHub Action automatisée).

---

## 📄 Licence & Droits

Conçu pour la présentation professionnelle et académique de **Yassmine Soufary**. Tous droits réservés.
