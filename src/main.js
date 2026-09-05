import { Player } from './player/player.js';
import './core/input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const player = new Player(canvas.width / 2, canvas.height / 2);
let lastTime = 0;

function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    player.update(dt);
    player.render(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);