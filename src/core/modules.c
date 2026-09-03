/*
** AVANT L'OUBLI - Core
** modules.c : dispatch neutre vers les modules coequipiers
*/

#include <string.h>
#include "modules.h"

void modules_init(modules_t *modules)
{
    memset(modules, 0, sizeof(*modules));
}

void module_set(game_module_t *module, void *data,
    module_update_fn update, module_render_fn render,
    module_destroy_fn destroy)
{
    module->data = data;
    module->update = update;
    module->render = render;
    module->destroy = destroy;
}

static void module_update_one(game_module_t *mod, const module_context_t *ctx)
{
    if (mod->update != NULL)
        mod->update(mod->data, ctx);
}

static void module_render_one(game_module_t *mod, const module_context_t *ctx)
{
    if (mod->render != NULL)
        mod->render(mod->data, ctx);
}

static void module_destroy_one(game_module_t *mod)
{
    if (mod->destroy != NULL)
        mod->destroy(mod->data);
    mod->data = NULL;
}

void modules_update(modules_t *modules, const module_context_t *ctx)
{
    module_update_one(&modules->world, ctx);
    module_update_one(&modules->player, ctx);
    module_update_one(&modules->combat, ctx);
    module_update_one(&modules->story, ctx);
    module_update_one(&modules->ui, ctx);
    module_update_one(&modules->save, ctx);
}

void modules_render_world(modules_t *modules, const module_context_t *ctx)
{
    module_render_one(&modules->world, ctx);
    module_render_one(&modules->player, ctx);
    module_render_one(&modules->combat, ctx);
    module_render_one(&modules->story, ctx);
}

void modules_render_ui(modules_t *modules, const module_context_t *ctx)
{
    module_render_one(&modules->ui, ctx);
}

void modules_destroy(modules_t *modules)
{
    module_destroy_one(&modules->world);
    module_destroy_one(&modules->player);
    module_destroy_one(&modules->combat);
    module_destroy_one(&modules->story);
    module_destroy_one(&modules->ui);
    module_destroy_one(&modules->save);
}
