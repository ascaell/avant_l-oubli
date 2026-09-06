/*
** EPITECH PROJECT, 2026
** avant_l-oubli
** File description:
** menu.js
*/

import { Button } from './button.js';

const TITLE_COLOR = '#E6B85C';
const BG_COLOR = '#171C24';

const BUTTON_W = 220;
const BUTTON_H = 50;
const BUTTON_GAP = 20;

export class Menu {
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

    setHasSave(hasSave) {
        this.resumeButton.setDisabled(!hasSave);
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
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("AVANT L'OUBLI", this.width / 2, this.titleY);

        for (const button of this.buttons) {
            button.render(ctx);
        }
    }
}

const ESC_BUTTON_W = 220;
const ESC_BUTTON_H = 40;
const ESC_BUTTON_GAP = 10;
const ESC_BG_COLOR = 'rgba(23, 28, 36, 0.85)';

export class EscMenu {
    constructor(width, height, callbacks) {
        this.width = width;
        this.height = height;
        this.callbacks = callbacks;
        this.visible = false;

        const count = 9;
        const totalHeight = count * ESC_BUTTON_H + (count - 1) * ESC_BUTTON_GAP;
        const startY = height / 2 - totalHeight / 2;
        const x = width / 2 - ESC_BUTTON_W / 2;
        const rowY = (index) => startY + index * (ESC_BUTTON_H + ESC_BUTTON_GAP);

        this.characterButton = new Button(x, rowY(0), ESC_BUTTON_W, ESC_BUTTON_H, 'CHARACTER',
            () => this.callbacks.onCharacter && this.callbacks.onCharacter());

        this.equipmentButton = new Button(x, rowY(1), ESC_BUTTON_W, ESC_BUTTON_H, 'EQUIPMENT',
            () => this.callbacks.onEquipment && this.callbacks.onEquipment());

        this.inventoryButton = new Button(x, rowY(2), ESC_BUTTON_W, ESC_BUTTON_H, 'INVENTORY',
            () => this.callbacks.onInventory && this.callbacks.onInventory());

        this.characteristicsButton = new Button(x, rowY(3), ESC_BUTTON_W, ESC_BUTTON_H, 'CHARACTERISTICS',
            () => this.callbacks.onCharacteristics && this.callbacks.onCharacteristics());

        this.saveButton = new Button(x, rowY(4), ESC_BUTTON_W, ESC_BUTTON_H, 'SAVE',
            () => this.callbacks.onSave && this.callbacks.onSave());

        this.loadButton = new Button(x, rowY(5), ESC_BUTTON_W, ESC_BUTTON_H, 'LOAD',
            () => this.callbacks.onLoad && this.callbacks.onLoad());

        this.settingsButton = new Button(x, rowY(6), ESC_BUTTON_W, ESC_BUTTON_H, 'SETTINGS',
            () => this.callbacks.onSettings && this.callbacks.onSettings());

        this.controlsButton = new Button(x, rowY(7), ESC_BUTTON_W, ESC_BUTTON_H, 'CONTROLS',
            () => this.callbacks.onControls && this.callbacks.onControls());

        this.closeButton = new Button(x, rowY(8), ESC_BUTTON_W, ESC_BUTTON_H, 'FERMER',
            () => this.close());

        this.buttons = [
            this.characterButton, this.equipmentButton, this.inventoryButton,
            this.characteristicsButton, this.saveButton, this.loadButton,
            this.settingsButton, this.controlsButton, this.closeButton,
        ];
    }

    open() {
        this.visible = true;
    }

    close() {
        this.visible = false;
        if (this.callbacks.onClose) this.callbacks.onClose();
    }

    update() {
        if (!this.visible) return;
        for (const button of this.buttons) {
            button.update();
        }
    }

    render(ctx) {
        if (!this.visible) return;

        ctx.fillStyle = ESC_BG_COLOR;
        ctx.fillRect(0, 0, this.width, this.height);

        for (const button of this.buttons) {
            button.render(ctx);
        }
    }
}
