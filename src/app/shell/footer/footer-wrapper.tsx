import * as React from 'react';
import { setInstallationData } from '../../utils/installation';

import FooterView from './footer-view';

const handleGameLanguageSelection = (language: string) => {
  setInstallationData({
    gameLanguage: {
      override: true,
      value: language,
    },
  });
};

const handleUiLanguageSelection = (language: string) => {
  setInstallationData({
    uiLanguage: {
      override: true,
      value: language,
    },
  });
};

const FooterWrapper = () => {
  return (
    <FooterView
      handleGameLanguageSelection={handleGameLanguageSelection}
      handleUiLanguageSelection={handleUiLanguageSelection}
    />
  );
};

export default FooterWrapper;
