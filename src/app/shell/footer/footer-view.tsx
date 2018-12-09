import * as React from 'react';
import { isProduction } from '../../../common/utils/platforms';

import { APP_NAME } from '../../../constants/branding';
import { languages } from '../../../constants/translations';
import { Button } from '../../components/buttons';

const packageJson = require('../../../../package.json');
const APP_VERSION = packageJson.version;

interface OwnProps {
  handleLanguageSelection: (language: string) => void;
}

class FooterView extends React.Component<OwnProps> {
  static displayName = 'FooterView';

  render() {
    const { handleLanguageSelection } = this.props;

    return (
      <footer className="Page Footer">
        <div className="Footer-wrapper">
          <p className="Footer-text">
            {APP_NAME} {!isProduction() && `v${APP_VERSION}`} | {new Date().getFullYear()}{' '}
          </p>
          <p className="Footer-text">
            {languages.map((language, index) => (
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
  }
}

export default FooterView;
