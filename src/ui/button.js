// ============================================================
//  AVANT L'OUBLI — src/ui/button.js
//  Responsable : Marie-Joseph · Branche : feature/ui
//
//  Bouton Canvas réutilisable : 3 états (normal / hover / pressed).
//  Utilisé par menu.js, hud.js, dialog.js, settings.js.
// ============================================================

import { getMouse } from '../core/input.js';

const COLOR = {
    normal: '#B85C38',    // terracotta
    hover: '#D99A45',     // ocre
    pressed: '#8E4228',   // terracotta assombri
    disabled: '#59636E',  // gris froid (futur)
    border: '#E6B85C',    // doré
    text: '#E8C99B',      // beige
    textDisabled: '#7A858F', // gris acier
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
        this.disabled = false;
        this._wasDown = false; // état de la souris à la frame précédente, pour détecter le clic
    }

    /** Vrai si (px, py) tombe dans le rectangle du bouton. */
    _contains(px, py) {
        return px >= this.x && px <= this.x + this.w
            && py >= this.y && py <= this.y + this.h;
    }

    setDisabled(disabled) {
        this.disabled = disabled;
    }

    update() {
        if (this.disabled) {
            this.state = 'disabled';
            return;
        }

        const mouse = getMouse(); // { x, y, down }

        if (!this._contains(mouse.x, mouse.y)) {
            this.state = 'normal';
            this._wasDown = false;
            return;
        }

        this.state = mouse.down ? 'pressed' : 'hover';

        // "Clic" = transition relâché → maintenu, détectée nous-mêmes puisque
        // getMouse() ne donne que l'état courant (pas de "pressed" one-shot).
        if (!this._wasDown && mouse.down && this.onClick) {
            this.onClick();
        }
        this._wasDown = mouse.down;
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = COLOR[this.state];
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.strokeStyle = COLOR.border;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = this.disabled ? COLOR.textDisabled : COLOR.text;
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.label, this.x + this.w / 2, this.y + this.h / 2);

        ctx.restore();
    }
}
