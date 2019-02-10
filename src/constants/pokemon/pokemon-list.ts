import { Pokedex } from 'pokelab';

const pokemon = Pokedex.All;

/**
 * Only shows pokemon that are available in Pokemon Let's Go series, and remove its
 * variants (Pokemon partner (perfect IVs))
 */
const onlyPokemonLetsGo = (pokemon: Pokedex.Pokemon) =>
  // Pokemon Let's Go
  (pokemon.nationalNumber <= 151 || pokemon.nationalNumber === 808 || pokemon.nationalNumber === 809) &&
  // Remove partners
  (!pokemon.variant || new RegExp('Partner').test(pokemon.variant) === false);

export const getPokemonList = () => pokemon.filter(onlyPokemonLetsGo);
