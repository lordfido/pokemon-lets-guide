import { IPokemonMovesRelation } from '../../app/modules/pokedex/pokedex.models';

const relations: IPokemonMovesRelation[] = [
  {
    moves: [
      { id: '257', level: 1 },
      { id: '643', level: 1 },
      { id: '692', level: 5 },
      { id: '343', level: 9 },
      { id: '447', level: 14 },
      { id: '568', level: 14 },
      { id: '648', level: 18 },
      { id: '488', level: 23 },
      { id: '258', level: 27 },
      { id: '146', level: 32 },
      { id: '274' },
      { id: '497' },
      { id: '348' },
      { id: '464' },
      { id: '624' },
      { id: '493' },
      { id: '185' },
      { id: '670' },
      { id: '425' },
      { id: '583' },
      { id: '571' },
      { id: '373' },
    ],
    pokemon: '001',
  },
];

export const getPokemonMovesRelation = () => relations;
