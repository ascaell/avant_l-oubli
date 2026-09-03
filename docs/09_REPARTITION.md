# 🎮 AVANT L'OUBLI — RÉPARTITION DE L'ÉQUIPE

> Document de référence pour savoir **qui fait quoi**, dans quels fichiers, avec quelles dépendances et selon quelles règles.

---

# 📌 1. OBJECTIF DU DOCUMENT

Ce document sert à éviter les problèmes de coordination pendant le développement.

Chaque membre doit pouvoir savoir :

- ce qu'il doit développer ;
- dans quels fichiers travailler ;
- avec quelles autres parties du projet il doit communiquer ;
- ce qu'il ne doit pas modifier ;
- quand sa partie est considérée comme terminée.

Le projet doit rester **modulaire**, **compréhensible** et **facile à intégrer**.

---

# 🌳 2. ORGANISATION GIT

## Branches principales

| Branche | Utilisation |
|---|---|
| `main` | Version stable finale |
| `dev` | Branche d'intégration |
| `feature/core-integration` | Yvan |
| `feature/player` | Ascaell |
| `feature/combat` | Paul |
| `feature/ui` | Marie-Joseph |
| `feature/story` | Carmella |

---

## 🔄 Workflow

```text
                    ┌─────────────┐
                    │    main     │
                    │   STABLE    │
                    └──────▲──────┘
                           │
                           │ merge
                           │
                    ┌──────┴──────┐
                    │     dev     │
                    │ INTEGRATION │
                    └──────▲──────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             │             │             │
      feature/player  feature/combat  feature/ui
             │             │             │
         Ascaell          Paul       Marie-Joseph
             
                    feature/story
                           │
                        Carmella

                    feature/core-integration
                           │
                          Yvan
```

### Règle importante

Personne ne pousse directement sur `main`.

Le workflow normal est :

```text
feature/*
    ↓
Pull Request
    ↓
dev
    ↓
Tests
    ↓
main
```

---

# 🟣 3. YVAN — CORE / INTÉGRATION

## 🎯 Mission principale

Yvan est responsable de l'architecture générale du jeu et de l'intégration des différentes parties.

Son objectif est de faire fonctionner ensemble :

- le moteur ;
- le joueur ;
- les combats ;
- le monde ;
- les interfaces ;
- les sauvegardes ;
- les systèmes communs.

---

## 📂 Dossiers principaux

```text
src/core/
src/world/
src/save/
```

Yvan peut également intervenir dans les autres dossiers lorsqu'une intégration est nécessaire.

---

## 🛠️ Responsabilités

### Core

Gérer les systèmes communs :

- initialisation du jeu ;
- boucle principale ;
- gestion du temps ;
- gestion des événements ;
- gestion de la fenêtre ;
- gestion de la caméra ;
- changement de scènes ;
- état global du jeu.

---

### Intégration

Faire communiquer les modules :

```text
PLAYER
   ↓
COMBAT
   ↓
WORLD
   ↓
STORY
   ↓
UI
   ↓
SAVE
```

Vérifier que les modules utilisent des interfaces cohérentes.

---

### Caméra

Préparer le système permettant :

- déplacement de caméra ;
- zoom ;
- translation ;
- rotation si nécessaire ;
- suivi du joueur.

---

### Sauvegarde

Participer à la structure générale du système de sauvegarde :

```text
Game State
    ↓
Save
    ↓
File
    ↓
Load
    ↓
Game State
```

---

## 🤝 Dépendances

Yvan travaille régulièrement avec :

- Ascaell → données du joueur ;
- Paul → données du combat ;
- Marie-Joseph → menus et interface ;
- Carmella → monde, NPC et quêtes.

---

## ❌ Yvan ne doit pas

- refaire entièrement le système de combat de Paul ;
- refaire le système du joueur d'Ascaell ;
- refaire les menus de Marie-Joseph ;
- écrire toute l'histoire à la place de Carmella ;
- modifier une feature d'un autre membre sans accord.

---

## ✅ Sa partie est terminée lorsque

- le jeu démarre correctement ;
- les différentes scènes peuvent fonctionner ;
- les modules peuvent communiquer ;
- la caméra fonctionne ;
- les systèmes principaux sont intégrables ;
- aucune dépendance importante n'est bloquée.

---

# 🔵 4. ASCAELL — PLAYER / MOVEMENT / COLLISIONS

## 🎯 Mission principale

Ascaell est responsable du personnage joueur.

Il développe les systèmes permettant au joueur de :

- se déplacer ;
- interagir avec le monde ;
- gérer ses caractéristiques ;
- gérer ses collisions.

---

## 📂 Dossier principal

```text
src/player/
```

---

## 🛠️ Responsabilités

### Joueur

Créer et gérer :

- position ;
- déplacement ;
- direction ;
- vitesse ;
- animation ;
- état du joueur.

---

### Déplacement

Le joueur doit pouvoir se déplacer avec le clavier.

Exemple :

```text
Z / W → haut
S    → bas
Q / A → gauche
D    → droite
```

Les contrôles définitifs devront être centralisés dans la configuration.

---

### Collisions

Le joueur doit pouvoir entrer en collision avec les éléments du décor.

Prévoir :

- collisions statiques ;
- formes différentes si nécessaire ;
- impossibilité de traverser certains obstacles ;
- gestion correcte des déplacements.

---

### Caractéristiques

Le joueur doit posséder des caractéristiques utilisées par le gameplay.

Exemples :

```text
PV
Force
Défense
Vitesse
Énergie
```

Les valeurs définitives seront décidées avec l'équipe.

---

### XP et niveaux

Le système doit permettre au joueur de :

```text
Gagner de l'XP
     ↓
Atteindre un seuil
     ↓
Monter de niveau
     ↓
Améliorer ses caractéristiques
```

---

## 🤝 Dépendances

Ascaell doit communiquer avec :

- Paul → statistiques utilisées par les combats ;
- Yvan → intégration du joueur dans le moteur ;
- Marie-Joseph → affichage des caractéristiques ;
- Carmella → interactions avec le monde.

---

## ❌ Ascaell ne doit pas

- créer le système complet de combat ;
- créer les menus ;
- gérer les quêtes ;
- écrire le scénario ;
- modifier le système global du moteur sans coordination.

---

## ✅ Sa partie est terminée lorsque

- le joueur peut se déplacer ;
- les animations fonctionnent ;
- les collisions fonctionnent ;
- les caractéristiques sont accessibles ;
- l'XP et les niveaux fonctionnent ;
- le joueur peut être utilisé par les autres systèmes.

---

# 🔴 5. PAUL — COMBAT / ENEMIES / BOSS

## 🎯 Mission principale

Paul est responsable du système de combat et des ennemis.

---

## 📂 Dossier principal

```text
src/combat/
```

---

## 🛠️ Responsabilités

### Système de combat

Le combat doit être déterminé par les caractéristiques des personnages.

Exemple :

```text
Force joueur
      +
Arme
      ↓
Dégâts

Défense ennemi
      ↓
Réduction des dégâts
```

Les valeurs doivent être cohérentes et faciles à modifier.

---

### Ennemis

Créer plusieurs types d'ennemis.

Exemples :

- soldat ;
- éclaireur ;
- combattant lourd ;
- officier ;
- collaborateur.

Chaque ennemi peut avoir :

- PV ;
- attaque ;
- défense ;
- vitesse ;
- comportement ;
- récompense XP.

---

### Boss

Prévoir au minimum deux boss importants.

Chaque boss doit avoir une identité propre.

Exemple :

```text
BOSS
 ├── PV
 ├── attaque
 ├── défense
 ├── comportement
 └── récompense
```

---

### XP

Après un combat gagné :

```text
Combat
   ↓
Ennemi vaincu
   ↓
XP
   ↓
Joueur
```

---

## 🤝 Dépendances

Paul travaille avec :

- Ascaell → statistiques du joueur ;
- Carmella → ennemis liés à l'histoire ;
- Yvan → intégration du combat ;
- Marie-Joseph → affichage des PV, dégâts, etc.

---

## ❌ Paul ne doit pas

- gérer les menus ;
- gérer les sauvegardes ;
- gérer les quêtes ;
- modifier le joueur directement sans coordination ;
- écrire tout le scénario.

---

## ✅ Sa partie est terminée lorsque

- un combat peut commencer ;
- les caractéristiques influencent le combat ;
- les ennemis peuvent attaquer ;
- le joueur peut subir des dégâts ;
- les ennemis peuvent mourir ;
- l'XP est attribuée ;
- les boss fonctionnent.

---

# 🟢 6. MARIE-JOSEPH — UI / MENUS / SAVE

## 🎯 Mission principale

Marie-Joseph est responsable de l'interface utilisateur et des menus.

---

## 📂 Dossier principal

```text
src/ui/
```

---

## 🛠️ Responsabilités

### Menu principal

Le menu doit contenir :

```text
START
RESUME
SETTINGS
QUIT
```

`RESUME` doit être grisé lorsqu'aucune sauvegarde n'existe.

---

### Settings

Prévoir :

- volume musique ;
- volume effets ;
- résolution ;
- mode fenêtre ;
- fullscreen ;
- commandes.

---

### Menu ESC

Pendant le jeu :

```text
CHARACTER
EQUIPMENT
INVENTORY
CHARACTERISTICS
SAVE
LOAD
SETTINGS
CONTROLS
```

---

### Inventaire

Le jeu doit avoir un inventaire avec un nombre de slots limité.

Exemple :

```text
┌────┬────┬────┬────┐
│    │    │    │    │
├────┼────┼────┼────┤
│    │    │    │    │
├────┼────┼────┼────┤
│    │    │    │    │
└────┴────┴────┴────┘
```

Le nombre de slots doit être défini avec l'équipe.

---

### Sauvegarde

L'interface doit permettre :

```text
SAVE
LOAD
RESUME
```

La sauvegarde doit conserver l'état nécessaire du jeu.

---

### Boutons

Les boutons doivent avoir au minimum trois états :

```text
NORMAL
HOVER
PRESSED
```

---

## 🤝 Dépendances

Marie-Joseph travaille avec :

- Yvan → architecture et scènes ;
- Ascaell → statistiques ;
- Paul → combat ;
- Carmella → informations des quêtes et NPC.

---

## ❌ Marie-Joseph ne doit pas

- gérer la logique du combat ;
- gérer les déplacements ;
- modifier les statistiques directement ;
- écrire les quêtes ;
- mélanger toute la logique du jeu dans les fichiers UI.

---

## ✅ Sa partie est terminée lorsque

- le menu principal fonctionne ;
- le menu ESC fonctionne ;
- les settings fonctionnent ;
- l'inventaire est affiché ;
- les caractéristiques sont affichées ;
- Save / Load sont accessibles ;
- les boutons possèdent leurs états ;
- l'interface est claire et cohérente avec l'univers.

---

# 🟡 7. CARMELLA — WORLD / STORY / NPC / QUESTS

## 🎯 Mission principale

Carmella est responsable du monde du jeu, de l'histoire, des NPC et des quêtes.

---

## 📂 Dossiers principaux

```text
src/story/
src/world/
assets/maps/
```

---

## 🛠️ Responsabilités

### Monde

Créer les différentes zones :

```text
Village
   ↓
Forêt / territoire extérieur
   ↓
Forteresse
```

Chaque zone peut exister dans :

```text
PASSÉ
FUTUR
```

---

### Histoire

L'histoire suit Flowflow.

Structure générale :

```text
ACTE I
Le futur oublié
      ↓
ACTE II
Retour dans le passé
      ↓
ACTE III
Le conflit final
```

---

### NPC

Créer des NPC utiles à l'histoire.

Ils peuvent :

- parler ;
- donner des informations ;
- donner des quêtes ;
- modifier la progression ;
- apparaître dans différentes époques.

---

### Exemple de NPC

Kaya peut apparaître :

```text
PASSÉ
↓
Jeune guerrière

FUTUR
↓
Première gardienne de la résistance
```

Cela permet de montrer les conséquences du voyage dans le temps.

---

### Quêtes

Le jeu doit contenir au moins une quête claire.

Structure possible :

```text
NPC
 ↓
Dialogue
 ↓
Objectif
 ↓
Action du joueur
 ↓
Récompense
 ↓
Progression de l'histoire
```

---

### Voyage temporel

Le joueur peut influencer certains événements.

Une modification du passé peut provoquer une modification du futur.

---

## 🤝 Dépendances

Carmella travaille avec :

- Yvan → intégration du monde ;
- Paul → ennemis et boss liés à l'histoire ;
- Ascaell → interactions du joueur ;
- Marie-Joseph → dialogues et quêtes affichés dans l'UI.

---

## ❌ Carmella ne doit pas

- gérer le moteur principal ;
- écrire le système de combat ;
- coder toute l'interface ;
- gérer les statistiques du joueur ;
- modifier les systèmes des autres membres sans coordination.

---

## ✅ Sa partie est terminée lorsque

- les zones principales existent ;
- les NPC sont intégrés ;
- les dialogues fonctionnent ;
- une quête complète fonctionne ;
- l'histoire possède un début ;
- l'histoire possède une fin ;
- le passé et le futur sont cohérents.

---

# 🔗 8. COMMUNICATION ENTRE LES MODULES

```text
                    ┌───────────────┐
                    │     YVAN      │
                    │ CORE / ENGINE │
                    └───────┬───────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
     ┌─────────┐      ┌──────────┐      ┌─────────┐
     │ ASCAELL │      │   PAUL   │      │ CARMELLA│
     │ PLAYER  │      │  COMBAT  │      │  STORY  │
     └────┬────┘      └────┬─────┘      └────┬────┘
          │                │                 │
          └────────────────┼─────────────────┘
                           ▼
                    ┌──────────────┐
                    │ MARIE-JOSEPH │
                    │      UI      │
                    └──────────────┘
```

---

# 🧩 9. RÈGLES DE DÉVELOPPEMENT

## Règle 1 — Ne pas travailler directement sur `main`

Toujours utiliser sa branche personnelle.

---

## Règle 2 — Ne pas modifier le travail d'un autre membre sans prévenir

Si une modification est nécessaire :

1. prévenir le membre concerné ;
2. expliquer pourquoi ;
3. modifier seulement ce qui est nécessaire ;
4. communiquer le changement.

---

## Règle 3 — Garder les fonctions simples

Une fonction doit avoir une responsabilité claire.

Éviter les fonctions qui font tout le jeu.

---

## Règle 4 — Garder le code lisible

Utiliser :

- des noms clairs ;
- une indentation correcte ;
- des fonctions courtes ;
- des fichiers organisés.

---

## Règle 5 — Tester avant de faire une Pull Request

Avant :

```text
git push
```

faire au minimum :

```text
Compilation
Tests
Vérification du fonctionnement
```

---

# 📝 10. CONVENTION DES COMMITS

Utiliser des commits simples et explicites.

| Préfixe | Utilisation |
|---|---|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `refactor:` | Réorganisation du code |
| `docs:` | Documentation |
| `chore:` | Maintenance |

### Exemples

```text
feat: add player movement
```

```text
feat: add enemy combat
```

```text
fix: prevent player from crossing walls
```

```text
docs: update team responsibilities
```

---

# ✅ 11. CHECKLIST AVANT DE DIRE "TERMINÉ"

Chaque membre doit vérifier :

```text
[ ] Ma fonctionnalité compile
[ ] Ma fonctionnalité fonctionne
[ ] Je n'ai pas cassé une autre partie
[ ] Mon code est lisible
[ ] Les fichiers sont au bon endroit
[ ] J'ai testé les cas importants
[ ] Mon commit est clair
[ ] Ma branche est à jour
[ ] Ma Pull Request explique ce qui a été fait
```

---

# 🤝 12. RÈGLE DE COLLABORATION

Une fonctionnalité n'est pas réellement terminée simplement parce que le code existe.

Elle est terminée lorsque :

```text
CODE
 ↓
TEST
 ↓
INTÉGRATION
 ↓
TEST GLOBAL
 ↓
VALIDATION
```

---

# 🚦 13. PRIORITÉS DU PROJET

Le développement suit obligatoirement cet ordre :

```text
MUST
 ↓
SHOULD
 ↓
COULD
```

On ne commence pas à développer les éléments `COULD` tant que les éléments `MUST` ne sont pas suffisamment avancés.

---

## 🔴 MUST

Les éléments obligatoires du sujet :

- caractéristiques ;
- combats basés sur les caractéristiques ;
- inventaire limité ;
- XP ;
- niveaux ;
- amélioration des caractéristiques ;
- NPC ;
- quête ;
- tutoriel ;
- collisions ;
- caméra ;
- profondeur / projection / isométrie ;
- boutons avec trois états ;
- sauvegarde ;
- chargement ;
- menu principal ;
- menu ESC ;
- settings ;
- contrôles ;
- animations ;
- début et fin du jeu.

---

## 🟠 SHOULD

Fonctionnalités importantes pour améliorer le jeu :

- plusieurs types d'ennemis ;
- boss ;
- plusieurs zones ;
- voyage temporel ;
- dialogues avancés ;
- effets visuels ;
- particules ;
- meilleure interface ;
- ambiance sonore.

---

## 🟢 COULD

Fonctionnalités bonus si le temps le permet :

- arbre de compétences ;
- éditeur de map ;
- système de particules avancé ;
- scripts d'entités ;
- effets supplémentaires ;
- fonctionnalités secondaires.

---

# 🎯 14. OBJECTIF FINAL

Le but n'est pas de créer le plus gros RPG possible.

Le but est de créer un jeu :

```text
PETIT
  +
COMPLET
  +
COHÉRENT
  +
POLI
  +
JOUABLE
```

Le joueur doit comprendre :

```text
QUI JE SUIS
      ↓
POURQUOI JE SUIS LÀ
      ↓
CE QUE JE DOIS FAIRE
      ↓
COMMENT JOUER
      ↓
CE QUE MES ACTIONS CHANGENT
      ↓
COMMENT L'HISTOIRE SE TERMINE
```

> **AVANT L'OUBLI doit être un petit RPG terminé et maîtrisé par toute l'équipe, pas une grosse démo inachevée.**
