/*
** AVANT L'OUBLI - Core
** events.h : collecte centralisee clavier / souris / fermeture
*/

#ifndef EVENTS_H
    #define EVENTS_H

    #include <stdbool.h>

typedef struct events_s {
    bool quit_requested;
    bool toggle_pause;
    bool toggle_fullscreen;
    float mouse_x;
    float mouse_y;
    bool mouse_left;
    bool mouse_right;
} events_t;

void events_init(events_t *events);
void events_poll(events_t *events);

#endif /* EVENTS_H */
