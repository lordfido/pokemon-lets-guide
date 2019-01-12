export type StatId = 'attack' | 'defense' | 'spAttack' | 'spDefense' | 'hp' | 'speed';

// Stat IDs
export const HP_ID: StatId = 'hp';
export const ATTACK_ID: StatId = 'attack';
export const DEFENSE_ID: StatId = 'defense';
export const SPEED_ID: StatId = 'speed';
export const SPECIAL_DEFENSE_ID: StatId = 'spDefense';
export const SPECIAL_ATTACK_ID: StatId = 'spAttack';

// Stat values
export const MAX_INITIAL_STAT_VALUE = 255;
export const MAX_STAT_VALUE = 851;

export const getStats = (includeHP: boolean = true) => {
  const stats = [HP_ID, ATTACK_ID, DEFENSE_ID, SPEED_ID, SPECIAL_DEFENSE_ID, SPECIAL_ATTACK_ID];

  if (includeHP) {
    return stats;
  }

  return stats.slice(1);
};
