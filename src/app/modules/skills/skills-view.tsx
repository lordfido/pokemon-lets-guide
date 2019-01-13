import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getGameTranslation, getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import Sidebar, { SIDEBAR_SIZE } from '../../components/sidebar';
import Table from '../../components/table';
import SkillsEntry from './skills-entry';
import SkillsFilters from './skills-filters';

import { PADDING_M, PADDING_XXL } from '../../../constants/styles/styles';
import { TEXT_DARK } from '../../../constants/styles/styles-fonts';
import { DESKTOP_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';
import { IFieldOutput, IOption } from '../forms/form.models';
import { IRichSkill, ISkillsFilters } from './skills.models';

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
  collection: IRichSkill[];
  handleSortBy: (key: string) => void;
  skillList: IOption[];
  handleSkillChange: (field: IFieldOutput) => void;
  filters: ISkillsFilters;
  handleFilterChange: (field: IFieldOutput) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleLoadMore?: () => void;
}

const unstyledSkillsView = ({
  classes,
  collection,
  handleSortBy,
  skillList,
  handleSkillChange,
  filters,
  handleFilterChange,
  handleReset,
  handleSubmit,
  handleLoadMore,
}: IOwnProps) => (
  <>
    <Sidebar
      render={isOpen => (
        <SkillsFilters
          classNames={{
            form: classes.form,
            formField: classnames(classes.formField, { [classes.formFieldOpen]: isOpen }),
          }}
          skillList={skillList}
          handleSkillChange={handleSkillChange}
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
        {collection.map((skill, index) => (
          <SkillsEntry key={index} className={classes.resultsEntry} skill={skill} />
        ))}
      </Table>

      {handleLoadMore && (
        <Buttons
          align="center"
          options={[
            {
              id: 'load-more',
              label: getUiTranslation('skills-load-more'),
              onClick: handleLoadMore,
              type: 'button',
            },
          ]}
        />
      )}
    </div>
  </>
);

const SkillsView = injectSheet(sheet)(unstyledSkillsView);

export default SkillsView;
