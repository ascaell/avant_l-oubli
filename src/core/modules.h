/*
** AVANT L'OUBLI - Core
** modules.h : interfaces minimales pour les modules coequipiers
**
** Chaque module (world, player, combat, story, ui, save) est branche via
** un pointeur opaque + des pointeurs de fonction. Le Core ne connait PAS
** le contenu de ces modules : il appelle update/render/destroy s'ils
** existent. Un module non fourni (pointeur NULL) est simplement ignore.
**
** Rendu : le monde et les entites se dessinent DANS le repere camera
** (modules_render_world), l'interface se dessine HORS camera
** (modules_render_ui). Le module save ne se rend jamais : c'est de la
** logique de sauvegarde, pas du graphique.
*/

#ifndef MODULES_H
    #define MODULES_H

    #include "clock.h"
    #include "events.h"
    #include "camera.h"
    #include "game_state.h"
    #include "scene.h"

/* Contexte lecture seule passe aux modules a chaque frame. */
typedef struct module_context_s {
    float delta;
    const events_t *events;
    const game_state_t *state;
    const scene_t *scene;
    const game_camera_t *camera;
} module_context_t;

/* Interface generique d'un module. data = etat prive du module. */
typedef struct game_module_s {
    void *data;
    void (*update)(void *data, const module_context_t *ctx);
    void (*render)(void *data, const module_context_t *ctx);
    void (*destroy)(void *data);
} game_module_t;

typedef struct modules_s {
    game_module_t world;
    game_module_t player;
    game_module_t combat;
    game_module_t story;
    game_module_t ui;
    game_module_t save;
} modules_t;

/* Type des callbacks, pour une signature de branchement lisible. */
typedef void (*module_update_fn)(void *data, const module_context_t *ctx);
typedef void (*module_render_fn)(void *data, const module_context_t *ctx);
typedef void (*module_destroy_fn)(void *data);

void modules_init(modules_t *modules);

/*
** Branche un module en un seul appel. N'importe quel callback peut etre
** NULL : le Core ignore ce qui n'est pas fourni. C'est le point d'entree
** que les autres membres utilisent pour connecter leur module au Core.
*/
void module_set(game_module_t *module, void *data,
    module_update_fn update, module_render_fn render,
    module_destroy_fn destroy);

/*
** Point d'integration unique de l'equipe (defini dans modules_setup.c).
** Chaque membre y ajoute UNE ligne module_set(...) pour brancher son
** module. game.c appelle cette fonction sans connaitre les modules :
** un module non branche reste NULL et est ignore par le Core.
*/
void modules_setup(modules_t *modules);

void modules_update(modules_t *modules, const module_context_t *ctx);

/* Rendu du monde et des entites : a appeler DANS le repere camera. */
void modules_render_world(modules_t *modules, const module_context_t *ctx);

/* Rendu de l'interface : a appeler HORS du repere camera. */
void modules_render_ui(modules_t *modules, const module_context_t *ctx);

void modules_destroy(modules_t *modules);

#endif /* MODULES_H */
