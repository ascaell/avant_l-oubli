/*
** AVANT L'OUBLI - Core
** camera.c : wrapper autour de Camera2D
*/

#include "camera.h"

void camera_init(game_camera_t *camera, int screen_width, int screen_height)
{
    camera->cam.offset = (Vector2){screen_width / 2.0f, screen_height / 2.0f};
    camera->cam.target = (Vector2){0.0f, 0.0f};
    camera->cam.rotation = 0.0f;
    camera->cam.zoom = 1.0f;
}

void camera_destroy(game_camera_t *camera)
{
    (void)camera;
}

void camera_set_target(game_camera_t *camera, float x, float y)
{
    camera->cam.target = (Vector2){x, y};
}

void camera_move(game_camera_t *camera, float dx, float dy)
{
    camera->cam.target.x += dx;
    camera->cam.target.y += dy;
}

void camera_set_zoom(game_camera_t *camera, float zoom)
{
    if (zoom < 0.1f)
        zoom = 0.1f;
    camera->cam.zoom = zoom;
}

void camera_set_rotation(game_camera_t *camera, float degrees)
{
    camera->cam.rotation = degrees;
}

void camera_apply(const game_camera_t *camera)
{
    BeginMode2D(camera->cam);
}

void camera_stop(void)
{
    EndMode2D();
}
