// ============================================================
//  AVANT L'OUBLI — src/ui/dialog.js
//  Responsable : Marie-Joseph · Branche : feature/ui
//
//  Boîte de dialogue simple : affiche un nom + une phrase, avec un
//  bouton pour passer à la phrase suivante.
// ============================================================

import { Button } from './button.js';

const BG_COLOR = 'rgba(23, 28, 36, 0.9)'; // noir bleuté semi-transparent
const BORDER_COLOR = '#E6B85C'; // doré
const NAME_COLOR = '#D99A45';   // ocre
const TEXT_COLOR = '#E8C99B';   // beige

const BOX_HEIGHT = 140;
const PADDING = 20;

export class Dialog {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.visible = false;
        this.speakerName = '';
        this.lines = [];
        this.lineIndex = 0;

        const boxY = height - BOX_HEIGHT - PADDING;
        this.nextButton = new Button(
            width - PADDING - 140,
            boxY + BOX_HEIGHT - 50 - PADDING,
            140, 40, 'SUIVANT',
            () => this._advance()
        );
    }

    /** Démarre un dialogue : un nom d'interlocuteur + une liste de phrases. */
    start(speakerName, lines) {
        this.speakerName = speakerName;
        this.lines = lines;
        this.lineIndex = 0;
        this.visible = true;
    }

    _advance() {
        this.lineIndex++;
        if (this.lineIndex >= this.lines.length) {
            this.visible = false;
        }
    }

    update() {
        if (!this.visible) return;
        this.nextButton.update();
    }

    render(ctx) {
        if (!this.visible) return;

        const boxX = PADDING;
        const boxY = this.height - BOX_HEIGHT - PADDING;
        const boxW = this.width - PADDING * 2;

        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(boxX, boxY, boxW, BOX_HEIGHT);

        ctx.strokeStyle = BORDER_COLOR;
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, BOX_HEIGHT);

        ctx.fillStyle = NAME_COLOR;
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(this.speakerName, boxX + PADDING, boxY + PADDING);

        ctx.fillStyle = TEXT_COLOR;
        ctx.font = '16px sans-serif';
        ctx.fillText(this.lines[this.lineIndex], boxX + PADDING, boxY + PADDING + 30);

        this.nextButton.render(ctx);
    }
}
