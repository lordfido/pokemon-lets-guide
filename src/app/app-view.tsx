import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { isInstalledPWA } from '../common/utils/platforms';

import FooterWrapper from './shell/footer/footer-wrapper';
import HeaderWrapper from './shell/header/header-wrapper';

import { HOME } from '../constants/appRoutes';

import { IButtonProps } from './components/button';
import Field from './modules/forms/field';
import { ICheckboxOptions, IDateOptions, IDropdownOptions, ITextOptions } from './modules/forms/form.models';
const isDisabled = true;

const button: IButtonProps = {
  id: 'button',
  isDisabled,
  label: 'button label',
  type: 'button',
};
const checkbox: ICheckboxOptions = {
  id: 'checkbox',
  isDisabled,
  label: 'checkbox label',
  type: 'checkbox',
};
const date: IDateOptions = {
  id: 'date',
  isDisabled,
  label: 'date label',
  type: 'date',
};
const dropdown: IDropdownOptions = {
  id: 'dropdown',
  isDisabled,
  label: 'dropdown label',
  options: [],
  type: 'dropdown',
};
const multi: IDropdownOptions = {
  id: 'multi',
  isDisabled,
  label: 'multi label',
  options: [],
  type: 'multi',
};
const switcher: ICheckboxOptions = {
  id: 'switch',
  isDisabled,
  label: 'switch label',
  type: 'switch',
};
const text: ITextOptions = {
  id: 'text',
  isDisabled,
  label: 'text label',
  type: 'text',
};

interface IOwnProps {
  children: JSX.Element;
}

const AppView = ({ children }: IOwnProps) => (
  <React.Fragment>
    <Link className="HomeButton" to={{ pathname: HOME }} />
    <div
      id="app"
      className={classnames('App', {
        'is-pwa': isInstalledPWA(),
      })}
    >
      <HeaderWrapper />
      <div className="App-content">
        <React.Fragment>
          <Field options={button} />
          <Field options={checkbox} />
          <Field options={date} />
          <Field options={dropdown} />
          <Field options={multi} />
          <Field options={switcher} />
          <Field options={text} />
          {children}
          <FooterWrapper />
        </React.Fragment>
      </div>
    </div>
  </React.Fragment>
);

export default AppView;
