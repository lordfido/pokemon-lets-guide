import * as React from 'react';

import { HOME, POKEDEX } from '../../../constants/appRoutes';
import { getTranslation } from '../../utils/translations';
import HeaderItem from './header-item';

class HeaderView extends React.Component {
  public static displayName = 'HeaderView';

  public render() {
    return (
      <header className="Header">
        <HeaderItem image={require('../../../assets/images/home.png')} to={HOME} />
        <HeaderItem
          image={require('../../../assets/images/pokedex.png')}
          text={getTranslation('header-pokedex')}
          to={POKEDEX}
        />
        <HeaderItem image={require('../../../assets/images/skills.png')} text={getTranslation('header-skills')} />
        <HeaderItem
          image={require('../../../assets/images/calculator.png')}
          text={getTranslation('header-calculator')}
        />
      </header>
    );
  }
}

export default HeaderView;
