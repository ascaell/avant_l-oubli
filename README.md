# AVANT L'OUBLI

## 🎮 Pitch
Dans un futur où le peuple de Flowflow a perdu sa terre et son identité, un instrument ancestral permet de retourner à l'époque où tout a commencé. Flowflow doit influencer les événements du passé avant qu'une conquête étrangère ne transforme définitivement l'avenir.

## 🎯 Objectif
Créer un petit RPG complet, fini et poli, avec un vrai début et une vraie fin.

## ⚠️ Règle absolue
MUST d'abord → SHOULD ensuite → COULD en dernier.
Aucune nouvelle feature COULD tant que le MUST n'est pas vert.

## 📋 Obligatoires
- Caractéristiques
- Combat décidé par les caractéristiques
- Inventaire à nombre de places limité
- XP obtenue par combat/actions
- Niveaux + amélioration des caractéristiques
- PNJ
- Au moins une quête
- Tutoriel dès le lancement

## 🧩 Cœur technique
- Collisions mobiles/statiques + formes différentes
- Caméra : zoom, translation, rotation
- Effets 3D/profondeur/projection isométrique
- Boutons avec au moins 3 états
- Sauvegarde : quitter → revenir → reprendre
- Souris + clavier
- Sprites animés depuis sprite sheets
- Animations indépendantes du framerate

## 🖥️ Menus
Menu principal :
- Commencer
- Reprendre (grisé si impossible)
- Réglages
- Son / musique
- Fenêtré / plein écran
- Au moins 2 résolutions dont 1920x1080
- Quitter

Menu ESC :
- Personnage
- Équipement + inventaire
- Caractéristiques
- Sauvegarder
- Charger
- Réglages
- Liste des commandes

## 🏘️ Village
Le village doit être vivant dès le début :
- ancien/conteur
- garde
- guérisseur
- forgeron
- fermier
- enfant
- chef
- personnage mystérieux lié au voyage temporel

Le tutoriel commence dans le village.

## ⏳ Histoire
Acte I : futur ruiné.
Acte II : retour dans le passé.
Acte III : événement historique final + conséquence de nos choix.

Le joueur ne doit pas être un simple "héros qui tape tout le monde".
Les forces ennemies sont une puissance étrangère fictive et ses éventuels collaborateurs. Le conflit porte sur la conquête et ses conséquences, pas sur une ethnie réelle.

## 📦 Limite dépôt
30 Mo maximum, assets compris.
Chaque asset doit être justifié et optimisé.

## 👥 Équipe
- yvanande — architecture, intégration, game design technique
- ascael — joueur / déplacements / collisions / statistiques
- commandant-leger — combat / ennemis / boss
- Kaizen-to-Shoshin — UI / menus / sauvegarde
- carmella — monde / histoire / PNJ / quêtes

Tout le monde peut proposer des idées dans IDEAS.md.

## 🔀 Git
main = version stable
dev = intégration
feature/* = développement individuel

Jamais de push direct sur main.
Les features passent par Pull Request vers dev.
main reçoit uniquement une version testée.

## 🌿 Branches
feature/core-integration
feature/player
feature/combat
feature/world
feature/ui
feature/story

## 💬 Workflow idée
💡 idée → 🟡 discussion → vérification sujet → vérification faisabilité → 🟢 validée → TODO → développement → test → merge.

## 🚦 Avant chaque feature
1. Est-ce obligatoire ?
2. Est-ce dans le MUST ?
3. Est-ce faisable dans le temps ?
4. Est-ce que ça améliore vraiment le jeu ?
5. Est-ce que ça augmente trop le poids du dépôt ?

Si la réponse est non, on reporte.
