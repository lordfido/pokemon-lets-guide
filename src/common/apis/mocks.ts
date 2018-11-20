import { Pokemon } from '../../app/modules/pokemon/pokemon.types';

const initialPokemon: Array<Pokemon> = [
  {
    id: 1,
    name: 'Mewtwo',
    avatar: '',
    types: ['psychic'],

    stats: {
      attack: 110,
      spAttack: 154,
      defense: 90,
      spDefense: 90,
      hp: 106,
      speed: 130,
    },
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    name: 'Kingler',
    avatar: '',
    types: ['water'],

    stats: {
      attack: 130,
      spAttack: 50,
      defense: 115,
      spDefense: 50,
      hp: 55,
      speed: 75,
    },
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
];

export default initialPokemon;
