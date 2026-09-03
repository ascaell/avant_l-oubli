/*
** AVANT L'OUBLI - Core
** clock.c : mesure du delta_time via raylib
*/

#include "clock.h"
#include "raylib.h"

void clock_init(clock_t_s *clock)
{
    clock->delta = 0.0f;
    clock->elapsed = 0.0;
}

void clock_update(clock_t_s *clock)
{
    clock->delta = GetFrameTime();
    clock->elapsed = GetTime();
}

float clock_delta(const clock_t_s *clock)
{
    return clock->delta;
}

double clock_elapsed(const clock_t_s *clock)
{
    return clock->elapsed;
}

int clock_fps(void)
{
    return GetFPS();
}
