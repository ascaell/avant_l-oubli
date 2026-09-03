/*
** AVANT L'OUBLI - Core
** scene.h : zone courante (lieu + epoque), sans le contenu des maps
*/

#ifndef SCENE_H
    #define SCENE_H

typedef enum scene_place_e {
    SCENE_VILLAGE = 0,
    SCENE_FOREST,
    SCENE_FORTRESS
} scene_place_e;

typedef enum scene_era_e {
    ERA_PAST = 0,
    ERA_FUTURE
} scene_era_e;

typedef struct scene_s {
    scene_place_e place;
    scene_era_e era;
} scene_t;

void scene_init(scene_t *scene);
void scene_set(scene_t *scene, scene_place_e place, scene_era_e era);
void scene_toggle_era(scene_t *scene);
const char *scene_place_name(scene_place_e place);
const char *scene_era_name(scene_era_e era);

#endif /* SCENE_H */
