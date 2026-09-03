/*
** AVANT L'OUBLI - Core
** window.h : gestion de la fenetre et des resolutions
*/

#ifndef WINDOW_H
    #define WINDOW_H

    #include <stdbool.h>

typedef struct resolution_s {
    int width;
    int height;
} resolution_t;

typedef struct window_s {
    resolution_t current;
    bool fullscreen;
    const char *title;
} window_t;

void window_init(window_t *win, int res_index, const char *title);
void window_destroy(window_t *win);

int window_resolution_count(void);
resolution_t window_resolution_get(int index);
void window_set_resolution(window_t *win, int index);

void window_toggle_fullscreen(window_t *win);
bool window_should_close(const window_t *win);

int window_width(const window_t *win);
int window_height(const window_t *win);

#endif /* WINDOW_H */
