import chroma from 'chroma-js';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getPaddedId } from '../../utils/pokemon';
import { getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import PokemonSprite from '../../components/pokemon-sprite';
import { TableCell, TableRow } from '../../components/table';
import Tag from '../../components/tag';

import { CALCULATOR, POKEDEX } from '../../../constants/appRoutes';
import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
} from '../../../constants/pokemon/pokemon-stats';
import { getStatColor } from '../../../constants/pokemon/pokemon-stats-color';
import { getTypeName } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon/pokemon-types-icons';

import { ISheet } from '../../root.models';
import { IPokemonWithBaseCP } from './pokedex.models';

const sheet: ISheet = {
  fullWidth: {
    width: '100%',
  },
  noMargin: {
    margin: 0,
  },
  sprite: {
    marginTop: -5,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  pokemon: IPokemonWithBaseCP;
}

const unstyledPokedexEntry = ({ classes, className, pokemon }: IOwnProps) => (
  <TableRow className={className}>
    {/* National Number */}
    <TableCell center>{getPaddedId(String(pokemon.nationalNumber))}</TableCell>

    {/* Sprite */}
    <TableCell center>
      <PokemonSprite pokemon={pokemon} className={classes.sprite} />
    </TableCell>

    {/* Name */}
    <TableCell ellipsis={true}>{pokemon.name}</TableCell>

    {/* Type 1 */}
    <TableCell center>
      {pokemon.types.ownTypes[0] && (
        <Tag
          key={pokemon.types.ownTypes[0]}
          label={getTypeName(pokemon.types.ownTypes[0])}
          icon={getTypeIcon(pokemon.types.ownTypes[0])}
          backgroundColor={getTypeColor(pokemon.types.ownTypes[0])}
        />
      )}
    </TableCell>

    {/* Type 2 */}
    <TableCell center>
      {pokemon.types.ownTypes[1] && (
        <Tag
          key={pokemon.types.ownTypes[1]}
          label={getTypeName(pokemon.types.ownTypes[1])}
          icon={getTypeIcon(pokemon.types.ownTypes[1])}
          backgroundColor={getTypeColor(pokemon.types.ownTypes[1])}
        />
      )}
    </TableCell>

    {/* Base CP */}
    <TableCell center>{pokemon.baseCP}</TableCell>

    {/* HP */}
    <TableCell
      center
      style={{
        backgroundColor: chroma(getStatColor(HP_ID))
          .alpha(0.2)
          .css(),
        minWidth: 60,
      }}
    >
      {pokemon.baseStats[HP_ID]}
    </TableCell>

    {/* Attack */}
    <TableCell
      center
      style={{
        backgroundColor: chroma(getStatColor(ATTACK_ID))
          .alpha(0.2)
          .css(),
        minWidth: 60,
      }}
    >
      {pokemon.baseStats[ATTACK_ID]}
    </TableCell>

    {/* Defense */}
    <TableCell
      center
      style={{
        backgroundColor: chroma(getStatColor(DEFENSE_ID))
          .alpha(0.2)
          .css(),
        minWidth: 60,
      }}
    >
      {pokemon.baseStats[DEFENSE_ID]}
    </TableCell>

    {/* Speed */}
    <TableCell
      center
      style={{
        backgroundColor: chroma(getStatColor(SPEED_ID))
          .alpha(0.2)
          .css(),
        minWidth: 60,
      }}
    >
      {pokemon.baseStats[SPEED_ID]}
    </TableCell>

    {/* Special Defense */}
    <TableCell
      center
      style={{
        backgroundColor: chroma(getStatColor(SPECIAL_DEFENSE_ID))
          .alpha(0.2)
          .css(),
        minWidth: 60,
      }}
    >
      {pokemon.baseStats[SPECIAL_DEFENSE_ID]}
    </TableCell>

    {/* Special Attack */}
    <TableCell
      center
      style={{
        backgroundColor: chroma(getStatColor(SPECIAL_ATTACK_ID))
          .alpha(0.2)
          .css(),
        minWidth: 60,
      }}
    >
      {pokemon.baseStats[SPECIAL_ATTACK_ID]}
    </TableCell>

    {/* Quick Actions */}
    <TableCell center style={{ height: 'auto' }}>
      <Buttons
        className={classnames(classes.fullWidth, classes.noMargin)}
        align="left"
        options={[
          {
            className: classes.noMargin,
            id: `${pokemon.id.toString()}-details`,
            label: getUiTranslation('pokedex-details'),
            to: POKEDEX.replace(':id?', String(pokemon.id)),
            type: 'button',
          },
          {
            className: classes.noMargin,
            id: `${pokemon.id.toString()}-calculator`,
            label: getUiTranslation('header-calculator'),
            to: CALCULATOR.replace(':id?', String(pokemon.id)),
            type: 'button',
          },
        ]}
      />
    </TableCell>
  </TableRow>
);

const PokedexEntry = injectSheet(sheet)(unstyledPokedexEntry);

export default PokedexEntry;
