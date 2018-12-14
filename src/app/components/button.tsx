import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import { IGenericField } from '../modules/forms/form.models';
import TouchableContent from './touchable-content';

import { BORDER_RADIUS, SIZE_XXS, SIZE_XXXS } from '../../constants/styles';
import { FONT_M, TEXT_BLACK } from '../../constants/styles-fonts';
import {
  BUTTON_BACKGROUND,
  BUTTON_BORDER,
  BUTTON_DISABLED_BACKGROUND,
  BUTTON_DISABLED_BORDER,
  BUTTON_DISABLED_COLOR,
} from '../../constants/styles-skin';

import { ISheet } from '../root.models';

const activeWrapper = {
  backgroundColor: BUTTON_BORDER,
  borderColor: BUTTON_BORDER,
};

const activeContent = {
  backgroundColor: BUTTON_BORDER,
  borderColor: BUTTON_BACKGROUND,
};

const disabledWrapper = {
  backgroundColor: BUTTON_DISABLED_BACKGROUND,
  borderColor: BUTTON_DISABLED_BACKGROUND,
  color: BUTTON_DISABLED_COLOR,
  cursor: 'not-allowed',
};

const disabledContent = {
  backgroundColor: BUTTON_DISABLED_BACKGROUND,
  borderColor: BUTTON_DISABLED_BORDER,
};

const sheet: ISheet = {
  activeContent,
  activeWrapper,
  content: {
    backgroundColor: BUTTON_BACKGROUND,
    border: `2px solid ${BUTTON_BORDER}`,
    borderRadius: BORDER_RADIUS,
    color: TEXT_BLACK,
    cursor: 'inherit',
    display: 'inline-block',
    fontSize: FONT_M,
    lineHeight: '1.5em',
    margin: '0 auto',
    maxWidth: '100%',
    padding: `0px ${SIZE_XXS}px`,

    ':active > &, :focus > &, :hover > &': {
      ...activeContent,
    },

    ':disabled > &': {
      ...disabledContent,
    },
  },
  disabledContent,
  disabledWrapper,
  wrapper: {
    backgroundColor: BUTTON_BACKGROUND,
    border: `2px solid ${BUTTON_BACKGROUND}`,
    borderRadius: BORDER_RADIUS,
    color: TEXT_BLACK,
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontWeight: 700,
    margin: `${SIZE_XXXS / 2}px ${SIZE_XXXS / 4}px`,
    maxWidth: `calc(100% - ${SIZE_XXXS / 2}px)`,
    textAlign: 'center',
    verticalAlign: 'middle',

    '&:active, &:focus, &:hover': {
      ...activeWrapper,
    },

    '&:disabled': {
      ...disabledWrapper,
    },
  },
};

export interface IButtonProps extends IGenericField {
  to?: string;
}

interface IOwnProps {
  classes: { [key: string]: string };
  options: IButtonProps;
}

const unstyledButton = ({ classes, options }: IOwnProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { isDisabled, onClick } = options;

    if (onClick && !isDisabled) {
      onClick(event);
    }
  };

  const buttonClasses = {
    button: classnames(classes.content, options.isDisabled ? classes.disabledContent : undefined),
    wrapper: classnames(classes.wrapper, options.className, options.isDisabled ? classes.disabledWrapper : undefined, {
      'Button--icon': options.icon && !options.label,
    }),
  };

  if (options.to) {
    return (
      <Link id={options.id} className={buttonClasses.wrapper} to={{ pathname: options.to }}>
        <span className={buttonClasses.button}>
          <TouchableContent
            options={{
              icon: options.icon,
              iconLast: options.iconLast,
              label: options.label,
            }}
          />
        </span>
      </Link>
    );
  }

  const touchable = {
    icon: options.icon,
    iconLast: options.iconLast,
    label: options.label,
  };

  if (options.type === 'picture') {
    return (
      <span className={buttonClasses.wrapper}>
        <span id={options.id} className={buttonClasses.button}>
          <TouchableContent options={touchable} />
        </span>
      </span>
    );
  }

  return (
    <button
      id={options.id}
      type={options.type}
      className={buttonClasses.wrapper}
      onClick={handleClick}
      disabled={(options.type !== 'submit' && !options.onClick) || options.isDisabled || options.isAlwaysDisabled}
    >
      <span className={buttonClasses.button}>
        <TouchableContent options={touchable} />
      </span>
    </button>
  );
};

const Button = injectSheet(sheet)(unstyledButton);

export default Button;
