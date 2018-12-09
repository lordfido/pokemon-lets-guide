import * as React from 'react';
import { Link } from 'react-router-dom';

import { HOME } from '../../../constants/appRoutes';
import CustomImage from '../../components/image';
import { getTranslation } from '../../utils/translations';

class HeaderView extends React.Component {
  static displayName = 'HeaderView';

  render() {
    return (
      <header className="Header">
        <Link className="Header-item" to={{ pathname: HOME }}>
          <CustomImage
            src={require('../../../assets/images/pokeball.png')}
            className="Header-logo"
            alt={getTranslation('header-go-home')}
          />
        </Link>
      </header>
    );
  }
}

export default HeaderView;
