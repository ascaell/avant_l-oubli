# TECHNIQUE

## Architecture
src/core       moteur / boucle / utilitaires
src/player     Flowflow
src/combat     ennemis / dégâts / boss
src/world      cartes / collisions / caméra
src/ui         menus / HUD / inventaire
src/story      PNJ / dialogues / quêtes
src/save       sauvegarde / chargement

## Framerate
Les animations et mouvements doivent être indépendants du framerate.

## Camera
Prévoir :
- translation
- zoom
- rotation

## Collisions
Prévoir collisions entre éléments mobiles et statiques avec formes différentes.

## Sauvegarde
Tester :
1. lancer
2. jouer
3. sauvegarder
4. quitter
5. relancer
6. charger/reprendre

## Configuration
Les réglages doivent être centralisés et modifiables sans casser le jeu.
