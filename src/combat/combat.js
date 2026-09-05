export class CombatSystem {
    constructor() {
        // Initialisation du système de combat
    }

    update(dt, player, enemies) {
        if (!player || !player.stats || !enemies) return;

        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];

            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const dist = Math.hypot(dx, dy);

            // Portée de mêlée/interaction pour le combat
            if (dist < 40) {
                // Calcul des dégâts infligés à l'ennemi (Force du joueur vs Défense de l'ennemi)
                const playerForce = player.stats.force || 10;
                const enemyDefense = enemy.defense || (enemy.stats && enemy.stats.defense) || 5;
                const damageToEnemy = Math.max(1, playerForce - enemyDefense);

                if (enemy.hp === undefined) {
                    enemy.hp = enemy.maxHp || 40;
                }
                enemy.hp -= damageToEnemy;

                // Riposte de l'ennemi (Force de l'ennemi vs Défense du joueur)
                const enemyForce = enemy.force || enemy.attack || 8;
                const playerDefense = player.stats.defense || 5;
                const damageToPlayer = Math.max(1, enemyForce - playerDefense);

                player.stats.hp = Math.max(0, player.stats.hp - damageToPlayer);

                // Gestion de la victoire et gain d'XP
                if (enemy.hp <= 0) {
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
