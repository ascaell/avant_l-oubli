// ============================================================
//  INVENTAIRE — src/player/inventory.js
//  Responsable : Ascael · Branche : feature/player
//
//  Slots limités. Le joueur doit faire des choix.
//  Marie-Joseph affiche l'inventaire dans son UI.
// ============================================================

export class Inventory {
    constructor(maxSlots = 12) {
        this.maxSlots = maxSlots;
        this.items = [];
        this.equipped = {
            weapon: null,
            armor: null,
            accessory: null
        };
    }

    isFull() {
        return this.items.length >= this.maxSlots;
    }

    add(item) {
        if (this.isFull()) return false;
        this.items.push(item);
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.items.length) return null;
        return this.items.splice(index, 1)[0];
    }

    get(index) {
        return this.items[index] || null;
    }

    equip(index) {
        const item = this.items[index];
        if (!item || !item.slot) return false;

        // Si un objet est déjà équipé dans ce slot, on le remet dans l'inventaire
        if (this.equipped[item.slot]) {
            this.items.push(this.equipped[item.slot]);
        }

        this.equipped[item.slot] = this.items.splice(index, 1)[0];
        return true;
    }

    unequip(slot) {
        if (!this.equipped[slot]) return false;
        if (this.isFull()) return false;
        this.items.push(this.equipped[slot]);
        this.equipped[slot] = null;
        return true;
    }

    /** Bonus total des équipements (pour Paul — combat) */
    getEquipBonus() {
        let force = 0, defense = 0, agilite = 0, esprit = 0;
        for (const item of Object.values(this.equipped)) {
            if (!item) continue;
            force += item.force || 0;
            defense += item.defense || 0;
            agilite += item.agilite || 0;
            esprit += item.esprit || 0;
        }
        return { force, defense, agilite, esprit };
    }

    /** Ce que Marie-Joseph affiche dans l'UI */
    getUIData() {
        return {
            items: this.items,
            equipped: this.equipped,
            slots: this.items.length,
            maxSlots: this.maxSlots
        };
    }

    toSaveData() {
        return {
            maxSlots: this.maxSlots,
            items: this.items,
            equipped: this.equipped
        };
    }

    fromSaveData(data) {
        this.maxSlots = data.maxSlots;
        this.items = data.items;
        this.equipped = data.equipped;
    }
}