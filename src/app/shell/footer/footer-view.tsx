import * as React from 'react';
import { isProduction } from '../../../common/utils/platforms';

import { APP_NAME } from '../../../constants/branding';
import { languageISOs } from '../../utils/translations';

const packageJson = require('../../../../package.json');
const APP_VERSION = packageJson.version;

interface IOwnProps {
  handleLanguageSelection: (language: string) => void;
}

class FooterView extends React.Component<IOwnProps> {
  public static displayName = 'FooterView';

  public render() {
    const { handleLanguageSelection } = this.props;

    return (
      <footer className="Page Footer">
        <div className="Footer-wrapper">
          <p className="Footer-text">
            {APP_NAME} {!isProduction() && `v${APP_VERSION}`} | {new Date().getFullYear()}{' '}
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
  }
}

export default FooterView;
