// src/world/npc.js
// Responsable : Carmella
//
// PNJ du monde : position, sprite, dialogues (par époque : futur/passé),
// et détection de proximité pour savoir quand le joueur peut interagir.

import { openDialogue } from './dialogue.js';

const INTERACT_RANGE = 48; // distance en pixels à laquelle "E" apparaît

export class NPC {
  constructor(cfg) {
    this.id = cfg.id;
    this.name = cfg.name;
    this.x = cfg.x;
    this.y = cfg.y;
    this.w = 32;
    this.h = 32;
    this.sprite = cfg.sprite;
    this.dialogues = cfg.dialogues;
    this.role = cfg.role || '';
    this.canInteract = false;
  }

  updateProximity(player) {
    const dx = (this.x + this.w / 2) - (player.x + player.w / 2);
    const dy = (this.y + this.h / 2) - (player.y + player.h / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.canInteract = dist <= INTERACT_RANGE;
  }

  getLines(era, questFlags) {
    const d = this.dialogues[era];
    if (typeof d === 'function') return d(questFlags);
    return d || ["..."];
  }

  tryInteract(era, questFlags) {
    if (!this.canInteract) return false;
    const lines = this.getLines(era, questFlags);
    openDialogue(this.name, lines);
    return true;
  }

  render(ctx, assetsGet) {
    const img = assetsGet ? assetsGet(this.sprite) : null;
    if (img) {
      ctx.drawImage(img, this.x, this.y, this.w, this.h);
    } else {
      ctx.fillStyle = '#D99A45';
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    if (this.canInteract) {
      ctx.fillStyle = '#E6B85C';
      ctx.font = '12px monospace';
      ctx.fillText('E', this.x + this.w / 2 - 3, this.y - 6);
    }
  }
}

export function createVillageNPCs() {
  return [
    new NPC({
      id: 'ancien',
      name: "L'Ancien",
      x: 300, y: 200,
      sprite: 'npc_ancien',
      role: "Raconte l'histoire, donne le contexte",
      dialogues: {
        futur: [
          "Ce village n'a pas toujours été ainsi, Flowflow.",
          "Avant la conquête, la terre chantait encore, et notre peuple avec elle.",
          "Retrouve l'instrument. Lui seul peut te montrer ce que nous avons perdu.",
        ],
        passe: [
          "Te revoilà. Étrange, comme si je t'avais déjà vu... avant.",
          "Notre peuple est encore fort ici. Regarde bien, retiens tout : un jour, ce sera un souvenir.",
        ],
      },
    }),

    new NPC({
      id: 'garde',
      name: 'Le Garde',
      x: 360, y: 260,
      sprite: 'npc_garde',
      role: 'Tutoriel combat',
      dialogues: {
        futur: (flags) => flags && flags.tutoCombatFait
          ? ["Ta garde est bonne. On en a besoin, avec ce qui rôde depuis la conquête."]
          : [
              "Un conseil : approche-toi d'un ennemi et attaque avec l'action de combat.",
              "Ta Force et ta Défense décident du combat, pas juste tes réflexes.",
              "Va t'entraîner sur le mannequin près de la forge.",
            ],
        passe: ["Le calme avant la tempête. Profites-en, Flowflow — ça ne durera pas."],
      },
    }),

    new NPC({
      id: 'guerisseur',
      name: 'Le Guérisseur',
      x: 260, y: 320,
      sprite: 'npc_guerisseur',
      role: 'Soins',
      dialogues: {
        futur: [
          "Approche, je vais soigner tes blessures.",
          "Depuis la conquête, on soigne plus de blessures qu'on ne sème de récoltes.",
        ],
        passe: ["Les plantes d'ici guérissent mieux qu'ailleurs. Souviens-t'en, pour plus tard."],
      },
    }),

    new NPC({
      id: 'forgeron',
      name: 'Le Forgeron',
      x: 420, y: 300,
      sprite: 'npc_forgeron',
      role: 'Équipement',
      dialogues: {
        futur: ["Il ne me reste presque plus de métal. Ce que je peux forger est limité, depuis qu'on nous a tout pris."],
        passe: ["Voici mon meilleur travail. Prends ce dont tu as besoin, mais ton sac est petit — choisis bien."],
      },
    }),

    new NPC({
      id: 'fermier',
      name: 'Le Fermier',
      x: 200, y: 380,
      sprite: 'npc_fermier',
      role: 'Première quête',
      dialogues: {
        futur: (flags) => {
          if (!flags || !flags.quete_champ_acceptee) {
            return [
              "Mes champs ne poussent plus depuis qu'on nous a chassés de nos terres fertiles.",
              "Peux-tu aller voir ce qui bloque la source, à l'orée de la forêt ?",
            ];
          }
          if (!flags.quete_champ_terminee) {
            return ["Alors, du nouveau du côté de la source ?"];
          }
          return ["Grâce à toi, un peu d'eau revient. Merci, Flowflow — c'est déjà ça de repris."];
        },
        passe: ["La terre est encore généreuse ici. Regarde bien comment on l'entretient — ça pourrait te servir plus tard."],
      },
    }),

    new NPC({
      id: 'enfant',
      name: "L'Enfant",
      x: 340, y: 220,
      sprite: 'npc_enfant',
      role: 'Ambiance / infos',
      dialogues: {
        futur: [
          "On m'a dit qu'avant, le ciel n'était pas gris comme ça.",
          "Tu vas voir le Chef ? Il fait toujours cette tête sévère, depuis la conquête.",
        ],
        passe: [
          "Tu viens d'où ? Je ne t'ai jamais vu au village !",
          "Le marché est par là-bas, si tu cherches quelque chose.",
        ],
      },
    }),

    new NPC({
      id: 'chef',
      name: 'Le Chef',
      x: 300, y: 150,
      sprite: 'npc_chef',
      role: 'Quête principale',
      dialogues: {
        futur: (flags) => flags && flags.quete_principale_lancee
          ? ["Le temps presse, Flowflow. Ce que tu feras dans le passé décidera de notre avenir."]
          : ["Notre peuple s'éteint lentement depuis la conquête. Si l'instrument peut vraiment nous ramener au moment décisif... trouve-le."],
        passe: ["Écoute-moi bien : ce que nous décidons maintenant résonnera longtemps après nous."],
      },
    }),

    new NPC({
      id: 'mysterieux',
      name: 'Le Mystérieux',
      x: 460, y: 180,
      sprite: 'npc_mysterieux',
      role: 'Lien voyage temporel',
      dialogues: {
        futur: [
          "L'instrument ne s'ouvre qu'à ceux qui acceptent de voir ce qu'ils ont perdu.",
          "Le passé ne t'attendra pas éternellement.",
        ],
        passe: [
          "Tu ne devrais pas être ici... et pourtant, te voilà.",
          "Chaque choix que tu fais ici laisse une trace là-bas.",
        ],
      },
    }),
  ];
}
