# AVANT L'OUBLI

## 🎮 Pitch
Dans un futur où le peuple de Flowflow a perdu sa terre et son identité, un instrument ancestral permet de retourner à l'époque où tout a commencé. Flowflow doit influencer les événements du passé avant qu'une conquête étrangère ne transforme définitivement l'avenir.

## 🎯 Objectif
Créer un petit RPG complet, fini et poli, avec un vrai début et une vraie fin.
15 à 30 minutes d'expérience jouable.

## 🛠️ Stack technique
- **Langage** : JavaScript (ES modules)
- **Rendu** : Canvas 2D (`<canvas>` + `CanvasRenderingContext2D`)
- **Structure** : HTML/JS pur, sans framework, sans bundler
- **Boucle de jeu** : `requestAnimationFrame` + delta time
- **Sauvegarde** : `localStorage`

## ▶️ Lancer le jeu
```bash
# Python (déjà installé)
python -m http.server 8000

# Ou Node.js
npx serve .
```
Puis ouvrir `http://localhost:8000` dans le navigateur.

> Les modules ES6 (`import`/`export`) ne fonctionnent pas en `file://`. Un serveur local est obligatoire.

## ⚠️ Règle absolue
MUST d'abord → SHOULD ensuite → COULD en dernier.
Aucune nouvelle feature COULD tant que le MUST n'est pas vert.

## 📋 Obligatoires (8)
- Caractéristiques (PV, Force, Défense, Agilité, Esprit)
- Combat décidé par les caractéristiques
- Inventaire à nombre de places limité
- XP obtenue par combat/actions
- Niveaux + amélioration des caractéristiques
- PNJ (au moins 8 dans le village)
- Au moins une quête
- Tutoriel dès le lancement

## 🧩 Cœur technique
- Collisions mobiles/statiques + formes différentes (rect + cercle)
- Caméra : zoom (`ctx.scale`), translation (`ctx.translate`), rotation (`ctx.rotate`)
- Effets 3D / profondeur / projection isométrique (tri par Y)
- Boutons avec au moins 3 états (normal, hover, pressed)
- Sauvegarde : quitter → revenir → reprendre (`localStorage`)
- Souris + clavier
- Sprites animés depuis sprite sheets (`ctx.drawImage` 9 args)
- Animations indépendantes du framerate (delta time)

## 🖥️ Menus
**Menu principal :**
- Commencer
- Reprendre (grisé si aucune sauvegarde)
- Réglages : son/musique, résolution (1920×1080 + une autre), fenêtré/plein écran
- Quitter

**Menu ESC (en jeu) :**
- Personnage / Équipement / Inventaire / Caractéristiques
- Sauvegarder / Charger
- Réglages + Liste des commandes

## 🏘️ Village
Le village doit être vivant dès le début :
- Ancien (histoire) · Garde (tutoriel combat) · Guérisseur (soins) · Forgeron (équipement)
- Fermier (première quête) · Enfant (ambiance) · Chef (quête principale) · Mystérieux (voyage temporel)

Le tutoriel commence dans le village.

## ⏳ Histoire
- **Acte I** : futur ruiné — le village sert de tutoriel.
- **Acte II** : retour dans le passé — le royaume est vivant, la menace arrive.
- **Acte III** : événement historique final — les choix du joueur influencent la fin.

Le joueur ne doit pas être un simple "héros qui tape tout le monde".
Les forces ennemies sont une puissance étrangère fictive. Le conflit porte sur la conquête et ses conséquences, pas sur une ethnie réelle.

## 🎨 Direction artistique
- RPG 2D isométrique / pixel art
- **Passé** : chaud, vivant — terracotta `#B85C38`, ocre `#D99A45`, beige `#E8C99B`, vert `#4F6F52`
- **Futur** : froid, ruiné — noir bleuté `#171C24`, gris `#59636E`, violet `#765A9A`, bleu `#8FAFC4`
- Le joueur doit reconnaître l'époque uniquement grâce à l'ambiance visuelle.

## 📦 Limite dépôt
30 Mo maximum, assets compris.
- Sprites → PNG optimisé (palette réduite, `pngquant` ou `optipng`)
- Audio → OGG Vorbis (`ffmpeg -i son.wav -q:a 5 son.ogg`)
- Maps → JSON
- Vérifier avant chaque push : `du -sh .`

## 👥 Équipe

| Membre | Branche | Domaine | Fichiers |
|---|---|---|---|
| **Yvan** (yvanande) | `feature/core-integration` | Architecture, moteur, caméra, intégration, sauvegarde | `src/core/*`, `src/main.js` |
| **Ascael** (ascaell) | `feature/player` | Joueur, déplacement, collisions, stats, XP, niveaux | `src/player/*`, `src/world/collision.js` |
| **Paul** (commandant-leger) | `feature/combat` | Combat, ennemis, boss, dégâts, XP combat | `src/combat/*` |
| **Marie-Joseph** (Kaizen-to-Shoshin) | `feature/ui` | Menus, HUD, inventaire, réglages, boutons 3 états | `src/ui/*` |
| **Carmella** (carmella) | `feature/story` | Monde, PNJ, quêtes, histoire, dialogues, maps | `src/world/*`, `assets/maps/*` |

Tout le monde peut proposer des idées dans `IDEAS.md`.

## 🔀 Git
```
main          ← version stable finale
dev           ← intégration
feature/*     ← développement individuel
```

Les features passent par Pull Request vers `dev`.
Une PR est mergée après test chez un autre membre.
**Personne ne pousse directement sur `main`.**

## 💬 Commits
```
feat: add player movement
fix: prevent wall crossing
ui: add pause menu
story: add village dialogue
docs: update roadmap
refactor: split combat logic
chore: compress sprites
```

## 🚦 Avant chaque feature
1. Est-ce obligatoire ?
2. Est-ce dans le MUST ?
3. Est-ce faisable dans le temps ?
4. Est-ce que ça améliore vraiment le jeu ?
5. Est-ce que ça augmente trop le poids du dépôt ?

Si la réponse est non, on reporte.

## 📁 Structure du projet
```
avant-l-oubli/
├── index.html              ← point d'entrée, le <canvas>
├── css/
│   └── style.css           ← style pour les menus HTML (overlay)
├── src/
│   ├── main.js             ← boucle de jeu, init, requestAnimationFrame
│   ├── core/
│   │   ├── game.js         ← état global, changement de scènes
│   │   ├── input.js        ← clavier + souris
│   │   ├── camera.js       ← translation, zoom, rotation, suivi joueur
│   │   ├── assets.js       ← chargement images + sons
│   │   └── save.js         ← sauvegarde/chargement localStorage
│   ├── player/
│   │   ├── player.js       ← position, déplacement, direction, animation
│   │   ├── stats.js        ← PV, Force, Défense, Agilité, Esprit, XP, niveaux
│   │   └── inventory.js    ← slots limités, équipement
│   ├── combat/
│   │   ├── combat.js       ← logique de combat
│   │   ├── enemy.js        ← types d'ennemis, stats, comportement
│   │   └── boss.js         ← boss spéciaux
│   ├── world/
│   │   ├── tilemap.js      ← chargement et rendu de la map isométrique
│   │   ├── collision.js    ← détection rect + cercle
│   │   ├── npc.js          ← PNJ, dialogues, quêtes
│   │   └── zone.js         ← gestion des zones (village, forêt, forteresse)
│   └── ui/
│       ├── menu.js         ← menu principal + menu ESC
│       ├── hud.js          ← barre de vie, XP, minimap
│       ├── dialog.js       ← boîtes de dialogue
│       ├── button.js       ← boutons 3 états
│       └── settings.js     ← volume, résolution, plein écran
├── assets/
│   ├── sprites/
│   ├── maps/
│   ├── sounds/
│   └── music/
└── README.md
```

## 📚 Documentation
- `docs/00_REGLES_DU_PROJET.md` → règles du sujet
- `docs/01_CONCEPT.md` → pitch et concept
- `docs/02_HISTOIRE.md` → les 3 actes
- `docs/03_GAMEPLAY.md` → stats, combat, XP, inventaire
- `docs/04_MONDE_ET_PNJ.md` → zones et PNJ
- `docs/05_DIRECTION_ARTISTIQUE.md` → style visuel
- `docs/06_TECHNIQUE.md` → architecture technique
- `docs/07_ASSETS.md` → gestion des assets et poids
- `docs/08_ROADMAP.md` → MUST / SHOULD / COULD
- `docs/09_REPARTITION.md` → répartition détaillée de l'équipe
- `docs/10_IDENTITE_VISUELLE.md` → palette de couleurs et charte graphique
- `TEAM_WORKFLOW.md` → workflow Git
- `DECISIONS.md` → décisions prises
- `IDEAS.md` → boîte à idées
- `TODO.md` → checklist MUST / SHOULD / COULD