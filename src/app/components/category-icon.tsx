import * as React from 'react';
import injectSheet from 'react-jss';

import { SkillCategory } from '../../constants/skills/skills-categories';
import { getCategoryIcon } from '../../constants/skills/skills-categories-icons';
import { BORDER_RADIUS } from '../../constants/styles/styles';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  image: {
    borderRadius: BORDER_RADIUS,
    maxHeight: 24,
    verticalAlign: 'middle',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  category: SkillCategory;
}

const unstyledCategoryIcon = ({ classes, category }: IOwnProps) =>
  category ? (
    <img className={classes.image} src={getCategoryIcon(category)} alt={`${category} category icon`} />
  ) : (
    <span>{'-'}</span>
  );

const CategoryIcon = injectSheet(sheet)(unstyledCategoryIcon);

export default CategoryIcon;
