export const CombatState = {
    CINEMATIC: 'CINEMATIC',
    PLAYER_TURN: 'PLAYER_TURN',
    ENEMY_TURN: 'ENEMY_TURN',
    ANIMATING: 'ANIMATING',
    VICTORY: 'VICTORY',
    DEFEAT: 'DEFEAT'
};

export class CombatSystem {
    constructor(player, opponent) {
        this.player = player; 
        this.opponent = opponent; 
        
        if (opponent.isCinematicActive) {
            this.state = CombatState.CINEMATIC;
        } else {
            this.state = CombatState.PLAYER_TURN;
        }

        this.logMessage = `Un féroce ${opponent.name} surgit de la brume !`;
        this.turnDelay = 0;
        this.statePrev = CombatState.PLAYER_TURN;
    }

    update(deltaTime) {
        if (this.state === CombatState.CINEMATIC) {
            this.opponent.updateCinematic(deltaTime);
            if (!this.opponent.isCinematicActive) {
                this.state = CombatState.PLAYER_TURN;
                this.logMessage = `Le combat éclate ! À vous de jouer.`;
            }
            return;
        }

        if (this.state === CombatState.ANIMATING) {
            this.turnDelay -= deltaTime;
            if (this.turnDelay <= 0) {
                if (this.opponent.hp <= 0) {
                    this.state = CombatState.VICTORY;
                    this.logMessage = `Victoire absolue ! ${this.opponent.name} est terrassé.`;
                } else if (this.player.hp <= 0) {
                    this.state = CombatState.DEFEAT;
                    this.logMessage = `Vous avez succombé à l'oubli éternel...`;
                } else {
                    this.state = (this.statePrev === CombatState.PLAYER_TURN) ? CombatState.ENEMY_TURN : CombatState.PLAYER_TURN;
                    if (this.state === CombatState.ENEMY_TURN) {
                        this.triggerEnemyTurn();
                    }
                }
            }
        }
    }

    playerAttack() {
        if (this.state !== CombatState.PLAYER_TURN) return;

        const damage = Math.floor(this.player.attack + Math.random() * 5);
        this.opponent.takeDamage(damage);
        
        this.logMessage = `Vous frappez ${this.opponent.name} et infligez ${damage} dégâts !`;
        this.statePrev = CombatState.PLAYER_TURN;
        this.state = CombatState.ANIMATING;
        this.turnDelay = 1.4;
    }

    triggerEnemyTurn() {
        let damage = Math.floor(this.opponent.attack + Math.random() * 4 - 2);
        let actionName = "attaque";

        if (this.opponent.specialAttack && Math.random() < 0.45) {
            damage = this.opponent.specialAttack();
            actionName = "onde destructrice";
        }

        this.player.hp = Math.max(0, this.player.hp - damage);
        this.logMessage = `${this.opponent.name} déchaîne une ${actionName} : ${damage} PV perdus !`;
        
        this.statePrev = CombatState.ENEMY_TURN;
        this.state = CombatState.ANIMATING;
        this.turnDelay = 1.6;
    }

    render(ctx, width, height) {
        // Fond dynamique du combat
        ctx.fillStyle = "#0c0c14";
        ctx.fillRect(0, 0, width, height);

        // --- CINÉMATIQUE STYLE ZELDA ---
        if (this.state === CombatState.CINEMATIC && this.opponent.isCinematicActive) {
            const progress = this.opponent.cinematicTimer / this.opponent.cinematicDuration;
            const barHeight = 70 * Math.min(1, progress * 2.5);
            
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, width, barHeight);
            ctx.fillRect(0, height - barHeight, width, barHeight);

            if (progress > 0.25) {
                ctx.fillStyle = "rgba(10, 10, 18, 0.85)";
                ctx.fillRect(width / 2 - 350, height / 2 - 90, 700, 180);
                
                ctx.strokeStyle = "#e67e22";
                ctx.lineWidth = 4;
                ctx.strokeRect(width / 2 - 350, height / 2 - 90, 700, 180);

                ctx.fillStyle = "#f39c12";
                ctx.font = "bold 32px monospace";
                ctx.textAlign = "center";
                ctx.fillText(this.opponent.name.toUpperCase(), width / 2, height / 2 - 25);

                ctx.fillStyle = "#ecf0f1";
                ctx.font = "italic 19px monospace";
                ctx.fillText(`« ${this.opponent.title} »`, width / 2, height / 2 + 25);
            }
            return;
        }

        // --- INTERFACE DE COMBAT TOUR PAR TOUR ---
        // Ennemi (Sprite & PV)
        ctx.fillStyle = this.opponent.spriteColor;
        ctx.fillRect(width - 280, 140, 130, 130);
        
        ctx.fillStyle = "#222";
        ctx.fillRect(width - 300, 90, 200, 22);
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(width - 300, 90, 200 * (this.opponent.hp / this.opponent.maxHp), 22);
        
        ctx.fillStyle = "#fff";
        ctx.font = "15px monospace";
        ctx.textAlign = "left";
        ctx.fillText(`${this.opponent.name} (${this.opponent.hp}/${this.opponent.maxHp})`, width - 300, 65);

        // Joueur (Sprite & PV)
        ctx.fillStyle = "#2980b9";
        ctx.fillRect(120, height - 300, 110, 110);

        ctx.fillStyle = "#222";
        ctx.fillRect(120, height - 340, 200, 22);
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(120, height - 340, 200 * (this.player.hp / this.player.maxHp), 22);
        
        ctx.fillStyle = "#fff";
        ctx.fillText(`Héros (${this.player.hp}/${this.player.maxHp})`, 120, height - 355);

        // Boîte de dialogue type Pokémon
        ctx.fillStyle = "#151522";
        ctx.fillRect(60, height - 170, width - 120, 120);
        ctx.strokeStyle = "#3498db";
        ctx.lineWidth = 3;
        ctx.strokeRect(60, height - 170, width - 120, 120);

        ctx.fillStyle = "#ffffff";
        ctx.font = "19px monospace";
        ctx.textAlign = "left";
        ctx.fillText(this.logMessage, 90, height - 115);

        if (this.state === CombatState.PLAYER_TURN) {
            ctx.fillStyle = "#f1c40f";
            ctx.fillText("▶ Appuyez sur [ESPACE] pour attaquer", 90, height - 70);
        }
    }
}
