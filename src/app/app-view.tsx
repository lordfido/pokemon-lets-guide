import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isInstalledPWA } from '../common/utils/platforms';

import FooterWrapper from './shell/footer/footer-wrapper';
import HeaderWrapper from './shell/header/header-wrapper';

import { HOME } from '../constants/appRoutes';

class AppView extends React.Component {
  public static displayName = 'AppView';

  public render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Link className="HomeButton" to={{ pathname: HOME }} />
        <div
          id="app"
          className={classnames('App', {
            'is-pwa': isInstalledPWA(),
          })}
        >
          <HeaderWrapper />
          <div className="App-content">{children}</div>
          <FooterWrapper />
        </div>
      </React.Fragment>
    );
  }
}

export default AppView;
