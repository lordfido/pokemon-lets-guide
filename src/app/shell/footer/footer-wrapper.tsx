import * as React from 'react';
import { setInstallationData } from '../../utils/installation';

import FooterView from './footer-view';

class FooterWrapper extends React.Component {
  static displayName = 'FooterWrapper';

  handleLanguageSelection = (language: string) => {
    setInstallationData({
      language: {
        value: language,
        override: true,
      },
    });
  };

  render() {
    return <FooterView handleLanguageSelection={this.handleLanguageSelection} />;
  }
}

export default FooterWrapper;
