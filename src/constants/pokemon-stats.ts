export type StatId = 'attack' | 'defense' | 'spAttack' | 'spDefense' | 'hp' | 'speed';
export const ATTACK_ID: StatId = 'attack';
export const DEFENSE_ID: StatId = 'defense';
export const SPECIAL_ATTACK_ID: StatId = 'spAttack';
export const SPECIAL_DEFENSE_ID: StatId = 'spDefense';
export const HP_ID: StatId = 'hp';
export const SPEED_ID: StatId = 'speed';

type StatName = 'Attack' | 'Defense' | 'Sp. At.' | 'Sp. Def.' | 'HP' | 'Speed';
const statNames: { [key: string]: StatName } = {
  [ATTACK_ID]: 'Attack',
  [DEFENSE_ID]: 'Defense',
  [SPECIAL_ATTACK_ID]: 'Sp. At.',
  [SPECIAL_DEFENSE_ID]: 'Sp. Def.',
  [HP_ID]: 'HP',
  [SPEED_ID]: 'Speed',
};
export const getStatName = (id: StatId): StatName => statNames[id];

type StatColor = 'blue' | 'green' | 'orange' | 'pink' | 'red' | 'yellow';
const statColors: { [key: string]: StatColor } = {
  [ATTACK_ID]: 'red',
  [DEFENSE_ID]: 'yellow',
  [SPECIAL_ATTACK_ID]: 'blue',
  [SPECIAL_DEFENSE_ID]: 'green',
  [HP_ID]: 'orange',
  [SPEED_ID]: 'pink',
};
export const getStatColor = (id: StatId): StatColor => statColors[id];

type IndividualJudgementId = 'best' | 'fantastic' | 'veryGood' | 'prettyGood' | 'decent' | 'noGood';
export const BEST_IV_ID: IndividualJudgementId = 'best';
export const FANTASTIC_IV_ID: IndividualJudgementId = 'fantastic';
export const VERY_GOOD_IV_ID: IndividualJudgementId = 'veryGood';
export const PRETTY_GOOD_IV_ID: IndividualJudgementId = 'prettyGood';
export const DECENT_IV_ID: IndividualJudgementId = 'decent';
export const NO_GOOD_IV_ID: IndividualJudgementId = 'noGood';

type IndividualJudgementName = 'Best' | 'Fantastic' | 'Very good' | 'Pretty good' | 'Decent' | 'No good';
const individualJudgementName: { [key: string]: IndividualJudgementName } = {
  [BEST_IV_ID]: 'Best',
  [FANTASTIC_IV_ID]: 'Fantastic',
  [VERY_GOOD_IV_ID]: 'Very good',
  [PRETTY_GOOD_IV_ID]: 'Pretty good',
  [DECENT_IV_ID]: 'Decent',
  [NO_GOOD_IV_ID]: 'No good',
};
export const getIndividualJudgementName = (id: IndividualJudgementId): IndividualJudgementName =>
  individualJudgementName[id];

type IndividualJudgementRange = [number, number];
const individualJudgementRanges: { [key: string]: IndividualJudgementRange } = {
  [BEST_IV_ID]: [31, Infinity],
  [FANTASTIC_IV_ID]: [30, 30],
  [VERY_GOOD_IV_ID]: [26, 29],
  [PRETTY_GOOD_IV_ID]: [16, 25],
  [DECENT_IV_ID]: [1, 15],
  [NO_GOOD_IV_ID]: [-Infinity, 0],
};
export const getIndividualJudgementIdBasedOnRangeValue = (value: number): IndividualJudgementId => {
  // @ts-ignore
  const ids: Array<IndividualJudgementId> = Object.keys(individualJudgementRanges);

  for (let x = 0; x <= ids.length - 1; x++) {
    const id = ids[x];
    const range = individualJudgementRanges[id];
    if (value >= range[0] && value <= range[1]) {
      return id;
    }
  }

  /**
   * Since 'best' range has infinity as maximum, and 'no good' has -infinity as minimum,
   * it should never reach point
   */
  return ids[0];
};

// Stat values
export const INITIAL_MAX_STAT_VALUE = 255;
export const MAX_STAT_VALUE = 300;

export const MAX_IV_VALUE = 31;
