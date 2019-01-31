import * as React from 'react';
import injectSheet from 'react-jss';
import { getUiTranslation } from '../../utils/translations';

import HeaderItem from './header-item';

import { CALCULATOR, HOME, MOVES, POKEDEX } from '../../../constants/appRoutes';
import { HEADER_SIZE } from '../../../constants/styles/styles';
import { BLACK } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';

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
  showLandingHeader?: boolean;
}

const unstyledHeaderView = ({ classes, showLandingHeader }: IOwnProps) => {
  if (showLandingHeader) {
    return null;
  }

  return (
    <header className={classes.wrapper}>
      <HeaderItem image={require('../../../assets/images/home.png')} to={HOME} />
      <HeaderItem
        hoverEffect={true}
        image={require('../../../assets/images/pokedex.png')}
        text={getUiTranslation('header-pokedex')}
        to={POKEDEX.replace(':id?', '')}
      />
      <HeaderItem
        hoverEffect={true}
        image={require('../../../assets/images/moves.png')}
        text={getUiTranslation('header-moves')}
        to={MOVES.replace(':id?', '')}
      />
      <HeaderItem
        hoverEffect={true}
        image={require('../../../assets/images/calculator.png')}
        text={getUiTranslation('header-calculator')}
        to={CALCULATOR.replace(':id?', '')}
      />
    </header>
  );
};

const HeaderView = injectSheet(sheet)(unstyledHeaderView);

export default HeaderView;
