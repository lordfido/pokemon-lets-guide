import chroma from 'chroma-js';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getGameTranslation, getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import Table from '../../components/table';
import PokedexEntry from './pokedex-entry';
import PokedexFilters from './pokedex-filters';

import {
  ATTACK_ID,
  DEFENSE_ID,
  HP_ID,
  SPECIAL_ATTACK_ID,
  SPECIAL_DEFENSE_ID,
  SPEED_ID,
} from '../../../constants/pokemon/pokemon-stats';
import { getStatColor } from '../../../constants/pokemon/pokemon-stats-color';
import { getStatName } from '../../../constants/pokemon/pokemon-stats-name';
import { PADDING_M, PADDING_XXL } from '../../../constants/styles/styles';
import { TEXT_DARK } from '../../../constants/styles/styles-fonts';
import { DESKTOP_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IFieldOutput, IOption } from '../forms/form.models';
import { IPokedexFilters, IPokemonWithBaseCP } from './pokedex.models';

const sheet: ISheet = {
  results: {
    padding: PADDING_XXL,

    [DESKTOP_L]: {
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'top',
      width: `calc(100% - ${SIDEBAR_SIZE}px)`,
    },
  },
  resultsEntry: {
    color: TEXT_DARK,
    opacity: 0.7,
    transition: 'opacity 0.2s',

    '&:active, &:focus, &:hover': {
      opacity: 1,
    },
  },

  form: {
    padding: `0 ${PADDING_M}px`,

    [DESKTOP_L]: {
      padding: 0,
    },
  },
  formField: {
    display: 'inline-block',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',

    [DESKTOP_L]: {
      display: 'inline-block',
      opacity: 1,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  collection: IPokemonWithBaseCP[];
  handleSortBy: (key: string) => void;
  pokemonList: IOption[];
  handlePokemonChange: (field: IFieldOutput) => void;
  filters: IPokedexFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleLoadMore?: () => void;
}

const unstyledPokedexView = ({
  classes,
  collection,
  handleSortBy,
  pokemonList,
  handlePokemonChange,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
  handleLoadMore,
}: IOwnProps) => (
  <>
    <Sidebar
      render={isOpen => (
        <PokedexFilters
          classNames={{
            form: classes.form,
            formField: classnames(classes.formField, { [classes.formFieldOpen]: isOpen }),
          }}
          pokemonList={pokemonList}
          handlePokemonChange={handlePokemonChange}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      )}
    />
    <div className={classes.results}>
      <Table
        headings={[
          {
            label: '#',
            onClick: () => handleSortBy('id'),
          },
          {
            label: getGameTranslation('name'),
            onClick: () => handleSortBy('name'),
          },
          {
            label: getGameTranslation('type-1'),
          },
          {
            label: getGameTranslation('type-2'),
          },
          {
            label: getGameTranslation('base-cp'),
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
          <PokedexEntry key={index} className={classes.resultsEntry} pokemon={pokemon} />
        ))}
      </Table>

      {handleLoadMore && (
        <Buttons
          align="center"
          options={[
            {
              id: 'load-more',
              label: getUiTranslation('pokedex-load-more'),
              onClick: handleLoadMore,
              type: 'button',
            },
          ]}
        />
      )}
    </div>
  </>
);

const PokedexView = injectSheet(sheet)(unstyledPokedexView);

export default PokedexView;
