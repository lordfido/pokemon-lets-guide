import * as React from 'react';
import chroma from 'chroma-js';

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
} from '../../../constants/pokemon-stats';
import { getStatName } from '../../../constants/pokemon-stats-name';
import { getTranslation } from '../../utils/translations';

import { PokemonWithBaseCP } from './pokemon-list.types';
import { getStatColor } from '../../../constants/pokemon-stats-color';

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
              style: {
                backgroundColor: chroma(getStatColor(HP_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(ATTACK_ID),
              onClick: () => sort(`baseStats.${ATTACK_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(ATTACK_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(DEFENSE_ID),
              onClick: () => sort(`baseStats.${DEFENSE_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(DEFENSE_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(SPEED_ID),
              onClick: () => sort(`baseStats.${SPEED_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(SPEED_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(SPECIAL_DEFENSE_ID),
              onClick: () => sort(`baseStats.${SPECIAL_DEFENSE_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(SPECIAL_DEFENSE_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(SPECIAL_ATTACK_ID),
              onClick: () => sort(`baseStats.${SPECIAL_ATTACK_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(SPECIAL_ATTACK_ID))
                  .alpha(0.3)
                  .css(),
              },
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
