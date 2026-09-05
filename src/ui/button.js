/*
** EPITECH PROJECT, 2026
** avant_l-oubli
** File description:
** button.js
*/

import { getMouse } from '../core/input.js';

const COLOR = {
    normal: '#B85C38',
    hover: '#D99A45',
    pressed: '#8E4228',
    disabled: '#59636E',
    border: '#E6B85C',
    text: '#E8C99B',
    textDisabled: '#7A858F',
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
        this._wasDown = false;
    }

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

        const mouse = getMouse();

        if (!this._contains(mouse.x, mouse.y)) {
            this.state = 'normal';
            this._wasDown = false;
            return;
        }

        this.state = mouse.down ? 'pressed' : 'hover';

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
