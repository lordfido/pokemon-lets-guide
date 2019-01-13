import { ATTACK_ID, DEFENSE_ID, HP_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID, StatId } from './pokemon-stats';

type StatColor = 'blue' | 'green' | 'orange' | 'pink' | 'red' | 'yellow';
const statColors: { [key: string]: StatColor } = {
  [HP_ID]: 'orange',
  [ATTACK_ID]: 'red',
  [DEFENSE_ID]: 'yellow',
  [SPEED_ID]: 'pink',
  [SPECIAL_DEFENSE_ID]: 'green',
  [SPECIAL_ATTACK_ID]: 'blue',
};

export const getStatColor = (id: StatId): StatColor => statColors[id];
