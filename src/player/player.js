// ============================================================
//  FLOWFLOW — src/player/player.js
//  Responsable : Ascael · Branche : feature/player
//
//  Sprite procédural Canvas (pas d'image externe).
//  4 directions, animation marche, idle breathing.
//  Design : tunique terracotta, motifs dorés, instrument ancestral.
// ============================================================

import { isKeyDown } from '../core/input.js';

// ── Palette (passé chaud) ───────────────────────────────────
const C = {
    skin: '#C27A4A',
    skinShade: '#9B5E34',
    tunic: '#B85C38',
    tunicDk: '#8E4228',
    tunicLt: '#D4714A',
    sash: '#D99A45',
    gold: '#E6B85C',
    pants: '#6B4226',
    sandals: '#4E2E18',
    hair: '#1A1A1A',
    hairHi: '#333333',
    instrument: '#E6B85C',
    instrDk: '#C49536',
    beads: '#E8C99B',
    shadow: 'rgba(0,0,0,0.22)',
    eye: '#FFFFFF',
    pupil: '#1A1A1A',
};

// ── Dimensions ──────────────────────────────────────────────
const W = 28;          // largeur sprite (unscaled)
const H = 36;          // hauteur sprite (unscaled)
const SCALE = 2;           // rendu ×2
const DW = W * SCALE;
const DH = H * SCALE;
const FDUR = 0.14;        // durée d'une frame de marche (s)
const IDLE_SP = 2.2;         // vitesse breathing idle

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = W;              // hitbox logique
        this.h = 16;             // collision aux pieds
        this.speed = 160;
        this.direction = 'down';
        this.moving = false;
        this.animTimer = 0;
        this.idleTimer = 0;
        this.alive = true;
    }

    /** Hitbox pieds (pour collisions) */
    get hitbox() {
        return {
            x: this.x - this.w / 2,
            y: this.y - this.h,
            w: this.w,
            h: this.h
        };
    }

    update(dt) {
        if (!this.alive) return;

        let dx = 0, dy = 0;
        if (isKeyDown('KeyW') || isKeyDown('ArrowUp')) { dy = -1; this.direction = 'up'; }
        if (isKeyDown('KeyS') || isKeyDown('ArrowDown')) { dy = 1; this.direction = 'down'; }
        if (isKeyDown('KeyA') || isKeyDown('ArrowLeft')) { dx = -1; this.direction = 'left'; }
        if (isKeyDown('KeyD') || isKeyDown('ArrowRight')) { dx = 1; this.direction = 'right'; }

        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0) {
            dx /= len; dy /= len;
            this.moving = true;
            this.animTimer += dt;
        } else {
            this.moving = false;
            this.animTimer = 0;
        }
        this.idleTimer += dt;

        this.x += dx * this.speed * dt;
        this.y += dy * this.speed * dt;
    }

    render(ctx) {
        if (!this.alive) return;
        ctx.save();
        ctx.imageSmoothingEnabled = false;

        const drawX = Math.round(this.x - DW / 2);
        const breath = this.moving ? 0 : Math.sin(this.idleTimer * IDLE_SP) * 1.5;
        const bounce = this.moving ? Math.abs(Math.sin(this.animTimer / FDUR * Math.PI)) * 2 : 0;
        const drawY = Math.round(this.y - DH) - bounce + breath;
        const legSw = this.moving ? Math.sin(this.animTimer / FDUR * Math.PI * 2) * 2 : 0;

        // Ombre
        ctx.fillStyle = C.shadow;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 2, DW * 0.38, DH * 0.08, 0, 0, Math.PI * 2);
        ctx.fill();

        // Sprite
        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.scale(SCALE, SCALE);
        this._draw(ctx, legSw);
        ctx.restore();

        ctx.restore();
    }

    _draw(ctx, legSw) {
        const d = this.direction;
        const u = d === 'up', dn = d === 'down', l = d === 'left', r = d === 'right';
        const cx = W / 2;

        // ── Jambes ──
        ctx.fillStyle = C.pants;
        ctx.fillRect(cx - 5, 24 + legSw * 0.5, 4, 8);
        ctx.fillRect(cx + 1, 24 - legSw * 0.5, 4, 8);
        ctx.fillStyle = C.sandals;
        ctx.fillRect(cx - 5, 31 + legSw * 0.5, 4, 2);
        ctx.fillRect(cx + 1, 31 - legSw * 0.5, 4, 2);

        // ── Tunique ──
        ctx.fillStyle = C.tunic;
        ctx.fillRect(cx - 7, 12, 14, 14);
        ctx.fillStyle = C.tunicDk;
        ctx.fillRect(r ? cx - 7 : cx + 4, 12, 3, 14);
        if (!u) {
            ctx.fillStyle = C.tunicLt;
            ctx.fillRect(r ? cx + 3 : cx - 6, 13, 3, 6);
        }

        // Motifs géométriques
        ctx.fillStyle = C.gold;
        ctx.fillRect(cx - 6, 15, 12, 1);
        ctx.fillRect(cx - 6, 18, 12, 1);
        ctx.fillRect(cx - 3, 16, 1, 1);
        ctx.fillRect(cx, 16, 1, 1);
        ctx.fillRect(cx + 3, 16, 1, 1);

        // Pan bas tunique + frange
        ctx.fillStyle = C.tunic;
        ctx.fillRect(cx - 6, 26, 5, 3);
        ctx.fillRect(cx + 1, 26, 5, 3);
        ctx.fillStyle = C.sash;
        ctx.fillRect(cx - 6, 28, 5, 1);
        ctx.fillRect(cx + 1, 28, 5, 1);

        // ── Ceinture ──
        ctx.fillStyle = C.sash;
        ctx.fillRect(cx - 7, 22, 14, 2);
        if (!u) { ctx.fillStyle = C.gold; ctx.fillRect(cx - 1, 22, 3, 3); }

        // ── Bras gauche ──
        ctx.fillStyle = C.tunic;
        ctx.fillRect(cx - 10, 13, 3, 10);
        ctx.fillStyle = C.skin;
        ctx.fillRect(cx - 10, 22, 3, 3);

        // ── Bras droit + instrument ──
        ctx.fillStyle = C.tunic;
        ctx.fillRect(cx + 7, 13, 3, 10);
        ctx.fillStyle = C.skin;
        ctx.fillRect(cx + 7, 22, 3, 3);
        if (!u) {
            ctx.fillStyle = C.instrument;
            ctx.fillRect(cx + 8, 10, 2, 15);
            ctx.fillStyle = C.instrDk;
            ctx.fillRect(cx + 7, 9, 4, 2);
            ctx.fillStyle = C.gold;
            ctx.fillRect(cx + 7, 8, 4, 1);
            ctx.fillStyle = C.instrument;
            ctx.fillRect(cx + 7, 6, 4, 3);
            ctx.fillStyle = C.gold;
            ctx.fillRect(cx + 8, 7, 2, 1);
        }

        // ── Perles ──
        if (!u) {
            ctx.fillStyle = C.beads;
            ctx.fillRect(cx - 4, 12, 2, 1);
            ctx.fillRect(cx - 1, 11, 2, 1);
            ctx.fillRect(cx + 2, 12, 2, 1);
        }

        // ── Cou + Tête ──
        ctx.fillStyle = C.skin;
        ctx.fillRect(cx - 2, 9, 4, 4);
        ctx.fillRect(cx - 5, 1, 10, 10);

        // Oreilles
        if (dn || l) { ctx.fillRect(cx - 6, 4, 1, 3); ctx.fillStyle = C.skinShade; ctx.fillRect(cx - 6, 5, 1, 1); ctx.fillStyle = C.skin; }
        if (dn || r) { ctx.fillRect(cx + 5, 4, 1, 3); ctx.fillStyle = C.skinShade; ctx.fillRect(cx + 5, 5, 1, 1); }

        // ── Cheveux ──
        ctx.fillStyle = C.hair;
        ctx.fillRect(cx - 5, 0, 10, 3);
        ctx.fillRect(cx - 5, 0, 2, 5);
        ctx.fillRect(cx + 3, 0, 2, 5);
        if (u) {
            ctx.fillRect(cx - 5, 0, 10, 8);
        }
        ctx.fillStyle = C.hairHi;
        ctx.fillRect(cx - 2, 1, 4, 1);

        // ── Visage ──
        if (dn) {
            ctx.fillStyle = C.eye;
            ctx.fillRect(cx - 3, 4, 2, 2);
            ctx.fillRect(cx + 1, 4, 2, 2);
            ctx.fillStyle = C.pupil;
            ctx.fillRect(cx - 2, 5, 1, 1);
            ctx.fillRect(cx + 1, 5, 1, 1);
            ctx.fillStyle = C.skinShade;
            ctx.fillRect(cx - 1, 8, 2, 1);
        } else if (l) {
            ctx.fillStyle = C.eye; ctx.fillRect(cx - 3, 4, 2, 2);
            ctx.fillStyle = C.pupil; ctx.fillRect(cx - 3, 5, 1, 1);
            ctx.fillStyle = C.skinShade; ctx.fillRect(cx - 3, 8, 2, 1);
        } else if (r) {
            ctx.fillStyle = C.eye; ctx.fillRect(cx + 1, 4, 2, 2);
            ctx.fillStyle = C.pupil; ctx.fillRect(cx + 2, 5, 1, 1);
            ctx.fillStyle = C.skinShade; ctx.fillRect(cx + 1, 8, 2, 1);
        }
    }

    toSaveData() {
        return { x: this.x, y: this.y, direction: this.direction, alive: this.alive };
    }

    fromSaveData(data) {
        Object.assign(this, data);
    }
}