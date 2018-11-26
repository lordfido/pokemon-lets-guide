import * as React from 'react';

import PokemonListItem from './pokemon-list-item';

import Table from '../../components/table';

import {
  ATTACK_ID,
  SPECIAL_ATTACK_ID,
  DEFENSE_ID,
  SPECIAL_DEFENSE_ID,
  HP_ID,
  SPEED_ID,
  getStatName,
} from '../../../constants/pokemon-stats';

import { Pokemon } from './pokemon-list.types';

type OwnProps = {
  collection: Array<Pokemon>;
  sort: (key: string) => void;
};

class PokemonListView extends React.Component<OwnProps> {
  static displayName = 'PokemonListView';

  render() {
    const { collection, sort } = this.props;

    return (
      <Table
        className="PokemonList"
        headings={[
          {
            label: '#',
            onClick: () => sort('id'),
          },
          {
            label: 'Avatar',
          },
          {
            label: 'Name',
            onClick: () => sort('name'),
          },
          {
            label: 'Type 1',
          },
          {
            label: 'Type 2',
          },
          {
            label: 'Base CP',
            onClick: () => sort('baseCP'),
          },
          {
            label: getStatName(HP_ID),
            onClick: () => sort(`baseStats.${HP_ID}`),
          },
          {
            label: getStatName(ATTACK_ID),
            onClick: () => sort(`baseStats.${ATTACK_ID}`),
          },
          {
            label: getStatName(DEFENSE_ID),
            onClick: () => sort(`baseStats.${DEFENSE_ID}`),
          },
          {
            label: getStatName(SPEED_ID),
            onClick: () => sort(`baseStats.${SPEED_ID}`),
          },
          {
            label: getStatName(SPECIAL_DEFENSE_ID),
            onClick: () => sort(`baseStats.${SPECIAL_DEFENSE_ID}`),
          },
          {
            label: getStatName(SPECIAL_ATTACK_ID),
            onClick: () => sort(`baseStats.${SPECIAL_ATTACK_ID}`),
          },
          { label: '' },
        ]}
      >
        {collection.map((pokemon, index) => (
          <PokemonListItem key={index} pokemon={pokemon} />
        ))}
      </Table>
    );
  }
}

export default PokemonListView;
