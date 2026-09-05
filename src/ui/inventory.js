// ============================================================
//  AVANT L'OUBLI — src/ui/inventory.js
//  Responsable : Marie-Joseph · Branche : feature/ui
//
//  Grille d'inventaire à slots limités.
//  Nombre de slots PROVISOIRE (12 = 4 colonnes x 3 lignes, comme
//  l'exemple de docs/09_REPARTITION.md) : "le nombre de slots doit
//  être défini avec l'équipe", à ajuster si besoin plus tard.
//  Ne connaît aucun système de jeu réel : reçoit juste une liste
//  d'objets simples via setItems() (ex: [{ name: 'Potion' }, ...]).
// ============================================================

const SLOT_COUNT = 12;
const COLUMNS = 4;
const SLOT_SIZE = 50;
const SLOT_GAP = 8;

const COLOR = {
    slotBg: '#171C24',    // noir bleuté
    slotBorder: '#E6B85C', // doré
    itemBg: '#B85C38',    // terracotta
    text: '#E8C99B',      // beige
};

export class Inventory {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.items = []; // liste d'objets { name } dans l'ordre des slots
    }

    /** Remplace le contenu affiché. Les slots au-delà de SLOT_COUNT sont ignorés. */
    setItems(items) {
        this.items = items.slice(0, SLOT_COUNT);
    }

    update() {
        // Rien à animer pour l'instant ; méthode gardée pour respecter
        // la même interface (update/render) que les autres systèmes.
    }

    render(ctx) {
        for (let i = 0; i < SLOT_COUNT; i++) {
            const col = i % COLUMNS;
            const row = Math.floor(i / COLUMNS);
            const slotX = this.x + col * (SLOT_SIZE + SLOT_GAP);
            const slotY = this.y + row * (SLOT_SIZE + SLOT_GAP);

            ctx.fillStyle = COLOR.slotBg;
            ctx.fillRect(slotX, slotY, SLOT_SIZE, SLOT_SIZE);

            ctx.strokeStyle = COLOR.slotBorder;
            ctx.lineWidth = 2;
            ctx.strokeRect(slotX, slotY, SLOT_SIZE, SLOT_SIZE);

            const item = this.items[i];
            if (item) {
                ctx.fillStyle = COLOR.itemBg;
                ctx.fillRect(slotX + 6, slotY + 6, SLOT_SIZE - 12, SLOT_SIZE - 12);

                ctx.fillStyle = COLOR.text;
                ctx.font = '11px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.name.slice(0, 6), slotX + SLOT_SIZE / 2, slotY + SLOT_SIZE / 2);
            }
        }
    }
}
