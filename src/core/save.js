export class SaveSystem {
    constructor(saveKey = 'avant_l_oubli_save') {
        this.saveKey = saveKey;
    }

    save(data) {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(this.saveKey, json);
            return true;
        } catch (err) {
            // Sérialisation impossible, localStorage plein ou indisponible :
            // on ne fait pas planter le jeu.
            console.error('SaveSystem: échec de la sauvegarde.', err);
            return false;
        }
    }

    load() {
        try {
            const json = localStorage.getItem(this.saveKey);
            if (json === null) return null; // aucune sauvegarde
            return JSON.parse(json);
        } catch (err) {
            // JSON corrompu ou localStorage inaccessible.
            console.error('SaveSystem: échec du chargement.', err);
            return null;
        }
    }

    hasSave() {
        try {
            return localStorage.getItem(this.saveKey) !== null;
        } catch (err) {
            console.error('SaveSystem: localStorage inaccessible.', err);
            return false;
        }
    }

    deleteSave() {
        try {
            localStorage.removeItem(this.saveKey);
            return true;
        } catch (err) {
            console.error('SaveSystem: échec de la suppression.', err);
            return false;
        }
    }
}