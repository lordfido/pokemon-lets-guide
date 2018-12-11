import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { IFieldProps } from '../modules/forms/field';
import TouchableContent from './touchable-content';

export interface IButtonProps extends IFieldProps {
  to?: string;
}

export class Button extends React.Component<{ options: IButtonProps }> {
  public static displayName = 'Button';

  public onClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { isDisabled, isAlwaysDisabled, onClick } = this.props.options;

    if (onClick && !isDisabled && !isAlwaysDisabled) {
      onClick(event);
    }
  };

  public render() {
    const { options } = this.props;

    const classes = {
      button: 'Button-wrapper',
      wrapper: classnames('Button', options.className, {
        'Button--icon': options.icon && !options.label,
        'is-disabled': options.isDisabled || options.isAlwaysDisabled,
      }),
    };

    if (options.to) {
      return (
        <Link id={options.id} className={classes.wrapper} to={{ pathname: options.to }}>
          <span className={classes.button}>
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
        <span className={classes.wrapper}>
          <span id={options.id} className={classes.button}>
            <TouchableContent options={touchable} />
          </span>
        </span>
      );
    }

    return (
      <button
        id={options.id}
        type={options.type}
        className={classes.wrapper}
        onClick={this.onClick}
        disabled={(options.type !== 'submit' && !options.onClick) || options.isDisabled || options.isAlwaysDisabled}
      >
        <span className={classes.button}>
          <TouchableContent options={touchable} />
        </span>
      </button>
    );
  }
}

export default Button;
