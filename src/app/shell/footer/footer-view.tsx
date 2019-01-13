import * as React from 'react';
import injectSheet from 'react-jss';
import { isProduction } from '../../../common/utils/platforms';
import { languageISOs } from '../../utils/translations';

import Link from '../../components/link';

import { APP_NAME, APP_REPOSITORY, APP_WEB } from '../../../constants/branding';
import { PADDING_XL, PADDING_XXL, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { WHITE } from '../../../constants/styles/styles-colors';
import { FONT_XS, TEXT_DARK } from '../../../constants/styles/styles-fonts';
import { TABLET_OR_LANDSCAPE } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';

const packageJson = require('../../../../package.json');
const APP_VERSION = packageJson.version;

const sheet: ISheet = {
  content: {
    margin: '0 auto',
    maxWidth: PAGE_MAX_WIDTH,
  },
  wrapper: {
    backgroundColor: WHITE,
    color: TEXT_DARK,
    fontSize: FONT_XS,
    marginBottom: '0 !important',
    padding: PADDING_XL,
    width: '100%',

    [TABLET_OR_LANDSCAPE]: {
      padding: PADDING_XXL,
      textAlign: 'center',
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  handleLanguageSelection: (language: string) => void;
}

const unstyledFooterView = ({ classes, handleLanguageSelection }: IOwnProps) => (
  <footer className={classes.wrapper}>
    <div className={classes.content}>
      <p>
        <>
          <Link
            options={{
              id: 'app-web',
              label: APP_NAME,
              to: APP_WEB,
            }}
          />
          {!isProduction() && ` v${APP_VERSION}`}
        </>
        {' | '}
        <Link
          options={{
            icon: 'github',
            iconPrefix: 'fab',
            id: 'app-github',
            isExternal: true,
            label: 'Github',
            to: APP_REPOSITORY,
          }}
        />
        {' | '}
        {new Date().getFullYear()}
      </p>
      <p>
        {languageISOs.map((language, index) => (
          <>
            {index > 0 && ' | '}
            <Link
              options={{
                id: `language-${language.name}`,
                label: language.name,
                onClick: () => {
                  handleLanguageSelection(language.iso);
                },
              }}
            />
          </>
        ))}
      </p>
    </div>
  </footer>
);

const FooterView = injectSheet(sheet)(unstyledFooterView);

export default FooterView;
