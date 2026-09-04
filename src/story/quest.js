// src/story/quest.js
// Responsable : Carmella
//
// Gère la progression narrative via des "questFlags" : de simples
// booléens qu'on peut sérialiser tels quels dans la sauvegarde
// (voir save.js de Yvan).

export function createInitialQuestFlags() {
  return {
    tutoCombatFait: false,
    quete_champ_acceptee: false,
    quete_champ_terminee: false,
    quete_principale_lancee: false,
    quete_principale_terminee: false,
    voyage_temporel_effectue: false,
  };
}

export const MAIN_QUEST = {
  id: 'avant_loubli_quete_principale',
  title: "Avant l'oubli",
  giver: 'chef',
  description: "Retrouver l'instrument ancestral et l'utiliser pour changer ce qui a conduit à la conquête.",
  steps: [
    { id: 'parler_chef', label: 'Parler au Chef du village' },
    { id: 'trouver_instrument', label: "Trouver l'instrument ancestral" },
    { id: 'voyager_passe', label: "Utiliser l'instrument pour voyager dans le passé" },
    { id: 'evenement_final', label: "Atteindre l'événement historique décisif" },
  ],
};

export class QuestManager {
  constructor(flags = createInitialQuestFlags()) {
    this.flags = flags;
    this.currentStepIndex = 0;
  }

  set(flagName, value = true) {
    this.flags[flagName] = value;
    this._syncMainQuestStep();
  }

  get(flagName) {
    return !!this.flags[flagName];
  }

  _syncMainQuestStep() {
    if (this.flags.quete_principale_terminee) {
      this.currentStepIndex = MAIN_QUEST.steps.length;
    } else if (this.flags.voyage_temporel_effectue) {
      this.currentStepIndex = 3;
    } else if (this.flags.quete_principale_lancee) {
      this.currentStepIndex = 1;
    } else {
      this.currentStepIndex = 0;
    }
  }

  getCurrentObjectiveLabel() {
    if (!this.flags.quete_principale_lancee) return null;
    const step = MAIN_QUEST.steps[this.currentStepIndex];
    return step ? step.label : 'Quête terminée';
  }

  serialize() {
    return { ...this.flags };
  }

  static fromSave(savedFlags) {
    const flags = { ...createInitialQuestFlags(), ...(savedFlags || {}) };
    return new QuestManager(flags);
  }
}

export function completeFieldQuest(questManager)
{
  if (!questManager.get('quete_champ_acceptee')) return false;
  questManager.set('quete_champ_terminee', true);
  return true;
}
