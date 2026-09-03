export class Input {
    constructor() {
        // Clavier
        this.keysDown = new Set();      // touches actuellement maintenues
        this.keysPressed = new Set();   // touches pressées CETTE frame (one-shot)
        this.keysReleased = new Set();  // touches relâchées CETTE frame (one-shot)

        // Souris
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseButtonsDown = new Set();
        this.mouseButtonsPressed = new Set();
        this.mouseButtonsReleased = new Set();

        this._installListeners();
    }

    _installListeners() {
        window.addEventListener('keydown', (e) => {
            // Ignore le key repeat du navigateur : si déjà maintenue, ce n'est
            // pas une nouvelle pression.
            if (this.keysDown.has(e.key)) return;
            this.keysDown.add(e.key);
            this.keysPressed.add(e.key);
        });

        window.addEventListener('keyup', (e) => {
            this.keysDown.delete(e.key);
            this.keysReleased.add(e.key);
        });

        window.addEventListener('mousedown', (e) => {
            if (this.mouseButtonsDown.has(e.button)) return;
            this.mouseButtonsDown.add(e.button);
            this.mouseButtonsPressed.add(e.button);
        });

        window.addEventListener('mouseup', (e) => {
            this.mouseButtonsDown.delete(e.button);
            this.mouseButtonsReleased.add(e.button);
        });

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    // --- Clavier ---
    isKeyDown(key) {
        return this.keysDown.has(key);
    }

    isKeyPressed(key) {
        return this.keysPressed.has(key);
    }

    isKeyReleased(key) {
        return this.keysReleased.has(key);
    }

    // --- Souris ---
    isMouseButtonDown(button) {
        return this.mouseButtonsDown.has(button);
    }

    isMouseButtonPressed(button) {
        return this.mouseButtonsPressed.has(button);
    }

    isMouseButtonReleased(button) {
        return this.mouseButtonsReleased.has(button);
    }

    getMousePosition() {
        return { x: this.mouseX, y: this.mouseY };
    }

    // --- Reset des états one-shot ---
    // À appeler une fois par frame. Vide les événements "cette frame" pour
    // qu'ils ne restent pas vrais sur plusieurs frames.
    update() {
        this.keysPressed.clear();
        this.keysReleased.clear();
        this.mouseButtonsPressed.clear();
        this.mouseButtonsReleased.clear();
    }
}