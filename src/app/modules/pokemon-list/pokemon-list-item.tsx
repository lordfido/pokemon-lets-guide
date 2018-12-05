import * as React from 'react';
import { capitalize } from '../../utils/strings';
import { getAvatarFromId, getBaseCP } from '../../utils/pokemon';

import { Button } from '../../components/buttons';
import CustomImage from '../../components/image';
import Tag from '../../components/tag';
import { TableRow, TableCell } from '../../components/table';

import { POKEMON } from '../../../constants/appRoutes';
import { getTypeIcon } from '../../../constants/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon-types-color';
import {
  ATTACK_ID,
  SPECIAL_ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_DEFENSE_ID,
  HP_ID,
  SPEED_ID,
} from '../../../constants/pokemon-stats';

import { Pokemon } from './pokemon-list.types';

interface OwnProps {
  pokemon: Pokemon;
}

class PokemonListItem extends React.Component<OwnProps> {
  static displayName = 'PokemonListItem';

  render() {
    const { pokemon } = this.props;

    const avatar = getAvatarFromId(pokemon.id);
    const baseCP = getBaseCP(pokemon.baseStats);

    return (
      <TableRow className="PokemonList-item">
        <TableCell center>{pokemon.id}</TableCell>
        <TableCell center>
          <CustomImage className="PokemonList-image" src={avatar} />
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
        <TableCell center>{baseCP}</TableCell>
        <TableCell center>{pokemon.baseStats[HP_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[ATTACK_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[DEFENSE_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[SPEED_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[SPECIAL_DEFENSE_ID]}</TableCell>
        <TableCell center>{pokemon.baseStats[SPECIAL_ATTACK_ID]}</TableCell>
        <TableCell style={{ height: 'auto' }}>
          <Button
            options={{
              id: pokemon.id.toString(),
              type: 'button',
              label: 'Details',
              to: POKEMON.replace(':id', String(pokemon.id)),
            }}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default PokemonListItem;
