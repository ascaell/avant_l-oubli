export class Enemy {
    constructor(name, hp, attack, spriteColor) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.attack = attack;
        this.spriteColor = spriteColor || '#7f8c8d';
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        return this.hp === 0;
    }
}

export function createRandomEnemy() {
    const types = [
        { name: "Ombre Errante", hp: 35, atk: 7, color: "#4a3b5c" },
        { name: "Fragment d'Oubli", hp: 45, atk: 10, color: "#2c3e50" },
        { name: "Spectre Corrompu", hp: 30, atk: 13, color: "#95a5a6" }
    ];
    const data = types[Math.floor(Math.random() * types.length)];
    return new Enemy(data.name, data.hp, data.atk, data.color);
}
