import { Natures, Stats } from 'pokelab';

import { PokemonNature } from './pokemon-natures';
import { ATTACK_ID, DEFENSE_ID, HP_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID, StatId } from './pokemon-stats';

import { IPokemonStats } from '../app/modules/pokedex/pokedex.models';

interface IStatIndex {
  [key: string]:
    | typeof Stats.Attack
    | typeof Stats.Defense
    | typeof Stats.SpecialAttack
    | typeof Stats.SpecialDefense
    | typeof Stats.Speed;
}
const statIndex: IStatIndex = {
  [ATTACK_ID]: Stats.Attack,
  [DEFENSE_ID]: Stats.Defense,
  [SPECIAL_ATTACK_ID]: Stats.SpecialAttack,
  [SPECIAL_DEFENSE_ID]: Stats.SpecialDefense,
  [SPEED_ID]: Stats.Speed,
};

export interface INatureEffect {
  increases?: StatId;
  reduces?: StatId;
}

/**
 * TODO: Given a NatureID, will return its effects
 */
const getNatureEffects = (nature: PokemonNature): INatureEffect => ({
  increases: 'attack',
  reduces: 'speed',
});

export const getNatureModifier = (stat: StatId, nature?: INatureEffect) => {
  if (!nature) {
    return 1;
  }

  if (stat === nature.increases) {
    return 1.1;
  }

  if (stat === nature.reduces) {
    return 0.9;
  }

  return 1;
};

/**
 * Given a IPokemonStats and PokemonNature, it will modify those stats
 * based on this nature
 */
export const modifyStatsByNature = (stats: IPokemonStats, nature: PokemonNature): IPokemonStats => ({
  attack: stats.attack * getNatureModifier(ATTACK_ID, getNatureEffects(nature)),
  defense: stats.defense * getNatureModifier(DEFENSE_ID, getNatureEffects(nature)),
  hp: stats.hp * getNatureModifier(HP_ID, getNatureEffects(nature)),
  spAttack: stats.spAttack * getNatureModifier(SPECIAL_ATTACK_ID, getNatureEffects(nature)),
  spDefense: stats.spDefense * getNatureModifier(SPECIAL_DEFENSE_ID, getNatureEffects(nature)),
  speed: stats.speed * getNatureModifier(SPEED_ID, getNatureEffects(nature)),
});

/**
 * Given nature effects, will return the corresponding nature
 * @example findNature({increases: 'attack', reduces: 'speed'});
 */
export const findNature = ({ increases, reduces }: INatureEffect) =>
  increases && reduces ? Natures.findNature(statIndex[increases], statIndex[reduces]) : undefined;
