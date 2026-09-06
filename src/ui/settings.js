/*
** EPITECH PROJECT, 2026
** avant_l-oubli
** File description:
** settings.js
*/

import { Button } from './button.js';

const BG_COLOR = '#171C24';
const TITLE_COLOR = '#E6B85C';
const TEXT_COLOR = '#E8C99B';

const VOLUME_STEP = 10;
const VOLUME_MIN = 0;
const VOLUME_MAX = 100;

export class Settings {
    constructor(width, height, callbacks) {
        this.width = width;
        this.height = height;
        this.callbacks = callbacks;

        this.musicVolume = 70;
        this.sfxVolume = 70;
        this.fullscreen = false;

        const labelX = width / 2 - 100;
        const stepperX = labelX + 150;

        this.musicRowY = height / 2 - 140;
        this.sfxRowY = this.musicRowY + 60;
        this.fullscreenRowY = this.sfxRowY + 60;
        this.controlsRowY = this.fullscreenRowY + 80;
        this.backRowY = this.controlsRowY + 100;

        this.musicMinusButton = new Button(stepperX, this.musicRowY, 40, 40, '-',
            () => this._changeVolume('music', -VOLUME_STEP));
        this.musicPlusButton = new Button(stepperX + 50, this.musicRowY, 40, 40, '+',
            () => this._changeVolume('music', VOLUME_STEP));

        this.sfxMinusButton = new Button(stepperX, this.sfxRowY, 40, 40, '-',
            () => this._changeVolume('sfx', -VOLUME_STEP));
        this.sfxPlusButton = new Button(stepperX + 50, this.sfxRowY, 40, 40, '+',
            () => this._changeVolume('sfx', VOLUME_STEP));

        this.fullscreenButton = new Button(labelX, this.fullscreenRowY, 220, 40, 'PLEIN ECRAN : OFF',
            () => this._toggleFullscreen());

        this.backButton = new Button(width / 2 - 100, this.backRowY, 200, 50, 'RETOUR',
            () => this.callbacks.onBack && this.callbacks.onBack());

        this.buttons = [
            this.musicMinusButton, this.musicPlusButton,
            this.sfxMinusButton, this.sfxPlusButton,
            this.fullscreenButton,
            this.backButton,
        ];

        this.labelX = labelX;
    }

    _changeVolume(kind, delta) {
        if (kind === 'music') {
            this.musicVolume = Math.max(VOLUME_MIN, Math.min(VOLUME_MAX, this.musicVolume + delta));
        } else {
            this.sfxVolume = Math.max(VOLUME_MIN, Math.min(VOLUME_MAX, this.sfxVolume + delta));
        }
    }

    _toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.fullscreenButton.label = this.fullscreen ? 'PLEIN ECRAN : ON' : 'PLEIN ECRAN : OFF';
    }

    getSettings() {
        return {
            musicVolume: this.musicVolume,
            sfxVolume: this.sfxVolume,
            fullscreen: this.fullscreen,
        };
    }

    update() {
        for (const button of this.buttons) {
            button.update();
        }
    }

    render(ctx) {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = TITLE_COLOR;
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('SETTINGS', this.labelX, this.musicRowY - 50);

        ctx.fillStyle = TEXT_COLOR;
        ctx.font = '16px sans-serif';
        ctx.fillText(`Musique : ${this.musicVolume}`, this.labelX, this.musicRowY + 20);
        ctx.fillText(`Effets : ${this.sfxVolume}`, this.labelX, this.sfxRowY + 20);

        ctx.font = '14px sans-serif';
        ctx.fillText('Deplacement : Z/W haut, S bas, Q/A gauche, D droite', this.labelX, this.controlsRowY);

        for (const button of this.buttons) {
            button.render(ctx);
        }
    }
}
