import { Natures, Stats } from 'pokelab';
import { PokemonNature } from './pokemon-natures';
import { ATTACK_ID, DEFENSE_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID, StatId } from './pokemon-stats';

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

interface INatureEffect {
  increases: StatId;
  reduces: StatId;
}

/**
 * TODO: Given a NatureID, will return its effects
 */
export const getNatureEffects = (nature: PokemonNature): INatureEffect => ({
  increases: 'attack',
  reduces: 'speed',
});

/**
 * Given nature effects, will return the corresponding nature
 * @example findNature({increases: 'attack', reduces: 'speed'});
 */
export const findNature = ({ increases, reduces }: INatureEffect) =>
  Natures.findNature(statIndex[increases], statIndex[reduces]);
