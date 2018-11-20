import * as React from 'react';
import { isProduction } from '../../../common/utils/platforms';

import { APP_NAME } from '../../../constants/branding';

const packageJson = require('../../../../package.json');
const APP_VERSION = packageJson.version;

class FooterView extends React.Component {
  static displayName = 'FooterView';

  render() {
    return (
      <footer className="Page Footer">
        <div className="Footer-wrapper">
          <p className="Footer-text">
            {APP_NAME} {!isProduction() && `v${APP_VERSION}`} | {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    );
  }
}

export default FooterView;
