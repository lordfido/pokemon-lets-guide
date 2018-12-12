import * as React from 'react';
import { isProduction } from '../../../common/utils/platforms';
import { languageISOs } from '../../utils/translations';

import Link from '../../components/link';

import { APP_NAME, APP_WEB } from '../../../constants/branding';

const packageJson = require('../../../../package.json');
const APP_VERSION = packageJson.version;

interface IOwnProps {
  handleLanguageSelection: (language: string) => void;
}

const FooterView = ({ handleLanguageSelection }: IOwnProps) => (
  <footer className="Page Footer">
    <div className="Footer-wrapper">
      <p className="Footer-text">
        <Link
          options={{
            id: 'app-web',
            label: APP_NAME,
            to: APP_WEB,
          }}
        />{' '}
        {!isProduction() && `v${APP_VERSION}`} | {new Date().getFullYear()}{' '}
      </p>
      <p className="Footer-text">
        {languageISOs.map((language, index) => (
          <React.Fragment key={`language-${language.name}`}>
            {index > 0 && ' | '}
            <button
              id={`language-${language.name}`}
              className="Button Button--link"
              onClick={() => {
                handleLanguageSelection(language.iso);
              }}
            >
              {language.name}
            </button>
          </React.Fragment>
        ))}
      </p>
    </div>
  </footer>
);

export default FooterView;
