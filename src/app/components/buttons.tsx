import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Field from '../modules/forms/field';
import Button, { IButtonProps } from './button';

import { SIZE_XXS } from '../../constants/styles';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  wrapper: {
    margin: `${SIZE_XXS}px ${SIZE_XXS / 2}px`,
    width: `calc(100% - ${SIZE_XXS}px)`,
  },

  left: {
    textAlign: 'left',
  },

  center: {
    textAlign: 'center',
  },

  right: {
    textAlign: 'right',
  },
};

interface IButtonsProps {
  align?: 'left' | 'center' | 'right';
  classes: { [key: string]: string };
  className?: string;
  options: IButtonProps[];
}

const unstyledButtons = ({ align = 'right', classes, className, options }: IButtonsProps) =>
  options.length ? (
    <div className={classnames(classes.wrapper, classes[align], className)}>
      {options.map(button => (
        <Field
          key={button.id}
          options={{ ...button, isDisabled: (!button.isAlwaysEnabled && button.isDisabled) || button.isAlwaysDisabled }}
        />
      ))}
    </div>
  ) : null;

const Buttons = injectSheet(sheet)(unstyledButtons);

export default Buttons;
