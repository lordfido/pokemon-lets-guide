import { sortBy } from '../../utils/arrays';

import { getPokemonType } from '../../../constants/pokemon-types';

import { Pokemon } from './pokemon-list.types';

const getStatRatio = (value: number): number => value / 300;

const filterUnknownTypes = (pokemonType: string): boolean => !!getPokemonType(pokemonType);

const getAvatarFromId = (pokemonId: number): string => {
  let number = String(pokemonId);

  if (pokemonId < 10) number = `00${pokemonId}`;
  else if (pokemonId < 100) number = `0${pokemonId}`;

  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png`;
};

export const createPokemonFromServer = (collection: Array<any>): Array<Pokemon> =>
  collection
    .filter(pokemon => typeof pokemon.id !== undefined && typeof pokemon.stats !== undefined)
    .map(pokemon => ({
      id: Number(pokemon.id),
      name: String(pokemon.name) || '',
      description: String(pokemon.description) || '',
      avatar: pokemon.avatar ? String(pokemon.avatar) : getAvatarFromId(pokemon.id),

      types: typeof pokemon.types !== 'undefined' ? pokemon.types.filter(filterUnknownTypes).map(getPokemonType) : [],

      stats: {
        hp: getStatRatio(pokemon.stats.hp) || 0,
        attack: getStatRatio(pokemon.stats.attack) || 0,
        defense: getStatRatio(pokemon.stats.defense) || 0,
        speed: getStatRatio(pokemon.stats.speed) || 0,
        spDefense: getStatRatio(pokemon.stats.spDefense) || 0,
        spAttack: getStatRatio(pokemon.stats.spAttack) || 0,
      },
    }))
    .sort(sortBy('id', 'asc'));
