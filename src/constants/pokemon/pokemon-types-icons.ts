import { Types } from 'pokelab';

const typeIcons = {
  [Types.Bug]: require('../../assets/images/type-icons/bug.png'),
  [Types.Dark]: require('../../assets/images/type-icons/dark.png'),
  [Types.Dragon]: require('../../assets/images/type-icons/dragon.png'),
  [Types.Electric]: require('../../assets/images/type-icons/electric.png'),
  [Types.Fairy]: require('../../assets/images/type-icons/fairy.png'),
  [Types.Fighting]: require('../../assets/images/type-icons/fighting.png'),
  [Types.Fire]: require('../../assets/images/type-icons/fire.png'),
  [Types.Flying]: require('../../assets/images/type-icons/flying.png'),
  [Types.Grass]: require('../../assets/images/type-icons/grass.png'),
  [Types.Ghost]: require('../../assets/images/type-icons/ghost.png'),
  [Types.Ground]: require('../../assets/images/type-icons/ground.png'),
  [Types.Ice]: require('../../assets/images/type-icons/ice.png'),
  [Types.Normal]: require('../../assets/images/type-icons/normal.png'),
  [Types.Poison]: require('../../assets/images/type-icons/poison.png'),
  [Types.Psychic]: require('../../assets/images/type-icons/psychic.png'),
  [Types.Rock]: require('../../assets/images/type-icons/rock.png'),
  [Types.Steel]: require('../../assets/images/type-icons/steel.png'),
  [Types.Water]: require('../../assets/images/type-icons/water.png'),
};

export const getTypeIcon = (pokemonType: Types.Type): string => typeIcons[pokemonType];
