import { Game } from './core/game.js';
import { Input } from './core/input.js';
import { Camera } from './core/camera.js';
import { Assets } from './core/assets.js';
import { SaveSystem } from './core/save.js';
import { Display } from './core/display.js';

const canvas = document.getElementById('game');

const display = new Display(canvas);

const game = new Game(canvas);

const input = new Input();

const camera = new Camera();
camera.setPosition(100, 0);

const assets = new Assets();
const save = new SaveSystem();

game.systems.display = display;
game.systems.input = input;
game.systems.camera = camera;
game.systems.assets = assets;
game.systems.save = save;

game.init();
game.start();

console.log('[Core] initialisé.');

console.log('[Core] systèmes branchés :', {
    display: game.systems.display !== null,
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