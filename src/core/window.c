/*
** AVANT L'OUBLI - Core
** window.c : creation, resolutions, fullscreen
*/

#include "window.h"
#include "raylib.h"

static const resolution_t g_resolutions[] = {
    {1920, 1080},
    {1280, 720}
};

int window_resolution_count(void)
{
    return (int)(sizeof(g_resolutions) / sizeof(g_resolutions[0]));
}

resolution_t window_resolution_get(int index)
{
    if (index < 0 || index >= window_resolution_count())
        index = 0;
    return g_resolutions[index];
}

void window_init(window_t *win, int res_index, const char *title)
{
    win->current = window_resolution_get(res_index);
    win->fullscreen = false;
    win->title = title;
    InitWindow(win->current.width, win->current.height, title);
}

void window_destroy(window_t *win)
{
    (void)win;
    if (IsWindowReady())
        CloseWindow();
}

void window_set_resolution(window_t *win, int index)
{
    win->current = window_resolution_get(index);
    SetWindowSize(win->current.width, win->current.height);
}

void window_toggle_fullscreen(window_t *win)
{
    win->fullscreen = !win->fullscreen;
    ToggleFullscreen();
}

bool window_should_close(const window_t *win)
{
    (void)win;
    return WindowShouldClose();
}

int window_width(const window_t *win)
{
    return win->current.width;
}

int window_height(const window_t *win)
{
    return win->current.height;
}
