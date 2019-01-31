import { getTypeRelations } from './pokemon';

import { PokemonType } from '../../constants/pokemon/pokemon-types';

import { IRichMove } from '../modules/moves/moves.models';

/**
 * Filter a `movesList`, showing only strong moves against provided types
 */
export const strongAgainstProvidedTypes = (providedTypes: ReadonlyArray<PokemonType>, move: IRichMove) => {
  const relations = getTypeRelations(providedTypes);
  const strongTypes = relations.filter(relation => relation.effectiveness > 1);
  const weakTypes = relations.filter(relation => relation.effectiveness < 1);

  let shouldSkip = true;
  strongTypes.forEach(type => {
    if (move.types.ownType === type.id) {
      shouldSkip = false;
    }
  });

  weakTypes.forEach(type => {
    if (move.types.ownType === type.id) {
      shouldSkip = true;
    }
  });

  if (shouldSkip) {
    return false;
  }

  return true;
};

/**
 * Get a `movesList` that are strong against provided types
 */
export const getExecutioners = (providedTypes: ReadonlyArray<PokemonType>, movesList: IRichMove[]) =>
  movesList.filter(move => strongAgainstProvidedTypes(providedTypes, move));

/**
 * Filter a `movesList`, showing only weak pokemon against
 */
export const weakAgainstProvidedTypes = (providedTypes: ReadonlyArray<PokemonType>, move: IRichMove) => {
  const relations = getTypeRelations([move.types.ownType]);
  const weakAgainst = relations.filter(relation => relation.effectiveness > 1);
  const strongAgainst = relations.filter(relation => relation.effectiveness < 1);

  let shouldSkip = true;
  weakAgainst.forEach(type => {
    if (providedTypes.findIndex(t => t === type.id) >= 0) {
      shouldSkip = false;
    }
  });

  strongAgainst.forEach(type => {
    if (providedTypes.findIndex(t => t === type.id) >= 0) {
      shouldSkip = true;
    }
  });

  if (shouldSkip) {
    return false;
  }

  return true;
};

/**
 * Get a `movesList` that are weak against provided types
 */
export const getVictims = (providedTypes: ReadonlyArray<PokemonType>, movesList: IRichMove[]) =>
  movesList.filter(move => weakAgainstProvidedTypes(providedTypes, move));
