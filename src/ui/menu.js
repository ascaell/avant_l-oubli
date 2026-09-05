// ============================================================
//  AVANT L'OUBLI — src/ui/menu.js
//  Responsable : Marie-Joseph · Branche : feature/ui
//
//  Menu principal : START / RESUME / SETTINGS / QUIT.
//  Ne connaît rien du reste du jeu : il appelle juste les callbacks
//  qu'on lui donne (pattern déjà annoncé dans 09_REPARTITION.md,
//  "Marie-Joseph ne doit pas ... mélanger toute la logique du jeu
//  dans les fichiers UI").
// ============================================================

import { Button } from './button.js';

const TITLE_COLOR = '#E6B85C'; // doré
const BG_COLOR = '#171C24';    // noir bleuté (futur)

const BUTTON_W = 220;
const BUTTON_H = 50;
const BUTTON_GAP = 20;

export class Menu {
    /**
     * @param {number} width  largeur du canvas
     * @param {number} height hauteur du canvas
     * @param {{onStart, onResume, onSettings, onQuit}} callbacks
     */
    constructor(width, height, callbacks) {
        this.width = width;
        this.height = height;
        this.callbacks = callbacks;

        const labels = ['START', 'RESUME', 'SETTINGS', 'QUIT'];
        const totalHeight = labels.length * BUTTON_H + (labels.length - 1) * BUTTON_GAP;
        const startY = height / 2 - totalHeight / 2;
        const x = width / 2 - BUTTON_W / 2;

        this.startButton = new Button(x, startY, BUTTON_W, BUTTON_H, 'START',
            () => this.callbacks.onStart && this.callbacks.onStart());

        this.resumeButton = new Button(x, startY + (BUTTON_H + BUTTON_GAP), BUTTON_W, BUTTON_H, 'RESUME',
            () => this.callbacks.onResume && this.callbacks.onResume());

        this.settingsButton = new Button(x, startY + (BUTTON_H + BUTTON_GAP) * 2, BUTTON_W, BUTTON_H, 'SETTINGS',
            () => this.callbacks.onSettings && this.callbacks.onSettings());

        this.quitButton = new Button(x, startY + (BUTTON_H + BUTTON_GAP) * 3, BUTTON_W, BUTTON_H, 'QUIT',
            () => this.callbacks.onQuit && this.callbacks.onQuit());

        this.buttons = [this.startButton, this.resumeButton, this.settingsButton, this.quitButton];
        this.titleY = startY - 60;
    }

    /** À appeler par l'intégrateur avec le résultat de SaveSystem.hasSave(). */
    setHasSave(hasSave) {
        this.resumeButton.setDisabled(!hasSave);
    }

    update(input) {
        for (const button of this.buttons) {
            button.update(input);
        }
    }

    render(ctx) {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = TITLE_COLOR;
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("AVANT L'OUBLI", this.width / 2, this.titleY);

        for (const button of this.buttons) {
            button.render(ctx);
        }
    }
}
