import { Pokemon } from '../../app/modules/pokemon-list/pokemon-list.types';

const initialPokemon: Array<Pokemon> = [
  {
    id: 151,
    name: 'Mew',
    avatar: '',
    types: ['psychic'],

    stats: {
      attack: 100,
      spAttack: 100,
      defense: 100,
      spDefense: 100,
      hp: 100,
      speed: 100,
    },
  },
  {
    id: 149,
    name: 'Dragonite',
    avatar: '',
    types: ['dragon', 'flying'],

    stats: {
      attack: 134,
      spAttack: 100,
      defense: 95,
      spDefense: 100,
      hp: 91,
      speed: 80,
    },
  },
  {
    id: 68,
    name: 'Machamp',
    avatar: '',
    types: ['fighting'],

    stats: {
      attack: 130,
      spAttack: 65,
      defense: 80,
      spDefense: 85,
      hp: 90,
      speed: 55,
    },
  },
  {
    id: 112,
    name: 'Rhydon',
    avatar: '',
    types: ['rock', 'ground'],

    stats: {
      attack: 130,
      spAttack: 45,
      defense: 120,
      spDefense: 45,
      hp: 105,
      speed: 40,
    },
  },
  {
    id: 130,
    name: 'Gyarados',
    avatar: '',
    types: ['water', 'flying'],

    stats: {
      attack: 125,
      spAttack: 60,
      defense: 79,
      spDefense: 100,
      hp: 95,
      speed: 81,
    },
  },
  {
    id: 94,
    name: 'Gengar',
    avatar: '',
    types: ['ghost', 'poison'],

    stats: {
      attack: 65,
      spAttack: 130,
      defense: 60,
      spDefense: 75,
      hp: 60,
      speed: 110,
    },
  },
  {
    id: 59,
    name: 'Arcanine',
    avatar: '',
    types: ['fire'],

    stats: {
      attack: 110,
      spAttack: 100,
      defense: 80,
      spDefense: 80,
      hp: 90,
      speed: 95,
    },
  },
  {
    id: 103,
    name: 'Exeggutor',
    avatar: '',
    types: ['grass', 'psychic'],

    stats: {
      attack: 95,
      spAttack: 125,
      defense: 85,
      spDefense: 75,
      hp: 95,
      speed: 55,
    },
  },
  {
    id: 131,
    name: 'Lapras',
    avatar: '',
    types: ['water', 'ice'],

    stats: {
      attack: 85,
      spAttack: 85,
      defense: 80,
      spDefense: 95,
      hp: 130,
      speed: 60,
    },
  },
];

export default initialPokemon;
