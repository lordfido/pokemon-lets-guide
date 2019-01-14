import * as React from 'react';
import injectSheet from 'react-jss';

import { MovesCategory } from '../../constants/moves/moves-categories';
import { getMovesCategoryIcon } from '../../constants/moves/moves-categories-icons';
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
  category?: MovesCategory;
}

const unstyledCategoryIcon = ({ classes, category }: IOwnProps) =>
  category ? (
    <img className={classes.image} src={getMovesCategoryIcon(category)} alt={`${category} category icon`} />
  ) : (
    <span>{'-'}</span>
  );

const CategoryIcon = injectSheet(sheet)(unstyledCategoryIcon);

export default CategoryIcon;
