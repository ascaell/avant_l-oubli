/*
** AVANT L'OUBLI - Core
** scene.c : suivi de la zone courante
*/

#include "scene.h"

static const char *g_place_names[] = {"VILLAGE", "FOREST", "FORTRESS"};
static const char *g_era_names[] = {"PAST", "FUTURE"};

void scene_init(scene_t *scene)
{
    scene->place = SCENE_VILLAGE;
    scene->era = ERA_PAST;
}

void scene_set(scene_t *scene, scene_place_e place, scene_era_e era)
{
    scene->place = place;
    scene->era = era;
}

void scene_toggle_era(scene_t *scene)
{
    if (scene->era == ERA_PAST)
        scene->era = ERA_FUTURE;
    else
        scene->era = ERA_PAST;
}

const char *scene_place_name(scene_place_e place)
{
    if (place < SCENE_VILLAGE || place > SCENE_FORTRESS)
        return "UNKNOWN";
    return g_place_names[place];
}

const char *scene_era_name(scene_era_e era)
{
    if (era < ERA_PAST || era > ERA_FUTURE)
        return "UNKNOWN";
    return g_era_names[era];
}
