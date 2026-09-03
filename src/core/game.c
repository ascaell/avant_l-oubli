/*
** AVANT L'OUBLI - Core
** game.c : boucle principale et coordination des sous-systemes
*/

#include "game.h"
#include "raylib.h"

void game_init(game_t *game)
{
    window_init(&game->window, 0, "Avant l'Oubli");
    SetExitKey(KEY_NULL);
    SetTargetFPS(60);
    game_state_init(&game->state);
    clock_init(&game->clock);
    events_init(&game->events);
    camera_init(&game->camera, window_width(&game->window),
        window_height(&game->window));
    scene_init(&game->scene);
    modules_init(&game->modules);
    modules_setup(&game->modules);
    game->running = true;
}

/* Traduit les evenements neutres en transitions d'etat. */
static void game_handle_state(game_t *game)
{
    if (game->events.quit_requested)
        game_state_set(&game->state, GAME_QUIT);
    if (game->events.toggle_fullscreen)
        window_toggle_fullscreen(&game->window);
    if (!game->events.toggle_pause)
        return;
    if (game_state_is(&game->state, GAME_PLAYING))
        game_state_set(&game->state, GAME_PAUSE);
    else if (game_state_is(&game->state, GAME_PAUSE))
        game_state_set(&game->state, GAME_PLAYING);
}

static module_context_t game_make_context(game_t *game)
{
    module_context_t ctx;

    ctx.delta = clock_delta(&game->clock);
    ctx.events = &game->events;
    ctx.state = &game->state;
    ctx.scene = &game->scene;
    ctx.camera = &game->camera;
    return ctx;
}

static void game_update(game_t *game)
{
    module_context_t ctx = game_make_context(game);

    game_handle_state(game);
    if (game_state_is(&game->state, GAME_QUIT))
        game->running = false;
    modules_update(&game->modules, &ctx);
}

static void game_render(game_t *game)
{
    module_context_t ctx = game_make_context(game);

    BeginDrawing();
    ClearBackground(BLACK);
    camera_apply(&game->camera);
    modules_render_world(&game->modules, &ctx);
    camera_stop();
    modules_render_ui(&game->modules, &ctx);
    DrawText(game_state_name(game->state.current), 10, 10, 20, RAYWHITE);
    EndDrawing();
}

void game_run(game_t *game)
{
    while (game->running && !window_should_close(&game->window)) {
        clock_update(&game->clock);
        events_poll(&game->events);
        game_update(game);
        game_render(game);
    }
}

void game_cleanup(game_t *game)
{
    modules_destroy(&game->modules);
    camera_destroy(&game->camera);
    window_destroy(&game->window);
}
