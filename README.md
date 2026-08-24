# HIVE4DX — Portail & Générateur de Documents

Portail web interne pour HIVE4DX permettant de consulter, modifier et exporter en PDF les documents officiels de pilotage et d'alternance.

## Stack Technique

| Outil | Version | Rôle |
|-------|---------|------|
| **Vite** | ^5.0 | Serveur de dev & bundler |
| **HTML/CSS/JS** | Vanilla | Aucun framework front-end |
| **Google Fonts** | Inter | Typographie |

## Installation & Lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement (http://localhost:5173)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Architecture du Projet

```
hive4dx-web-template/
├── index.html                  # Dashboard — liste des documents
├── livret-sanaa.html           # Livret de cadrage & pilotage (Sanaa)
├── css/
│   ├── variables.css           # Design tokens (couleurs, fonts, espacements)
│   ├── base.css                # Layout, @page print, prévisualisation A4
│   ├── typography.css          # Titres, paragraphes, tables, listes, code
│   ├── cadrage.css             # Composants spécifiques au livret
│   └── dashboard.css           # Composants spécifiques au portail
├── js/
│   ├── pagination.js           # Découpage en pages A4 (screen preview)
│   └── metadata-loader.js      # Injection de métadonnées depuis JSON
├── config/
│   ├── cadrage-metadata.json   # Données du livret (étudiant, entreprise, CFA)
│   └── documents.json          # Registre des documents du portail
├── assets/
│   ├── Hive4DX_Icon.png        # Icône haute résolution (source)
│   ├── Hive4DX_Icon@2x.png     # Icône optimisée Retina (130px)
│   ├── Hive4DX_Black_Transparent.png      # Logo source
│   └── Hive4DX_Black_Transparent@2x.png   # Logo optimisé Retina (80px)
├── vite.config.js
├── package.json
└── .gitignore
```

## Architecture CSS

Le CSS est organisé en couches, de la plus générale à la plus spécifique :

1. **`variables.css`** — Design tokens : couleurs, polices, espacements, radius
2. **`base.css`** — Reset, layout body, pages A4 (portrait + paysage), print styles
3. **`typography.css`** — Styles globaux pour titres, texte, listes, tables et code
4. **`cadrage.css`** / **`dashboard.css`** — Composants spécifiques par page

### Classes utilitaires de largeur de colonne

Les classes `col-w-*` dans `cadrage.css` servent à définir les largeurs de colonnes dans les tables :

```html
<th class="col-w-25">Colonne à 25%</th>
<th class="col-w-75">Colonne à 75%</th>
```

## Ajouter un Nouveau Document

1. Créer le fichier HTML à la racine (ex. `facture-template.html`)
2. L'ajouter dans `config/documents.json` :
   ```json
   {
     "id": "facture-template",
     "title": "Modèle de Facture HIVE4DX",
     "description": "<strong>Version :</strong> 1.0",
     "url": "facture-template.html",
     "status": "active"
   }
   ```
3. Déclarer l'entrée dans `vite.config.js` :
   ```js
   input: {
     main: 'index.html',
     livret_sanaa: 'livret-sanaa.html',
     facture: 'facture-template.html',  // ← nouveau
   }
   ```

## Export PDF

Le livret est conçu pour un export PDF via `Ctrl+P` / `Cmd+P` dans le navigateur :

- Les styles `@page` gèrent les marges et footers en mode print
- Les sections `landscape-section` basculent automatiquement en paysage
- Les footers d'écran (`.screen-footer`) sont masqués à l'impression
