/*
** AVANT L'OUBLI - Core
** events.c : lecture des entrees raylib vers une struct neutre
*/

#include "events.h"
#include "raylib.h"

void events_init(events_t *events)
{
    events->quit_requested = false;
    events->toggle_pause = false;
    events->toggle_fullscreen = false;
    events->mouse_x = 0.0f;
    events->mouse_y = 0.0f;
    events->mouse_left = false;
    events->mouse_right = false;
}

void events_poll(events_t *events)
{
    Vector2 mouse = GetMousePosition();

    events->quit_requested = WindowShouldClose();
    events->toggle_pause = IsKeyPressed(KEY_ESCAPE);
    events->toggle_fullscreen = IsKeyPressed(KEY_F11);
    events->mouse_x = mouse.x;
    events->mouse_y = mouse.y;
    events->mouse_left = IsMouseButtonDown(MOUSE_BUTTON_LEFT);
    events->mouse_right = IsMouseButtonDown(MOUSE_BUTTON_RIGHT);
}
