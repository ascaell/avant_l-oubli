/*
** AVANT L'OUBLI - Core
** game.h : chef d'orchestre, possede tous les sous-systemes
*/

#ifndef GAME_H
#define GAME_H

#include "camera.h"
#include "clock.h"
#include "events.h"
#include "game_state.h"
#include "modules.h"
#include "scene.h"
#include "window.h"

typedef struct game_s {
  window_t window;
  game_state_t state;
  clock_t_s clock;
  events_t events;
  game_camera_t camera;
  scene_t scene;
  modules_t modules;
  bool running;
} game_t;

void game_init(game_t *game);
void game_run(game_t *game);
void game_cleanup(game_t *game);

#endif /* GAME_H */
