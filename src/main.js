import { Game } from './core/game.js';
import { Input } from './core/input.js';
import { Camera } from './core/camera.js';
import { Assets } from './core/assets.js';
import { SaveSystem } from './core/save.js';

// Une seule instance de chaque système Core.
const game = new Game();
const input = new Input();
const camera = new Camera();
const assets = new Assets();
const save = new SaveSystem();

// Branchement des systèmes sur l'orchestrateur.
game.systems.input = input;
game.systems.camera = camera;
game.systems.assets = assets;
game.systems.save = save;

// Player, World, Combat et UI restent null pour cette V1.

// Démarrage.
game.init();
game.start();

// --- Vérification console ---
console.log('[Core] initialisé.');
console.log('[Core] systèmes branchés :', {
    input: game.systems.input !== null,
    camera: game.systems.camera !== null,
    assets: game.systems.assets !== null,
    save: game.systems.save !== null,
    player: game.systems.player,   // null attendu
    world: game.systems.world,    // null attendu
    combat: game.systems.combat,   // null attendu
    ui: game.systems.ui,       // null attendu
});
console.log('[Core] état du jeu :', game.state);