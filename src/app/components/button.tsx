import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import { IButtonProps as ButtonProps } from '../modules/forms/form.models';
import TouchableContent from './touchable-content';

import { BORDER_RADIUS, PADDING_S, PADDING_XL } from '../../constants/styles/styles';
import { FONT_M, TEXT_BLACK } from '../../constants/styles/styles-fonts';
import {
  BUTTON_BACKGROUND,
  BUTTON_BACKGROUND_ACTIVE,
  BUTTON_BORDER,
  BUTTON_BORDER_ACTIVE,
  BUTTON_DISABLED_BACKGROUND,
  BUTTON_DISABLED_BORDER,
  BUTTON_DISABLED_COLOR,
} from '../../constants/styles/styles-skin';

import { ISheet } from '../root.models';

const wrapperActive = {
  background: BUTTON_BACKGROUND_ACTIVE,
};

const contentActive = {
  borderColor: BUTTON_BORDER_ACTIVE,
};

const wrapperDisabled = {
  backgroundColor: BUTTON_DISABLED_BACKGROUND,
  borderColor: BUTTON_DISABLED_BACKGROUND,
  color: BUTTON_DISABLED_COLOR,
  cursor: 'not-allowed',
};

const contentDisabled = {
  backgroundColor: BUTTON_DISABLED_BACKGROUND,
  borderColor: BUTTON_DISABLED_BORDER,
};

const sheet: ISheet = {
  content: {
    background: 'transparent',
    border: `2px solid ${BUTTON_BORDER}`,
    borderRadius: BORDER_RADIUS,
    color: TEXT_BLACK,
    cursor: 'inherit',
    display: 'inline-block',
    fontSize: FONT_M,
    lineHeight: '1.5em',
    margin: '0 auto',
    maxWidth: '100%',
    padding: `0px ${PADDING_XL}px`,

    ':active > &, :focus > &, :hover > &': {
      ...contentActive,
    },

    ':disabled > &': {
      ...contentDisabled,
    },
  },
  contentActive,
  contentDisabled,
  wrapper: {
    background: BUTTON_BACKGROUND,
    border: 'none',
    borderRadius: BORDER_RADIUS,
    color: TEXT_BLACK,
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontWeight: 700,
    margin: `${PADDING_S}px ${PADDING_S / 2}px`,
    maxWidth: `calc(100% - ${PADDING_S}px)`,
    padding: PADDING_S / 2,
    textAlign: 'center',
    verticalAlign: 'middle',

    '&:active, &:focus, &:hover': {
      ...wrapperActive,
    },

    '&, &:active, &:focus, &:hover': {
      textDecoration: 'none',
    },

    '&:disabled': {
      ...wrapperDisabled,
    },

    '&:focus, &:hover': {
      animation: 'button-flashing 1s linear infinite',
    },
  },
  wrapperActive,
  wrapperDisabled,
};

export type IButtonProps = ButtonProps;

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: IButtonProps;
}

const unstyledButton = ({ classes, className, options }: IOwnProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { isDisabled, onClick } = options;

    if (onClick && !isDisabled) {
      onClick(event);
    }
  };

  const buttonClasses = {
    button: classnames(classes.content, {
      [classes.contentActive]: options.isActive,
      [classes.contentDisabled]: options.isDisabled,
    }),
    wrapper: classnames(classes.wrapper, options.className, className, {
      [classes.wrapperActive]: options.isActive,
      [classes.wrapperDisabled]: options.isDisabled,
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

  return (
    <button
      id={options.id}
      type={options.type}
      className={buttonClasses.wrapper}
      onClick={handleClick}
      disabled={options.isDisabled}
    >
      <span className={buttonClasses.button}>
        <TouchableContent options={touchable} />
      </span>
    </button>
  );
};

const Button = injectSheet(sheet)(unstyledButton);

export default Button;
