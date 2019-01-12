import * as React from 'react';
import injectSheet from 'react-jss';
import { getTranslation } from '../../utils/translations';

import HeaderItem from './header-item';

import { CALCULATOR, HOME, POKEDEX } from '../../../constants/appRoutes';
import { HEADER_SIZE } from '../../../constants/styles';
import { BLACK } from '../../../constants/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles-fonts';

import { ISheet } from '../../root.models';

const sheet: ISheet = {
  wrapper: {
    backgroundColor: BLACK,
    color: TEXT_WHITE,
    flexShrink: 0,
    height: HEADER_SIZE,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
}

const unstyledHeaderView = ({ classes }: IOwnProps) => (
  <header className={classes.wrapper}>
    <HeaderItem image={require('../../../assets/images/home.png')} to={HOME} />
    <HeaderItem
      image={require('../../../assets/images/pokedex.png')}
      text={getTranslation('header-pokedex')}
      to={POKEDEX.replace(':id?', '')}
    />
    <HeaderItem image={require('../../../assets/images/skills.png')} text={getTranslation('header-skills')} />
    <HeaderItem
      image={require('../../../assets/images/calculator.png')}
      text={getTranslation('header-calculator')}
      to={CALCULATOR.replace(':id?', '')}
    />
  </header>
);

const HeaderView = injectSheet(sheet)(unstyledHeaderView);

export default HeaderView;
