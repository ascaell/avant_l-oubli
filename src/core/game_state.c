/*
** AVANT L'OUBLI - Core
** game_state.c : gestion des transitions d'etat
*/

#include "game_state.h"

static const char *g_state_names[] = {
    "MENU", "PLAYING", "PAUSE", "SETTINGS", "CHARACTER",
    "INVENTORY", "GAME_OVER", "VICTORY", "QUIT"
};

void game_state_init(game_state_t *state)
{
    state->current = GAME_MENU;
    state->previous = GAME_MENU;
}

void game_state_set(game_state_t *state, game_state_e next)
{
    if (state->current == next)
        return;
    state->previous = state->current;
    state->current = next;
}

bool game_state_is(const game_state_t *state, game_state_e value)
{
    return state->current == value;
}

const char *game_state_name(game_state_e value)
{
    if (value < GAME_MENU || value > GAME_QUIT)
        return "UNKNOWN";
    return g_state_names[value];
}
