export class Camera {
    constructor() {
        // Valeurs initiales conservées pour reset().
        this._initial = { x: 0, y: 0, zoom: 1, rotation: 0 };

        this.x = this._initial.x;
        this.y = this._initial.y;
        this.zoom = this._initial.zoom;       // facteur d'échelle, toujours > 0
        this.rotation = this._initial.rotation; // en radians
    }

    // --- Position ---
    setPosition(x, y) {
        if (!this._isValidNumber(x) || !this._isValidNumber(y)) return;
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        if (!this._isValidNumber(dx) || !this._isValidNumber(dy)) return;
        this.x += dx;
        this.y += dy;
    }

    // --- Translation ---
    // Même effet qu'un déplacement, exposé séparément par intention (décalage
    // de vue). Réutilise move() pour éviter la duplication.
    translate(dx, dy) {
        this.move(dx, dy);
    }

    // --- Zoom ---
    // Protégé : jamais nul, négatif ou invalide.
    setZoom(zoom) {
        if (!this._isValidNumber(zoom) || zoom <= 0) return;
        this.zoom = zoom;
    }

    zoomIn(amount) {
        if (!this._isValidNumber(amount)) return;
        this.setZoom(this.zoom + amount);
    }

    zoomOut(amount) {
        if (!this._isValidNumber(amount)) return;
        this.setZoom(this.zoom - amount);
    }

    // --- Rotation (radians) ---
    setRotation(rotation) {
        if (!this._isValidNumber(rotation)) return;
        this.rotation = rotation;
    }

    rotate(amount) {
        if (!this._isValidNumber(amount)) return;
        this.rotation += amount;
    }

    // --- État ---
    // Retourne une copie : l'état interne ne peut pas être muté de l'extérieur.
    getState() {
        return {
            x: this.x,
            y: this.y,
            zoom: this.zoom,
            rotation: this.rotation,
        };
    }

    // --- Reset ---
    reset() {
        this.x = this._initial.x;
        this.y = this._initial.y;
        this.zoom = this._initial.zoom;
        this.rotation = this._initial.rotation;
    }

    // --- Utilitaire interne ---
    _isValidNumber(value) {
        return typeof value === 'number' && Number.isFinite(value);
    }
}