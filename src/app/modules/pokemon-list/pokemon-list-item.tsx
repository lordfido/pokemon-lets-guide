import * as React from 'react';
import { capitalize } from '../../utils/strings';

import Tag from '../../components/tag';
import { TableRow, TableCell } from '../../components/table';

import { POKEMON } from '../../../constants/appRoutes';
import { getTypeIcon } from '../../../constants/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon-types-color';

import { Pokemon } from './pokemon-list.types';
import CustomImage from '../../components/image';
import {
  ATTACK_ID,
  SPECIAL_ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_DEFENSE_ID,
  HP_ID,
  SPEED_ID,
} from '../../../constants/pokemon-stats';
import { Link } from 'react-router-dom';

interface OwnProps {
  pokemon: Pokemon;
}

class PokemonListItem extends React.Component<OwnProps> {
  static displayName = 'PokemonListItem';

  render() {
    const { pokemon } = this.props;

    return (
      <TableRow className="PokemonList-item">
        <TableCell center>{pokemon.id}</TableCell>
        <TableCell center>
          <CustomImage className="PokemonList-image" src={pokemon.avatar} />
        </TableCell>
        <TableCell>{pokemon.name}</TableCell>
        <TableCell center>
          {pokemon.types.ownTypes[0] && (
            <Tag
              key={pokemon.types.ownTypes[0]}
              label={capitalize(pokemon.types.ownTypes[0])}
              icon={getTypeIcon(pokemon.types.ownTypes[0])}
              backgroundColor={getTypeColor(pokemon.types.ownTypes[0])}
            />
          )}
        </TableCell>
        <TableCell center>
          {pokemon.types.ownTypes[1] && (
            <Tag
              key={pokemon.types.ownTypes[1]}
              label={capitalize(pokemon.types.ownTypes[1])}
              icon={getTypeIcon(pokemon.types.ownTypes[1])}
              backgroundColor={getTypeColor(pokemon.types.ownTypes[1])}
            />
          )}
        </TableCell>
        <TableCell center>{pokemon.baseCP}</TableCell>
        <TableCell center>{pokemon.baseStats[HP_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[ATTACK_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[DEFENSE_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[SPEED_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[SPECIAL_DEFENSE_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[SPECIAL_ATTACK_ID]}</TableCell>
        <TableCell>
          <Link className="Button" to={{ pathname: POKEMON.replace(':id', String(pokemon.id)) }}>
            Details
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default PokemonListItem;
