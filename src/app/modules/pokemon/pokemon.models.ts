import { Pokemon } from './pokemon.types';
import { getPokemonType } from '../../../constants/pokemon-types';
import { sortBy } from '../../utils/arrays';

const getStatRatio = (value: number): number => value / 300;

const filterUnknownTypes = (pokemonType: string): boolean => !!getPokemonType(pokemonType);

export const createPokemonFromServer = (collection: Array<any>): Array<Pokemon> =>
  collection
    .filter(pokemon => typeof pokemon.id !== undefined && typeof pokemon.stats !== undefined)
    .map(pokemon => ({
      id: Number(pokemon.id),
      name: String(pokemon.name) || '',
      description: String(pokemon.description) || '',
      avatar: String(pokemon.avatar) || '',

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
