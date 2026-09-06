export class CombatSystem {
    constructor() {
        // Système de combat basé sur les statistiques
    }

    update(dt, player, enemies) {
        if (!player || !player.stats || !enemies) return;

        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];

            if (enemy.x === undefined || enemy.y === undefined) continue;

            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const dist = Math.hypot(dx, dy);

            // Portée d'interaction/mêlée
            if (dist < 40) {
                // Dégâts infligés par le joueur (Force vs Défense ennemie)
                const playerForce = player.stats.force || 10;
                const enemyDefense = enemy.defense || 5;
                const damageToEnemy = Math.max(1, playerForce - enemyDefense);

                if (typeof enemy.takeDamage === 'function') {
                    enemy.takeDamage(damageToEnemy);
                } else {
                    enemy.health = Math.max(0, (enemy.health || 50) - damageToEnemy);
                }

                // Riposte de l'ennemi (Force ennemie vs Défense du joueur)
                const enemyForce = enemy.force || 8;
                const playerDefense = player.stats.defense || 5;
                const damageToPlayer = Math.max(1, enemyForce - playerDefense);

                player.stats.hp = Math.max(0, player.stats.hp - damageToPlayer);

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
