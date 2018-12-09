import * as React from 'react';

import PokemonListItem from './pokemon-list-item';

import Buttons from '../../components/buttons';
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
import { getTranslation } from '../../../constants/translations';

import { PokemonWithBaseCP } from './pokemon-list.types';

type OwnProps = {
  collection: Array<PokemonWithBaseCP>;
  sort: (key: string) => void;
  handleLoadMore?: () => void;
};

class PokemonListView extends React.Component<OwnProps> {
  static displayName = 'PokemonListView';

  render() {
    const { handleLoadMore, collection, sort } = this.props;

    return (
      <React.Fragment>
        <Table
          className="PokemonList"
          headings={[
            {
              label: '#',
              onClick: () => sort('id'),
            },
            // {
            //   label: getTranslation('pokemon-avatar'),
            // },
            {
              label: getTranslation('pokemon-name'),
              onClick: () => sort('name'),
            },
            {
              label: getTranslation('pokemon-type-1'),
            },
            {
              label: getTranslation('pokemon-type-2'),
            },
            {
              label: getTranslation('pokemon-base-cp'),
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

        {handleLoadMore && (
          <Buttons
            align="center"
            options={[
              {
                id: 'load-more',
                type: 'button',
                label: getTranslation('pokemon-load-more'),
                onClick: handleLoadMore,
              },
            ]}
          />
        )}
      </React.Fragment>
    );
  }
}

export default PokemonListView;
