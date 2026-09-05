// src/world/zone.js
// Responsable : Carmella
//
// Une "zone" regroupe tout ce qui définit un lieu du jeu : sa tilemap, ses
// PNJ, et les points de passage vers les autres zones. Le ZoneManager garde
// la zone actuellement active et gère les transitions (village ⇄ forêt ⇄
// forteresse) quand le joueur marche sur une case de sortie.
//

import { createPlaceholderMap, loadTileMap } from './tilemap.js';
import { createVillageNPCs } from './npc.js';

const ZONE_DEFS = {
  village: {
    id: 'village',
    name: 'Le village',
    mapSrc: 'assets/maps/village.json',
    createNpcs: () => createVillageNPCs(),
    spawn: { x: 300, y: 300 },
    exits: [
      { triggerCol: 15, triggerRow: 6, to: 'foret', spawnX: 96, spawnY: 96 },
    ],
  },
  foret: {
    id: 'foret',
    name: 'La forêt',
    mapSrc: 'assets/maps/foret.json',
    createNpcs: () => [],
    spawn: { x: 100, y: 300 },
    exits: [
      { triggerCol: 0,  triggerRow: 6, to: 'village',     spawnX: 700, spawnY: 300 },
      { triggerCol: 15, triggerRow: 0, to: 'forteresse',  spawnX: 96,  spawnY: 500 },
    ],
  },
  forteresse: {
    id: 'forteresse',
    name: 'La forteresse',
    mapSrc: 'assets/maps/forteresse.json',
    createNpcs: () => [],
    spawn: { x: 100, y: 100 },
    exits: [
      { triggerCol: 0, triggerRow: 10, to: 'foret', spawnX: 700, spawnY: 96 },
    ],
  },
};

export class Zone {
  constructor(def, tileMap) {
    this.id = def.id;
    this.name = def.name;
    this.def = def;
    this.tileMap = tileMap;
    this.npcs = def.createNpcs();
  }

  getSolidRects() {
    return this.tileMap.getSolidRects();
  }

    checkExit(col, row) {
    return this.def.exits.find(e => e.triggerCol === col && e.triggerRow === row) || null;
  }

  update(player) {
    this.npcs.forEach(npc => npc.updateProximity(player));
  }

  render(ctx, assetsGet) {
    this.tileMap.render(ctx, assetsGet);
    this.npcs.forEach(npc => npc.render(ctx, assetsGet));
  }
}

export class ZoneManager {
  constructor() {
    this.current = null;
    this.cache = {};
  }

  async loadZone(id) {
    if (this.cache[id]) {
      this.current = this.cache[id];
      return this.current;
    }

    const def = ZONE_DEFS[id];
    if (!def) throw new Error(`Zone inconnue : "${id}"`);

    let tileMap;
    try {
      tileMap = await loadTileMap(def.mapSrc);
    } catch (e) {
      tileMap = createPlaceholderMap();
    }

    const zone = new Zone(def, tileMap);
    this.cache[id] = zone;
    this.current = zone;
    return zone;
  }

  getSpawnPoint(id) {
    const def = ZONE_DEFS[id];
    return def ? { ...def.spawn } : { x: 0, y: 0 };
  }

  async maybeTransition(playerCol, playerRow) {
    if (!this.current) return null;
    const exit = this.current.checkExit(playerCol, playerRow);
    if (!exit) return null;
    await this.loadZone(exit.to);
    return { zoneId: exit.to, spawnX: exit.spawnX, spawnY: exit.spawnY };
  }
}
