import { Pokedex } from 'pokelab-lets-go';
import { sortBy } from '../../utils/arrays';
import { removeSpecialForms, createPokemonFromPokeLab } from '../../utils/pokemon';

export const CreatePokemonCollectionFromPokeLab = () =>
  Pokedex.All.filter(removeSpecialForms)
    .map(createPokemonFromPokeLab)
    .sort(sortBy('id', 'asc'));
