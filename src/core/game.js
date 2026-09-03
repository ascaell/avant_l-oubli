export const GameState = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
};

export class Game {
    constructor() {
        this.state = GameState.MENU;
        this.running = false;
        this.rafId = null;
        this.lastTime = 0;

        // Slots des systèmes, branchés plus tard. game.js ne connaît pas leur logique.
        this.systems = {
            input: null,
            camera: null,
            assets: null,
            player: null,
            world: null,
            combat: null,
            ui: null,
            save: null,
        };
    }

    init() {
        // Point d'entrée pour brancher les systèmes une fois disponibles.
        // Ex. plus tard : this.systems.input = new Input();
        this.changeState(GameState.MENU);
    }

    start() {
        if (this.running) return; // empêche plusieurs boucles simultanées
        this.running = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }

    stop() {
        this.running = false;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    changeState(state) {
        if (!Object.values(GameState).includes(state)) return;
        this.state = state;
    }

    loop(timestamp) {
        if (!this.running) return;

        const deltaTime = (timestamp - this.lastTime) / 1000; // en secondes
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();

        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }

    update(deltaTime) {
        switch (this.state) {
            case GameState.PLAYING:
                // Dispatch vers les systèmes une fois branchés :
                // this.systems.player?.update(deltaTime);
                // this.systems.world?.update(deltaTime);
                // this.systems.combat?.update(deltaTime);
                // this.systems.ui?.update(deltaTime);
                break;
            case GameState.PAUSED:
                // this.systems.ui?.update(deltaTime);
                break;
            case GameState.MENU:
                // this.systems.ui?.update(deltaTime);
                break;
        }
    }

    render() {
        switch (this.state) {
            case GameState.PLAYING:
                // this.systems.world?.render();
                // this.systems.player?.render();
                // this.systems.ui?.render();
                break;
            case GameState.PAUSED:
            case GameState.MENU:
                // this.systems.ui?.render();
                break;
        }
    }
}