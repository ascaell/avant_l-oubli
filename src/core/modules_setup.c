/*
** AVANT L'OUBLI - Core
** modules_setup.c : point d'integration unique de l'equipe.
**
** C'EST ICI, et nulle part ailleurs, qu'un module se branche au Core.
** game.c n'est jamais modifie pour ajouter un module.
**
** Pour brancher un module :
**   1. inclure son header (ex: #include "world/world.h")
**   2. ajouter UNE ligne module_set(...) ci-dessous
**
** Un module non branche reste NULL : le Core l'ignore proprement.
** Le jeu compile et tourne meme si aucun module n'est encore branche.
**
** Rappels de rendu (voir modules.c) :
**   - world/player/combat/story sont rendus DANS le repere camera
**   - ui est rendu HORS camera
**   - save n'est jamais rendu : passer NULL comme callback render
*/

#include "modules.h"

/*
** Exemple de branchement, a decommenter et adapter quand un module
** existe (ex: le module world dans src/world/) :
**
**   #include "world/world.h"
**
**   module_set(&modules->world,
**       world_create(),      // data opaque du module
**       world_update,        // appele chaque frame (ou NULL)
**       world_render,        // rendu sous camera (ou NULL)
**       world_destroy);      // liberation du data (ou NULL)
**
** Le module save se branche SANS render :
**
**   module_set(&modules->save, save_create(),
**       save_update, NULL, save_destroy);
*/
void modules_setup(modules_t *modules)
{
    (void)modules;
}
