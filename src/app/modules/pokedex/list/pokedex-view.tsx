import chroma from 'chroma-js';
import classnames from 'classnames';
import * as React from 'react';
import { getTranslation } from '../../../utils/translations';

import Buttons from '../../../components/buttons';
import Table from '../../../components/table';
import PokedexEntry from './pokedex-entry';
import PokedexFilters from './pokedex-filters';

import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
} from '../../../../constants/pokemon-stats';
import { getStatColor } from '../../../../constants/pokemon-stats-color';
import { getStatName } from '../../../../constants/pokemon-stats-name';

import { IPokedexFilters, IPokemonWithBaseCP } from '../pokedex.models';

interface IOwnProps {
  areFiltersOpen: boolean;
  collection: IPokemonWithBaseCP[];
  filters: IPokedexFilters;
  handleLoadMore?: () => void;
  handleResetFilters: () => void;
  handleSortBy: (key: string) => void;
  handleToggleFilters: () => void;
  handleUpdateFilter: (filter: string, selection: any) => void;
}

const PokedexView = ({
  areFiltersOpen,
  collection,
  filters,
  handleLoadMore,
  handleResetFilters,
  handleSortBy,
  handleToggleFilters,
  handleUpdateFilter,
}: IOwnProps) => {
  const filtersButton = {
    className: 'Search-toggle',
    icon: 'search',
    id: 'toggle-filters',
    onClick: handleToggleFilters,
    type: 'button',
  };

  return (
    <div className="Search">
      <div className={classnames('Search-filters', { ['is-open']: areFiltersOpen })}>
        <Buttons className="Search-buttons" options={[filtersButton]} />

        <PokedexFilters
          filters={filters}
          handleResetFilters={handleResetFilters}
          handleUpdateFilter={handleUpdateFilter}
        />
      </div>
      <div className="Search-results">
        <Table
          className="PokemonList"
          headings={[
            {
              label: '#',
              onClick: () => handleSortBy('id'),
            },
            // {
            //   label: getTranslation('pokemon-avatar'),
            // },
            {
              label: getTranslation('pokemon-name'),
              onClick: () => handleSortBy('name'),
            },
            {
              label: getTranslation('pokemon-type-1'),
            },
            {
              label: getTranslation('pokemon-type-2'),
            },
            {
              label: getTranslation('pokemon-base-cp'),
              onClick: () => handleSortBy('baseCP'),
            },
            {
              label: getStatName(HP_ID),
              onClick: () => handleSortBy(`baseStats.${HP_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(HP_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(ATTACK_ID),
              onClick: () => handleSortBy(`baseStats.${ATTACK_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(ATTACK_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(DEFENSE_ID),
              onClick: () => handleSortBy(`baseStats.${DEFENSE_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(DEFENSE_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(SPEED_ID),
              onClick: () => handleSortBy(`baseStats.${SPEED_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(SPEED_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(SPECIAL_DEFENSE_ID),
              onClick: () => handleSortBy(`baseStats.${SPECIAL_DEFENSE_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(SPECIAL_DEFENSE_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: getStatName(SPECIAL_ATTACK_ID),
              onClick: () => handleSortBy(`baseStats.${SPECIAL_ATTACK_ID}`),
              style: {
                backgroundColor: chroma(getStatColor(SPECIAL_ATTACK_ID))
                  .alpha(0.3)
                  .css(),
              },
            },
            {
              label: '',
              style: {
                backgroundColor: 'transparent',
              },
            },
          ]}
        >
          {collection.map((pokemon, index) => (
            <PokedexEntry key={index} pokemon={pokemon} />
          ))}
        </Table>

        {handleLoadMore && (
          <Buttons
            align="center"
            options={[
              {
                id: 'load-more',
                label: getTranslation('pokemon-load-more'),
                onClick: handleLoadMore,
                type: 'button',
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default PokedexView;
