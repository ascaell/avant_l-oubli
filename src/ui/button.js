// ============================================================
//  AVANT L'OUBLI — src/ui/button.js
//  Responsable : Marie-Joseph · Branche : feature/ui
//
//  Bouton Canvas réutilisable : 3 états (normal / hover / pressed).
//  Utilisé par menu.js, hud.js, dialog.js, settings.js.
// ============================================================

const COLOR = {
    normal: '#B85C38',   // terracotta
    hover: '#D99A45',    // ocre
    pressed: '#8E4228',  // terracotta assombri
    border: '#E6B85C',   // doré
    text: '#E8C99B',     // beige
};

export class Button {
    constructor(x, y, w, h, label, onClick) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.label = label;
        this.onClick = onClick;
        this.state = 'normal';
    }

    /** Vrai si (px, py) tombe dans le rectangle du bouton. */
    _contains(px, py) {
        return px >= this.x && px <= this.x + this.w
            && py >= this.y && py <= this.y + this.h;
    }

    update(input) {
        const { x: mx, y: my } = input.getMousePosition();

        if (!this._contains(mx, my)) {
            this.state = 'normal';
            return;
        }

        this.state = input.isMouseButtonDown(0) ? 'pressed' : 'hover';

        if (input.isMouseButtonPressed(0) && this.onClick) {
            this.onClick();
        }
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = COLOR[this.state];
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.strokeStyle = COLOR.border;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = COLOR.text;
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.x + this.w / 2, this.y + this.h / 2);

        ctx.restore();
    }
}
