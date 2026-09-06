export class CombatSystem {
    constructor() {
        this.playerAttackCooldown = 0;
        this.playerAttackInterval = 0.5; // Délai de 0.5 seconde entre chaque attaque du joueur
    }

    update(dt, player, enemies) {
        if (!player || !player.stats || !enemies) return;

        if (this.playerAttackCooldown > 0) {
            this.playerAttackCooldown -= dt;
        }

        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];

            if (enemy.x === undefined || enemy.y === undefined) continue;

            if (enemy.attackCooldown === undefined) {
                enemy.attackCooldown = 0;
            }
            enemy.attackCooldown += dt;

            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 40) {
                // Attaque du joueur avec gestion du cooldown
                if (this.playerAttackCooldown <= 0) {
                    const playerForce = player.stats.force || 10;
                    const enemyDefense = enemy.defense || 5;
                    const damageToEnemy = Math.max(1, playerForce - enemyDefense);

                    if (typeof enemy.takeDamage === 'function') {
                        enemy.takeDamage(damageToEnemy);
                    } else {
                        enemy.health = Math.max(0, (enemy.health || 50) - damageToEnemy);
                    }

                    this.playerAttackCooldown = this.playerAttackInterval;
                }

                // Riposte de l'ennemi (cooldown de 1 seconde)
                if (enemy.attackCooldown >= 1.0) {
                    const enemyForce = enemy.force || 8;
                    const playerDefense = player.stats.defense || 5;
                    const damageToPlayer = Math.max(1, enemyForce - playerDefense);

                    player.stats.hp = Math.max(0, player.stats.hp - damageToPlayer);
                    enemy.attackCooldown = 0;
                }

                // Gestion de la défaite de l'ennemi et gain d'XP
                const currentHp = enemy.health !== undefined ? enemy.health : (enemy.hp || 0);
                if (currentHp <= 0) {
                    const xpReward = enemy.xpReward || 25;
                    if (typeof player.stats.gainXP === 'function') {
                        player.stats.gainXP(xpReward);
                    }
                    enemies.splice(i, 1);
                }
            }
        }
    }
}
