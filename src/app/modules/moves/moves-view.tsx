import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getGameTranslation, getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import Table from '../../components/table';
import MovesEntry from './moves-entry';
import MovesFilters from './moves-filters';

import { getAllMovesConfig } from '../../../constants/configs/moves';
import { PADDING_M, PADDING_XXL } from '../../../constants/styles/styles';
import { TEXT_DARK } from '../../../constants/styles/styles-fonts';
import { DESKTOP_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IFieldOutput, IOption } from '../forms/form.models';
import { IMovesFilters, IRichMove } from './moves.models';

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
  modalOpen: {
    filter: 'blur(3px)',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  collection: IRichMove[];
  isModalOpen: boolean;
  handleSortBy: (key: string) => void;
  movesList: IOption[];
  pokemonList: IOption[];
  filters: IMovesFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleLoadMore?: () => void;
}

const unstyledMovesView = ({
  classes,
  collection,
  isModalOpen,
  handleSortBy,
  movesList,
  pokemonList,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
  handleLoadMore,
}: IOwnProps) => {
  const movesConfig = getAllMovesConfig();

  return (
    <>
      <Sidebar
        className={classnames({ [classes.modalOpen]: isModalOpen })}
        render={isOpen => (
          <MovesFilters
            classNames={{
              form: classes.form,
              formField: classnames(classes.formField, { [classes.formFieldOpen]: isOpen }),
            }}
            movesList={movesList}
            pokemonList={pokemonList}
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
          />
        )}
      />
      <div className={classnames(classes.results, { [classes.modalOpen]: isModalOpen })}>
        <Table
          headings={[
            movesConfig.showId
              ? {
                  label: getGameTranslation('id'),
                  onClick: () => handleSortBy('id'),
                }
              : {},
            movesConfig.showName
              ? {
                  label: getGameTranslation('name'),
                  onClick: () => handleSortBy('name'),
                }
              : {},
            movesConfig.showType
              ? {
                  label: getGameTranslation('type'),
                  onClick: () => handleSortBy('types.ownType'),
                }
              : {},
            movesConfig.showCategory
              ? {
                  label: getGameTranslation('category'),
                  onClick: () => handleSortBy('category'),
                }
              : {},
            movesConfig.showPower
              ? {
                  label: getGameTranslation('power'),
                  onClick: () => handleSortBy('power'),
                }
              : {},
            movesConfig.showAccuracy
              ? {
                  label: getGameTranslation('accuracy'),
                  onClick: () => handleSortBy('accuracy'),
                }
              : {},
            movesConfig.showPp
              ? {
                  label: getGameTranslation('pp'),
                  onClick: () => handleSortBy('pp'),
                }
              : {},
            movesConfig.showTm
              ? {
                  label: getGameTranslation('tm'),
                  onClick: () => handleSortBy('tm'),
                }
              : {},
            movesConfig.showProbability
              ? {
                  label: getGameTranslation('probability'),
                  onClick: () => handleSortBy('probability'),
                }
              : {},
            movesConfig.showActions
              ? {
                  label: '',
                  style: {
                    backgroundColor: 'transparent',
                  },
                }
              : {},
          ]}
        >
          {collection.map((move, index) => (
            <MovesEntry key={index} className={classes.resultsEntry} config={movesConfig} move={move} />
          ))}
        </Table>

        {handleLoadMore && (
          <Buttons
            align="center"
            options={[
              {
                id: 'load-more',
                label: getUiTranslation('moves-load-more'),
                onClick: handleLoadMore,
                type: 'button',
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

const MovesView = injectSheet(sheet)(unstyledMovesView);

export default MovesView;
