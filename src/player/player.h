/*
** AVANT L'OUBLI - Player
** player.h : personnage jouable Flowflow, stats et deplacement
*/

#ifndef PLAYER_H
    #define PLAYER_H

    #include "modules.h"

typedef struct player_stats_s {
    int hp;
    int hp_max;
    int attack;
    int defense;
    int level;
    int xp;
    int xp_to_next;
} player_stats_t;

typedef struct player_s {
    float x;
    float y;
    float speed;
    player_stats_t stats;
} player_t;

/* Alloue et initialise Flowflow avec ses valeurs de depart. */
player_t *player_create(void);

/* Callbacks branches dans modules_setup.c. */
void player_update(void *data, const module_context_t *ctx);
void player_render(void *data, const module_context_t *ctx);
void player_destroy(void *data);

/* Accesseurs publics utilises par combat / save / camera plus tard. */
float player_get_x(const player_t *player);
float player_get_y(const player_t *player);
const player_stats_t *player_get_stats(const player_t *player);

#endif /* PLAYER_H */