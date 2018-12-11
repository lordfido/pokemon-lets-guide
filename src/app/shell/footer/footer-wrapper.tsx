import * as React from 'react';
import { setInstallationData } from '../../utils/installation';

import FooterView from './footer-view';

class FooterWrapper extends React.Component {
  public static displayName = 'FooterWrapper';

  public handleLanguageSelection = (language: string) => {
    setInstallationData({
      language: {
        override: true,
        value: language,
      },
    });
  };

  public render() {
    return <FooterView handleLanguageSelection={this.handleLanguageSelection} />;
  }
}

export default FooterWrapper;
