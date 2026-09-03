/*
** AVANT L'OUBLI - Core
** camera.h : abstraction de camera 2D (translation, zoom, rotation)
*/

#ifndef CORE_CAMERA_H
    #define CORE_CAMERA_H

    #include "raylib.h"

typedef struct game_camera_s {
    Camera2D cam;
} game_camera_t;

void camera_init(game_camera_t *camera, int screen_width, int screen_height);
void camera_destroy(game_camera_t *camera);

void camera_set_target(game_camera_t *camera, float x, float y);
void camera_move(game_camera_t *camera, float dx, float dy);
void camera_set_zoom(game_camera_t *camera, float zoom);
void camera_set_rotation(game_camera_t *camera, float degrees);

void camera_apply(const game_camera_t *camera);
void camera_stop(void);

#endif /* CORE_CAMERA_H */
