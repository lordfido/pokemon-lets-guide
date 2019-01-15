import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getGameTranslation, getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import Table from '../../components/table';
import MovesEntry from './moves-entry';
import MovesFilters from './moves-filters';

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
};

interface IOwnProps {
  classes: { [key: string]: string };
  collection: IRichMove[];
  handleSortBy: (key: string) => void;
  movesList: IOption[];
  handleMoveChange: (field: IFieldOutput) => void;
  filters: IMovesFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleLoadMore?: () => void;
}

const unstyledMovesView = ({
  classes,
  collection,
  handleSortBy,
  movesList,
  handleMoveChange,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
  handleLoadMore,
}: IOwnProps) => (
  <>
    <Sidebar
      render={isOpen => (
        <MovesFilters
          classNames={{
            form: classes.form,
            formField: classnames(classes.formField, { [classes.formFieldOpen]: isOpen }),
          }}
          movesList={movesList}
          handleMoveChange={handleMoveChange}
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
            label: getGameTranslation('name'),
            onClick: () => handleSortBy('name'),
          },
          {
            label: getGameTranslation('type'),
            onClick: () => handleSortBy('types.ownType'),
          },
          {
            label: getGameTranslation('category'),
            onClick: () => handleSortBy('category'),
          },
          {
            label: getGameTranslation('power'),
            onClick: () => handleSortBy('power'),
          },
          {
            label: getGameTranslation('accuracy'),
            onClick: () => handleSortBy('accuracy'),
          },
          {
            label: getGameTranslation('pp'),
            onClick: () => handleSortBy('pp'),
          },
          {
            label: getGameTranslation('tm'),
            onClick: () => handleSortBy('tm'),
          },
          {
            label: getGameTranslation('probability'),
            onClick: () => handleSortBy('probability'),
          },
          {
            label: '',
            style: {
              backgroundColor: 'transparent',
            },
          },
        ]}
      >
        {collection.map((move, index) => (
          <MovesEntry key={index} className={classes.resultsEntry} move={move} />
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

const MovesView = injectSheet(sheet)(unstyledMovesView);

export default MovesView;