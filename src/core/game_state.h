/*
** AVANT L'OUBLI - Core
** game_state.h : etats du jeu et transitions
*/

#ifndef GAME_STATE_H
    #define GAME_STATE_H

    #include <stdbool.h>

typedef enum game_state_e {
    GAME_MENU = 0,
    GAME_PLAYING,
    GAME_PAUSE,
    GAME_SETTINGS,
    GAME_CHARACTER,
    GAME_INVENTORY,
    GAME_GAME_OVER,
    GAME_VICTORY,
    GAME_QUIT
} game_state_e;

typedef struct game_state_s {
    game_state_e current;
    game_state_e previous;
} game_state_t;

void game_state_init(game_state_t *state);
void game_state_set(game_state_t *state, game_state_e next);
bool game_state_is(const game_state_t *state, game_state_e value);
const char *game_state_name(game_state_e value);

#endif /* GAME_STATE_H */
