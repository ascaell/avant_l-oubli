export class Enemy {
    constructor(x, y, health = 50, speed = 1.5, force = 8, defense = 5) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.maxHealth = health;
        this.speed = speed;
        this.force = force;
        this.defense = defense;
        this.width = 32;
        this.height = 32;
        this.xpReward = 25;
    }

    update(dt, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
            this.x += (dx / dist) * this.speed * dt;
            this.y += (dy / dist) * this.speed * dt;
        }
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }

    draw(ctx) {
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
