export class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 50;
        this.maxHealth = 50;
        this.speed = 1.5;
        this.force = 8;
        this.defense = 5;
        this.width = 32;
        this.height = 32;
        this.xpReward = 25;
    }

    update(dt, player) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
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
