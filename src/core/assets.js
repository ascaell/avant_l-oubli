export class Assets {
    constructor() {
        // Structure interne : clé -> asset (Image ou Audio) déjà chargé.
        this._store = new Map();
    }

    loadImage(key, src) {
        if (this._store.has(key)) {
            return Promise.reject(
                new Error(`Assets: la clé "${key}" existe déjà.`)
            );
        }

        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this._store.set(key, img);
                resolve(img);
            };

            img.onerror = () => {
                reject(new Error(`Assets: échec du chargement de l'image "${src}".`));
            };

            img.src = src;
        });
    }

    loadAudio(key, src) {
        if (this._store.has(key)) {
            return Promise.reject(
                new Error(`Assets: la clé "${key}" existe déjà.`)
            );
        }

        return new Promise((resolve, reject) => {
            const audio = new Audio();

            // canplaythrough : le navigateur estime pouvoir lire l'audio en entier
            // sans interruption. C'est le "chargement terminé" pour le son.
            audio.addEventListener('canplaythrough', () => {
                this._store.set(key, audio);
                resolve(audio);
            }, { once: true });

            audio.addEventListener('error', () => {
                reject(new Error(`Assets: échec du chargement de l'audio "${src}".`));
            }, { once: true });

            audio.src = src;
            audio.load();
        });
    }

    loadAll(list) {
        const promises = list.map((item) => {
            if (item.type === 'image') {
                return this.loadImage(item.key, item.src);
            }
            if (item.type === 'audio') {
                return this.loadAudio(item.key, item.src);
            }
            return Promise.reject(
                new Error(`Assets: type inconnu "${item.type}" pour la clé "${item.key}".`)
            );
        });

        return Promise.all(promises);
    }

    get(key) {
        return this._store.has(key) ? this._store.get(key) : null;
    }

    has(key) {
        return this._store.has(key);
    }

    clear() {
        this._store.clear();
    }
}