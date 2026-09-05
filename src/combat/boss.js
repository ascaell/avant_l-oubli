import { Enemy } from './enemy.js';

export class Boss extends Enemy {
    constructor(name, hp, attack, title, spriteColor) {
        super(name, hp, attack, spriteColor || '#c0392b');
        this.title = title;
        this.isCinematicActive = true;
        this.cinematicTimer = 0;
        this.cinematicDuration = 3.5; // Durée de l'intro en secondes
        this.phase = 1;
    }

    updateCinematic(deltaTime) {
        if (!this.isCinematicActive) return;
        this.cinematicTimer += deltaTime;
        if (this.cinematicTimer >= this.cinematicDuration) {
            this.isCinematicActive = false;
        }
    }

    specialAttack() {
        return Math.floor(this.attack * 1.75);
    }
}

export function createMalakorBoss() {
    return new Boss(
        "Malakor",
        160,
        18,
        "Seigneur du Temps Perdu et des Abysses",
        "#8e44ad"
    );
}
