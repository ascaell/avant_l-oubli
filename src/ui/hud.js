// ============================================================
//  AVANT L'OUBLI — src/ui/hud.js
//  Responsable : Marie-Joseph · Branche : feature/ui
//
//  Affichage pendant le jeu : PV, niveau, XP.
//  Ne connaît pas Player/Stats : reçoit juste des nombres via setData().
// ============================================================

const COLOR = {
    barBg: '#171C24',      // fond de barre (noir bleuté)
    barBorder: '#E6B85C',  // doré
    hpFill: '#B85C38',     // terracotta
    xpFill: '#E6B85C',     // doré
    text: '#E8C99B',       // beige
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

    /** À appeler par l'intégrateur avec les stats du joueur : { hp, maxHp, level, xp, xpToNext } */
    setData(data) {
        this.data = { ...defaultData(), ...data };
    }

    update(dt) {
        // Rien à animer pour l'instant ; la méthode existe pour garder
        // la même interface (update/render) que les autres systèmes.
    }

    render(ctx) {
        const { hp, maxHp, level, xp, xpToNext } = this.data;

        this._renderBar(ctx, MARGIN, MARGIN, HP_BAR_W, HP_BAR_H, hp / maxHp, COLOR.hpFill);
        this._renderBar(ctx, MARGIN, MARGIN + HP_BAR_H + 8, XP_BAR_W, XP_BAR_H, xp / xpToNext, COLOR.xpFill);

        ctx.fillStyle = COLOR.text;
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`PV ${hp}/${maxHp}`, MARGIN + HP_BAR_W + 10, MARGIN + HP_BAR_H / 2);
        ctx.fillText(`Niveau ${level}`, MARGIN, MARGIN + HP_BAR_H + 8 + XP_BAR_H + 16);
    }

    /** Dessine une barre de fond + un remplissage proportionnel à `ratio` (0..1). */
    _renderBar(ctx, x, y, w, h, ratio, fillColor) {
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
