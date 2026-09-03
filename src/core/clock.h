/*
** AVANT L'OUBLI - Core
** clock.h : temps et delta_time independant du framerate
*/

#ifndef CLOCK_H
    #define CLOCK_H

typedef struct clock_s {
    float delta;
    double elapsed;
} clock_t_s;

void clock_init(clock_t_s *clock);
void clock_update(clock_t_s *clock);
float clock_delta(const clock_t_s *clock);
double clock_elapsed(const clock_t_s *clock);
int clock_fps(void);

#endif /* CLOCK_H */
