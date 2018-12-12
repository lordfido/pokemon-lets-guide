import * as React from 'react';
import { setInstallationData } from '../../utils/installation';

import FooterView from './footer-view';

const handleLanguageSelection = (language: string) => {
  setInstallationData({
    language: {
      override: true,
      value: language,
    },
  });
};

const FooterWrapper = () => {
  return <FooterView handleLanguageSelection={handleLanguageSelection} />;
};

export default FooterWrapper;
