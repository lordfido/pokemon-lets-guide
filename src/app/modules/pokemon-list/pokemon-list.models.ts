import { Pokedex } from 'pokelab-lets-go';
import { sortBy } from '../../utils/arrays';
import { createPokemonFromPokeLab } from '../../utils/pokemon';

export const CreatePokemonCollectionFromPokeLab = () =>
  Pokedex.All.map(createPokemonFromPokeLab).sort(sortBy('id', 'asc'));
