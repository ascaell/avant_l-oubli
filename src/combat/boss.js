import { Enemy } from './Enemy.js';

export class Boss extends Enemy {
    constructor(x, y, name = "Malakor", hp = 200, attack = 15, spriteColor = '#8e44ad') {
        super(x, y, hp, 1.0, attack, 10);
        this.name = name;
        this.spriteColor = spriteColor;
        this.width = 64;
        this.height = 64;
        this.xpReward = 150;
        this.phase = 1;
        this.specialAttackTimer = 0;
        this.isCinematicActive = false;
    }

    update(dt, player) {
        super.update(dt, player);

        if (this.health <= this.maxHealth / 2 && this.phase === 1) {
            this.phase = 2;
            this.speed = 1.8;
            this.force = Math.round(this.force * 1.5);
        }

        this.specialAttackTimer += dt;
        const threshold = dt < 5 ? 5.0 : 5000; // Gère dt en secondes ou millisecondes
        if (this.specialAttackTimer >= threshold) {
            this.specialAttack(player);
            this.specialAttackTimer = 0;
        }
    }

    specialAttack(player) {
        if (player && player.stats) {
            const specialDamage = Math.max(5, (this.force * 1.5) - (player.stats.defense || 0));
            player.stats.hp = Math.max(0, player.stats.hp - specialDamage);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.spriteColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.fillText(`${this.name} (P${this.phase})`, this.x, this.y - 10);
    }
}
