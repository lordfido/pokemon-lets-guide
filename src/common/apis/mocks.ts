import { IAdditionalPokemonInfo } from '../../app/modules/pokedex/pokedex.models';
import { ISkillWithType } from '../../app/modules/skills/skills.models';

const scrappedSkills = require('../../../scrapped_data/skills.json');

export const mockedPokemonCollection: IAdditionalPokemonInfo[] = [
  {
    description: '',
    id: '25',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '26',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '58',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '59',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '66',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '67',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '68',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '92',
    pokedexEntry: '',
  },
  {
    description: 'Funny ghost',
    id: '93',
    pokedexEntry:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    description: '',
    id: '94',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '102',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '103',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '111',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '112',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '129',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '130',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '131',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '147',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '148',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '149',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '151',
    pokedexEntry:
      'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
  },
  {
    description: '',
    id: '808',
    pokedexEntry: '',
  },
  {
    description: '',
    id: '809',
    pokedexEntry: '',
  },
];

export const mockedSkillsCollection: ISkillWithType[] = scrappedSkills.map((skill: ISkillWithType, index: number) => ({
  ...skill,
  id: index + 1,
}));
