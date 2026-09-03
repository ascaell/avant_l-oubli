/*
** AVANT L'OUBLI
** main.c : point d'entree du programme
*/

#include "core/game.h"

int main(void)
{
    game_t game;

    game_init(&game);
    game_run(&game);
    game_cleanup(&game);
    return 0;
}
