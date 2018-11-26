import * as React from 'react';
import { Link } from 'react-router-dom';

import { HOME, SEARCH } from '../../../constants/appRoutes';

class HeaderView extends React.Component {
  static displayName = 'HeaderView';

  render() {
    return (
      <header className="Header">
        <Link to={{ pathname: HOME }}>Home</Link>
        <Link to={{ pathname: SEARCH.replace(':query', 'types=psychic,fighting') }}>Search</Link>
      </header>
    );
  }
}

export default HeaderView;
