// ============================================================
//  COLLISIONS — src/world/collision.js
//  Responsable : Ascael · Branche : feature/player
//
//  Détection : rect vs rect, cercle vs cercle, rect vs cercle.
//  Résolution : axes séparés pour glisser le long des murs.
// ============================================================

/** Rectangle vs Rectangle */
export function rectVsRect(a, b) {
    return a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y;
}

/** Cercle vs Cercle */
export function circleVsCircle(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const rSum = a.r + b.r;
    return (dx * dx + dy * dy) < (rSum * rSum);
}

/** Rectangle vs Cercle */
export function rectVsCircle(rect, circle) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    return (dx * dx + dy * dy) < (circle.r * circle.r);
}

/**
 * Résolution de collision avec glissement.
 * Teste X et Y séparément pour que le joueur glisse le long des murs.
 *
 * @param {object} entity  — doit avoir { x, y, w, h } (hitbox)
 * @param {array}  walls   — tableau de { x, y, w, h }
 * @param {number} oldX    — position X avant le mouvement
 * @param {number} oldY    — position Y avant le mouvement
 */
export function resolveCollision(entity, walls, oldX, oldY) {
    const hb = typeof entity.hitbox === 'object' ? entity.hitbox : entity;

    // Test axe X
    const testX = { x: hb.x, y: oldY - (entity.h || hb.h), w: hb.w, h: hb.h };
    for (const wall of walls) {
        if (rectVsRect(testX, wall)) {
            entity.x = oldX;
            break;
        }
    }

    // Recalculer la hitbox après correction X
    const hb2 = typeof entity.hitbox === 'object' ? entity.hitbox : entity;

    // Test axe Y
    const testY = { x: hb2.x, y: hb2.y, w: hb2.w, h: hb2.h };
    for (const wall of walls) {
        if (rectVsRect(testY, wall)) {
            entity.y = oldY;
            break;
        }
    }
}

/**
 * Vérifie si une entité touche un élément interactif (PNJ, objet, zone).
 * Utile pour Carmella (interaction PNJ) et Paul (déclenchement combat).
 *
 * @param {object} a — { x, y, w, h }
 * @param {object} b — { x, y, w, h }
 * @param {number} margin — distance supplémentaire d'interaction
 */
export function isNear(a, b, margin = 8) {
    return rectVsRect(
        { x: a.x - margin, y: a.y - margin, w: a.w + margin * 2, h: a.h + margin * 2 },
        b
    );
}