// ============================================================
//  STATS — src/player/stats.js
//  Responsable : Ascael · Branche : feature/player
//
//  Caractéristiques du joueur : PV, Force, Défense, Agilité, Esprit.
//  Système XP + niveaux.
//  getHUDData() → les 5 valeurs pour le HUD de Marie-Joseph.
// ============================================================

export class Stats {
    constructor() {
        this.hp = 100;
        this.maxHp = 100;
        this.force = 10;
        this.defense = 5;
        this.agilite = 5;
        this.esprit = 5;
        this.xp = 0;
        this.level = 1;
        this.xpToNext = 100;
    }

    /** Ce que Marie-Joseph branche dans le HUD */
    getHUDData() {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
            level: this.level,
            xp: this.xp,
            xpToNext: this.xpToNext
        };
    }

    /** Ce que Paul utilise pour le combat */
    getCombatData() {
        return {
            hp: this.hp,
            force: this.force,
            defense: this.defense,
            agilite: this.agilite,
            esprit: this.esprit
        };
    }

    gainXP(amount) {
        this.xp += amount;
        while (this.xp >= this.xpToNext) {
            this.levelUp();
        }
    }

    levelUp() {
        this.xp -= this.xpToNext;
        this.level++;
        this.xpToNext = Math.floor(this.xpToNext * 1.5);
        this.maxHp += 10;
        this.hp = this.maxHp;
        this.force += 2;
        this.defense += 1;
        this.agilite += 1;
        this.esprit += 1;
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        return this.hp <= 0;
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    isAlive() {
        return this.hp > 0;
    }

    toSaveData() {
        return { ...this };
    }

    fromSaveData(data) {
        Object.assign(this, data);
    }
}