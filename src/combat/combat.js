export class CombatSystem {
    constructor() {
        // Système de combat avec gestion de cooldown
    }

    update(dt, player, enemies) {
        if (!player || !player.stats || !enemies) return;

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
                const playerForce = player.stats.force || 10;
                const enemyDefense = enemy.defense || 5;
                const damageToEnemy = Math.max(1, playerForce - enemyDefense);

                if (typeof enemy.takeDamage === 'function') {
                    enemy.takeDamage(damageToEnemy);
                } else {
                    enemy.health = Math.max(0, (enemy.health || 50) - damageToEnemy);
                }

                // Cooldown d'attaque de l'ennemi (1 seconde de délai entre chaque riposte)
                const cooldownLimit = dt < 5 ? 1.0 : 1000;
                if (enemy.attackCooldown >= cooldownLimit) {
                    const enemyForce = enemy.force || 8;
                    const playerDefense = player.stats.defense || 5;
                    const damageToPlayer = Math.max(1, enemyForce - playerDefense);

                    player.stats.hp = Math.max(0, player.stats.hp - damageToPlayer);
                    enemy.attackCooldown = 0;
                }

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
