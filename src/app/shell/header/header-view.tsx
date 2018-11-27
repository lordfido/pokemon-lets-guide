import * as React from 'react';
import { Link } from 'react-router-dom';

import { HOME, SEARCH } from '../../../constants/appRoutes';
import CustomImage from '../../components/image';

class HeaderView extends React.Component {
  static displayName = 'HeaderView';

  render() {
    return (
      <header className="Header">
        <Link className="Header-item" to={{ pathname: HOME }}>
          <CustomImage src={require('../../../assets/images/pokeball.png')} className="Header-logo" />
        </Link>
        {false && (
          <Link className="Header-item" to={{ pathname: SEARCH.replace(':query', 'types=psychic,fighting') }}>
            Search
          </Link>
        )}
      </header>
    );
  }
}

export default HeaderView;
