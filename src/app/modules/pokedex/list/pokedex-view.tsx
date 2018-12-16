import chroma from 'chroma-js';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../../utils/translations';

import { IButtonProps } from '../../../components/button';
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
import { PADDING_L, PADDING_XL, PADDING_XXL, PADDING_M, PADDING_S } from '../../../../constants/styles';
import { DESKTOP_L, MOBILE_XL } from '../../../../constants/styles-media-queries';

import { IPokedexFilters, IPokemonWithBaseCP } from '../pokedex.models';
import { ISheet } from '../../../root.models';
import { TEXT_DARK } from '../../../../constants/styles-fonts';

const sidebarSize = 280;

const sheet: ISheet = {
  buttons: {
    margin: 0,
    padding: `0 ${PADDING_L}px`,
    width: '100%',
  },
  filters: {
    maxHeight: 54,
    overflow: 'hidden',
    padding: PADDING_XL,
    paddingBottom: 0,
    textAlign: 'center',
  },
  filtersOpen: {
    maxHeight: 'none',
  },
  results: {
    padding: PADDING_XXL,
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
  },
  formField: {
    display: 'none',
    marginLeft: 0,
    marginRight: 0,
    opacity: 0,
    transition: 'opacity 0.2s',
    width: '100%',

    [MOBILE_XL]: {
      "&[data-type='multi'], &[data-type='number']": {
        width: `calc(50% - ${PADDING_S}px)`,

        '&:nth-child(odd)': {
          marginLeft: PADDING_S,
        },
        '&:nth-child(even)': {
          marginRight: PADDING_S,
        },
      },
    },
  },
  formFieldOpen: {
    display: 'inline-block',
    opacity: 1,
  },

  [DESKTOP_L]: {
    buttons: {
      display: 'none',
    },
    filters: {
      display: 'inline-block',
      height: '100%',
      maxHeight: 'none',
      padding: PADDING_XXL,
      paddingRight: 0,
      textAlign: 'left',
      verticalAlign: 'top',
      width: sidebarSize,
    },
    filtersOpen: {},
    results: {
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'top',
      width: `calc(100% - ${sidebarSize}px)`,
    },

    form: {
      padding: 0,
    },
    formField: {
      display: 'inline-block',
      opacity: 1,

      "&, &[data-type='multi'], &[data-type='number']": {
        width: '100%',

        '&:nth-child(odd), &:nth-child(even)': {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
  },
};

interface IOwnProps {
  areFiltersOpen: boolean;
  classes: { [key: string]: string };
  collection: IPokemonWithBaseCP[];
  filters: IPokedexFilters;
  handleLoadMore?: () => void;
  handleResetFilters: () => void;
  handleSortBy: (key: string) => void;
  handleToggleFilters: () => void;
  handleUpdateFilter: (filter: string, selection: any) => void;
}

const unstyledPokedexView = ({
  areFiltersOpen,
  classes,
  collection,
  filters,
  handleLoadMore,
  handleResetFilters,
  handleSortBy,
  handleToggleFilters,
  handleUpdateFilter,
}: IOwnProps) => {
  const filtersButton: IButtonProps = {
    icon: 'search',
    id: 'toggle-filters',
    onClick: handleToggleFilters,
    type: 'button',
  };

  return (
    <React.Fragment>
      <div className={classnames(classes.filters, areFiltersOpen ? classes.filtersOpen : undefined)}>
        <Buttons className={classes.buttons} options={[filtersButton]} />

        <PokedexFilters
          classNames={{
            form: classes.form,
            formField: classnames(classes.formField, areFiltersOpen ? classes.formFieldOpen : undefined),
          }}
          filters={filters}
          handleResetFilters={handleResetFilters}
          handleUpdateFilter={handleUpdateFilter}
        />
      </div>
      <div className={classes.results}>
        <Table
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
            <PokedexEntry key={index} className={classes.resultsEntry} pokemon={pokemon} />
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
    </React.Fragment>
  );
};

const PokedexView = injectSheet(sheet)(unstyledPokedexView);

export default PokedexView;
