// src/world/tilemap.js
// Responsable : Carmella
//
// Chargement et rendu de la tilemap isométrique. Une tilemap est une grille
// simple (colonnes x lignes) où chaque case contient un type de tuile
// ("sol", "mur", "eau", "arbre"...). Le rendu utilise une projection
// isométrique 2:1 classique (voir toIso), la même que celle décrite dans
// la page "Premiers pas" du guide.
//
// zone.js utilise ce module pour charger la map de chaque zone et récupérer
// les rectangles des tuiles solides (à donner à collision.js).

export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 32;

export const TILE_TYPES = {
  sol:    { color: '#4F6F52', solid: false },
  chemin: { color: '#D99A45', solid: false },
  mur:    { color: '#6B4226', solid: true  },
  eau:    { color: '#59636E', solid: true  },
  arbre:  { color: '#171C24', solid: true  },
};

export function toIso(col, row) {
  return {
    sx: (col - row) * (TILE_WIDTH / 2),
    sy: (col + row) * (TILE_HEIGHT / 2),
  };
}

export class TileMap {
  constructor(cols, rows, tiles) {
    this.cols = cols;
    this.rows = rows;
    this.tiles = tiles;
  }

  getTile(col, row) {
    if (col < 0 || row < 0 || col >= this.cols || row >= this.rows) return null;
    return this.tiles[row * this.cols + col];
  }

  isSolid(col, row) {
    const t = this.getTile(col, row);
    if (t === null) return true;
    const def = TILE_TYPES[t];
    return def ? def.solid : false;
  }

  worldToTile(x, y) {
    const col = Math.round((x / (TILE_WIDTH / 2) + y / (TILE_HEIGHT / 2)) / 2);
    const row = Math.round((y / (TILE_HEIGHT / 2) - x / (TILE_WIDTH / 2)) / 2);
    return { col, row };
  }

  getSolidRects() {
    const rects = [];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.isSolid(col, row)) {
          const { sx, sy } = toIso(col, row);
          rects.push({ x: sx, y: sy, w: TILE_WIDTH, h: TILE_HEIGHT });
        }
      }
    }
    return rects;
  }

  render(ctx, assetsGet) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const t = this.getTile(col, row);
        const def = TILE_TYPES[t];
        if (!def) continue;
        const { sx, sy } = toIso(col, row);
        const img = assetsGet ? assetsGet('tile_' + t) : null;
        if (img) {
          ctx.drawImage(img, sx, sy, TILE_WIDTH, TILE_HEIGHT);
        } else {
          ctx.fillStyle = def.color;
          ctx.fillRect(sx, sy, TILE_WIDTH, TILE_HEIGHT);
        }
      }
    }
  }
}

export async function loadTileMap(src) {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Impossible de charger la map : ${src}`);
  const data = await res.json();
  return new TileMap(data.cols, data.rows, data.tiles);
}

export function createPlaceholderMap(cols = 16, rows = 12) {
  const tiles = new Array(cols * rows).fill('sol');
  for (let col = 0; col < cols; col++) {
    tiles[col] = 'mur';
    tiles[(rows - 1) * cols + col] = 'mur';
  }
  for (let row = 0; row < rows; row++) {
    tiles[row * cols] = 'mur';
    tiles[row * cols + (cols - 1)] = 'mur';
  }
  return new TileMap(cols, rows, tiles);
}
