import * as React from 'react';

import HeaderView from './header-view';

class HeaderWrapper extends React.Component {
  public static displayName = 'HeaderWrapper';

  public render() {
    return <HeaderView />;
  }
}

export default HeaderWrapper;
