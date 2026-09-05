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
        this.changeState(GameState.MENU);
    }

    start() {
        if (this.running) return;
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

        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();

        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }

    update(deltaTime) {
        switch (this.state) {
            case GameState.PLAYING:
                break;
            case GameState.PAUSED:
                break;
            case GameState.MENU:
                break;
        }

        this.systems.input?.update();
    }

    render() {
        switch (this.state) {
            case GameState.PLAYING:
                break;
            case GameState.PAUSED:
            case GameState.MENU:
                break;
        }
    }
}