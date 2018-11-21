import { Pokemon } from '../../app/modules/pokemon-list/pokemon-list.types';

const initialPokemon: Array<Pokemon> = [
  {
    id: 25,
    name: 'Pikachu',
    description: '',
    avatar: '',
    types: ['electric'],

    stats: {
      attack: 55,
      spAttack: 50,
      defense: 40,
      spDefense: 50,
      hp: 35,
      speed: 90,
    },

    pokedexEntry: '',
  },
  {
    id: 26,
    name: 'Raichu',
    description: '',
    avatar: '',
    types: ['electric'],

    stats: {
      attack: 90,
      spAttack: 90,
      defense: 55,
      spDefense: 80,
      hp: 60,
      speed: 110,
    },

    pokedexEntry: '',
  },
  {
    id: 58,
    name: 'Growlithe',
    description: '',
    avatar: '',
    types: ['fire'],

    stats: {
      attack: 70,
      spAttack: 70,
      defense: 45,
      spDefense: 50,
      hp: 55,
      speed: 60,
    },

    pokedexEntry: '',
  },
  {
    id: 59,
    name: 'Arcanine',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 66,
    name: 'Machop',
    description: '',
    avatar: '',
    types: ['fighting'],

    stats: {
      attack: 80,
      spAttack: 35,
      defense: 50,
      spDefense: 35,
      hp: 70,
      speed: 35,
    },

    pokedexEntry: '',
  },
  {
    id: 67,
    name: 'Machoke',
    description: '',
    avatar: '',
    types: ['fighting'],

    stats: {
      attack: 100,
      spAttack: 50,
      defense: 70,
      spDefense: 60,
      hp: 80,
      speed: 45,
    },

    pokedexEntry: '',
  },
  {
    id: 68,
    name: 'Machamp',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 92,
    name: 'Gastly',
    description: '',
    avatar: '',
    types: ['ghost', 'poison'],

    stats: {
      attack: 35,
      spAttack: 100,
      defense: 30,
      spDefense: 35,
      hp: 30,
      speed: 80,
    },

    pokedexEntry: '',
  },
  {
    id: 93,
    name: 'Haunter',
    description: 'Funny ghost',
    avatar: '',
    types: ['ghost', 'poison'],

    stats: {
      attack: 50,
      spAttack: 115,
      defense: 45,
      spDefense: 55,
      hp: 45,
      speed: 95,
    },

    pokedexEntry:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 94,
    name: 'Gengar',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 102,
    name: 'Exeggcute',
    description: '',
    avatar: '',
    types: ['grass', 'psychic'],

    stats: {
      attack: 40,
      spAttack: 60,
      defense: 80,
      spDefense: 45,
      hp: 60,
      speed: 40,
    },

    pokedexEntry: '',
  },
  {
    id: 103,
    name: 'Exeggutor',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 111,
    name: 'Rhyhorn',
    description: '',
    avatar: '',
    types: ['rock', 'ground'],

    stats: {
      attack: 85,
      spAttack: 30,
      defense: 95,
      spDefense: 30,
      hp: 80,
      speed: 25,
    },

    pokedexEntry: '',
  },
  {
    id: 112,
    name: 'Rhydon',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 129,
    name: 'Magikarp',
    description: '',
    avatar: '',
    types: ['water'],

    stats: {
      attack: 10,
      spAttack: 15,
      defense: 55,
      spDefense: 20,
      hp: 20,
      speed: 80,
    },

    pokedexEntry: '',
  },
  {
    id: 130,
    name: 'Gyarados',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 131,
    name: 'Lapras',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 147,
    name: 'Dratini',
    description: '',
    avatar: '',
    types: ['dragon'],

    stats: {
      attack: 64,
      spAttack: 50,
      defense: 45,
      spDefense: 50,
      hp: 41,
      speed: 50,
    },

    pokedexEntry: '',
  },
  {
    id: 148,
    name: 'Dragonair',
    description: '',
    avatar: '',
    types: ['dragon'],

    stats: {
      attack: 84,
      spAttack: 70,
      defense: 65,
      spDefense: 70,
      hp: 61,
      speed: 70,
    },

    pokedexEntry: '',
  },
  {
    id: 149,
    name: 'Dragonite',
    description: '',
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

    pokedexEntry: '',
  },
  {
    id: 151,
    name: 'Mew',
    description: '',
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

    pokedexEntry:
      'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
  },
  {
    id: 808,
    name: 'Meltan',
    description: '',
    avatar: '',
    types: ['steel'],

    stats: {
      attack: 65,
      spAttack: 55,
      defense: 65,
      spDefense: 35,
      hp: 46,
      speed: 34,
    },

    pokedexEntry: '',
  },
  {
    id: 809,
    name: 'Melmetal',
    description: '',
    avatar: '',
    types: ['steel'],

    stats: {
      attack: 143,
      spAttack: 80,
      defense: 143,
      spDefense: 65,
      hp: 135,
      speed: 34,
    },

    pokedexEntry: '',
  },
];

export default initialPokemon;
