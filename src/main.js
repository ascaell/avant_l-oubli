import { Game } from './core/game.js';
import { Input } from './core/input.js';
import { Camera } from './core/camera.js';
import { Assets } from './core/assets.js';
import { SaveSystem } from './core/save.js';

// Récupération du Canvas.
const canvas = document.getElementById('game');

// Taille temporaire du Canvas.
canvas.width = 800;
canvas.height = 600;

// Création du moteur.
const game = new Game(canvas);

// Création des systèmes Core.
const input = new Input();

const camera = new Camera();
camera.setPosition(100, 0);

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

// Vérification console.
console.log('[Core] initialisé.');

console.log('[Core] systèmes branchés :', {
    input: game.systems.input !== null,
    camera: game.systems.camera !== null,
    assets: game.systems.assets !== null,
    save: game.systems.save !== null,
    player: game.systems.player,
    world: game.systems.world,
    combat: game.systems.combat,
    ui: game.systems.ui,
});

console.log('[Core] Canvas :', game.canvas);
console.log('[Core] état du jeu :', game.state);