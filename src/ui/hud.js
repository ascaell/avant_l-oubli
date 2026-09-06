/*
** EPITECH PROJECT, 2026
** avant_l-oubli
** File description:
** hud.js
*/

const COLOR = {
    barBg: '#171C24',
    barBorder: '#E6B85C',
    hpFill: '#B85C38',
    xpFill: '#E6B85C',
    text: '#E8C99B',
};

const HP_BAR_W = 200;
const HP_BAR_H = 20;
const XP_BAR_W = 200;
const XP_BAR_H = 8;
const MARGIN = 20;

function defaultData() {
    return { hp: 100, maxHp: 100, level: 1, xp: 0, xpToNext: 100 };
}

export class Hud {
    constructor() {
        this.data = defaultData();
    }

    setData(data) {
        this.data = { ...defaultData(), ...data };
    }

    update(dt) {
    }

    render(ctx) {
        const { hp, maxHp, level, xp, xpToNext } = this.data;

        this.renderBar(ctx, MARGIN, MARGIN, HP_BAR_W, HP_BAR_H, hp / maxHp, COLOR.hpFill);
        this.renderBar(ctx, MARGIN, MARGIN + HP_BAR_H + 8, XP_BAR_W, XP_BAR_H, xp / xpToNext, COLOR.xpFill);

        ctx.fillStyle = COLOR.text;
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`PV ${hp}/${maxHp}`, MARGIN + HP_BAR_W + 10, MARGIN + HP_BAR_H / 2);
        ctx.fillText(`Niveau ${level}`, MARGIN, MARGIN + HP_BAR_H + 8 + XP_BAR_H + 16);
    }

    renderBar(ctx, x, y, w, h, ratio, fillColor) {
        const clamped = Math.max(0, Math.min(1, ratio));

        ctx.fillStyle = COLOR.barBg;
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w * clamped, h);

        ctx.strokeStyle = COLOR.barBorder;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, w, h);
    }
}
