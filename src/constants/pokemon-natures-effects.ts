import { Stats, Natures } from 'pokelab-lets-go';
import { PokemonNature } from './pokemon-natures';
import { StatId, ATTACK_ID, DEFENSE_ID, SPECIAL_ATTACK_ID, SPECIAL_DEFENSE_ID, SPEED_ID } from './pokemon-stats';

interface StatIndex {
  [key: string]:
    | typeof Stats.Attack
    | typeof Stats.Defense
    | typeof Stats.SpecialAttack
    | typeof Stats.SpecialDefense
    | typeof Stats.Speed;
}
const statIndex: StatIndex = {
  [ATTACK_ID]: Stats.Attack,
  [DEFENSE_ID]: Stats.Defense,
  [SPECIAL_ATTACK_ID]: Stats.SpecialAttack,
  [SPECIAL_DEFENSE_ID]: Stats.SpecialDefense,
  [SPEED_ID]: Stats.Speed,
};

interface NatureEffect {
  increases: StatId;
  reduces: StatId;
}

/**
 * TODO: Given a NatureID, will return its effects
 */
export const getNatureEffects = (nature: PokemonNature): NatureEffect => ({
  increases: 'attack',
  reduces: 'speed',
});

/**
 * Given nature effects, will return the corresponding nature
 * @example findNature({increases: 'attack', reduces: 'speed'});
 */
export const findNature = ({ increases, reduces }: NatureEffect) =>
  Natures.findNature(statIndex[increases], statIndex[reduces]);
