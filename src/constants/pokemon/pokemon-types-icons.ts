import { Types } from 'pokelab';
import { CSSProperties } from 'react';
import { TABLET_OR_LANDSCAPE } from '../styles/styles-media-queries';

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

const midRotation = 28;
const bigRotation = 36;

const typesWaterMarks = {
  [Types.Bug]: {
    right: 48,
    top: -7,
    transform: `rotate(${midRotation}deg)`,
    width: 108,
  },
  [Types.Dark]: {
    right: 48,
    top: -28,
    transform: `rotate(${bigRotation}deg)`,
    width: 108,
  },
  [Types.Dragon]: {
    right: 50,
    top: -40,
    transform: `rotate(${-18}deg)`,
    width: 118,
  },
  [Types.Electric]: {
    right: 36,
    top: -32,
    transform: `rotate(${-18}deg)`,
    width: 108,
  },
  [Types.Fairy]: {
    right: 36,
    top: -28,
    transform: `rotate(${18}deg)`,
    width: 108,
  },
  [Types.Fighting]: {
    right: 56,
    top: -12,
    transform: `rotate(${18}deg)`,
    width: 78,
  },
  [Types.Fire]: {
    right: 36,
    top: -24,
    transform: `rotate(${42}deg)`,
    width: 108,
  },
  [Types.Flying]: {
    right: 36,
    top: -32,
    transform: `rotate(${24}deg)`,
    width: 108,
  },
  [Types.Grass]: {
    right: 48,
    top: -32,
    transform: `rotate(${8}deg)`,
    width: 108,
  },
  [Types.Ghost]: {
    right: 48,
    top: -24,
    transform: `rotate(${8}deg)`,
    width: 108,
  },
  [Types.Ground]: {
    right: 40,
    top: -16,
    transform: `rotate(${18}deg)`,
    width: 108,
  },
  [Types.Ice]: {
    right: 48,
    top: -32,
    transform: `rotate(${-12}deg)`,
    width: 108,
  },
  [Types.Normal]: {
    right: 56,
    top: -8,
    width: 78,
  },
  [Types.Poison]: {
    right: 48,
    top: -36,
    transform: `rotate(${36}deg)`,
    width: 88,
  },
  [Types.Psychic]: {
    right: 48,
    top: -28,
    width: 108,
  },
  [Types.Rock]: {
    right: 48,
    top: -32,
    width: 108,
  },
  [Types.Steel]: {
    right: 56,
    top: -12,
    transform: `rotate(${-18}deg)`,
    width: 108,
  },
  [Types.Water]: {
    right: 40,
    top: -32,
    transform: `rotate(${36}deg)`,
    width: 108,
  },
};

export const getTypeWaterMarkStyles = (pokemonType: Types.Type): CSSProperties => ({
  ...typesWaterMarks[pokemonType],
  display: 'none',
});
