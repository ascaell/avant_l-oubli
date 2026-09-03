/*
** AVANT L'OUBLI - Player
** player.c : Flowflow, deplacement clavier delta-time
*/

#include <stdlib.h>
#include "raylib.h"
#include "player.h"

#define PLAYER_START_X 640.0f
#define PLAYER_START_Y 360.0f
#define PLAYER_SPEED 200.0f
#define PLAYER_SIZE 32

static void player_init_stats(player_stats_t *stats)
{
    stats->hp = 20;
    stats->hp_max = 20;
    stats->attack = 5;
    stats->defense = 2;
    stats->level = 1;
    stats->xp = 0;
    stats->xp_to_next = 30;
}

player_t *player_create(void)
{
    player_t *player = malloc(sizeof(*player));

    if (player == NULL)
        return NULL;
    player->x = PLAYER_START_X;
    player->y = PLAYER_START_Y;
    player->speed = PLAYER_SPEED;
    player_init_stats(&player->stats);
    return player;
}

static void player_read_input(float *dx, float *dy)
{
    *dx = 0.0f;
    *dy = 0.0f;
    if (IsKeyDown(KEY_W) || IsKeyDown(KEY_UP))
        *dy -= 1.0f;
    if (IsKeyDown(KEY_S) || IsKeyDown(KEY_DOWN))
        *dy += 1.0f;
    if (IsKeyDown(KEY_A) || IsKeyDown(KEY_LEFT))
        *dx -= 1.0f;
    if (IsKeyDown(KEY_D) || IsKeyDown(KEY_RIGHT))
        *dx += 1.0f;
}

void player_update(void *data, const module_context_t *ctx)
{
    player_t *player = data;
    float dx = 0.0f;
    float dy = 0.0f;

    if (player == NULL || ctx == NULL)
        return;
    player_read_input(&dx, &dy);
    player->x += dx * player->speed * ctx->delta;
    player->y += dy * player->speed * ctx->delta;
}

void player_render(void *data, const module_context_t *ctx)
{
    const player_t *player = data;

    (void)ctx;
    if (player == NULL)
        return;
    DrawRectangle((int)player->x - PLAYER_SIZE / 2,
        (int)player->y - PLAYER_SIZE / 2,
        PLAYER_SIZE, PLAYER_SIZE, RED);
}

void player_destroy(void *data)
{
    free(data);
}

float player_get_x(const player_t *player)
{
    return player->x;
}

float player_get_y(const player_t *player)
{
    return player->y;
}

const player_stats_t *player_get_stats(const player_t *player)
{
    return &player->stats;
}