import * as React from 'react';
import classnames from 'classnames';

import Link from './link';
import TouchableContent from './touchable-content';
import { FieldProps } from '../modules/forms/field';

export interface ButtonProps extends FieldProps {
  to?: string;
}

export class Button extends React.Component<{ options: ButtonProps }> {
  static displayName = 'Button';

  onClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { isDisabled, isAlwaysDisabled, onClick } = this.props.options;

    if (onClick && !isDisabled && !isAlwaysDisabled) {
      onClick(event);
    }
  };

  render() {
    const { options } = this.props;

    const classes = classnames('Button', options.className, {
      'Button--icon': options.icon && !options.label,
      'is-disabled': options.isDisabled || options.isAlwaysDisabled,
    });

    if (options.to) {
      const link = {
        id: options.id,
        className: `Button ${options.className}`,
        label: options.label,
        icon: options.icon,
        iconLast: options.iconLast,
        to: options.to,
        onClick: options.onClick,
      };
      return <Link isTransparent options={link} />;
    }

    const touchable = {
      label: options.label,
      icon: options.icon,
      iconLast: options.iconLast,
    };

    if (options.type === 'picture') {
      return (
        <span id={options.id} className={classes}>
          <TouchableContent options={touchable} />
        </span>
      );
    }

    return (
      <button
        id={options.id}
        type={options.type}
        className={classes}
        onClick={this.onClick}
        disabled={(options.type !== 'submit' && !options.onClick) || options.isDisabled || options.isAlwaysDisabled}
      >
        <TouchableContent options={touchable} />
      </button>
    );
  }
}

interface ButtonsProps {
  options: ButtonProps[];
  className?: string;
  align?: string;
}

class Buttons extends React.Component<ButtonsProps> {
  static displayName = 'Buttons';

  render() {
    const { className, options, align = 'right' } = this.props;

    const classes = classnames('Buttons', className, {
      'is-left': align === 'left',
      'is-center': align === 'center',
    });

    if (!options.length) {
      return null;
    }

    return (
      <div className={classes}>
        {options.map(button => {
          const isDisabled = (!button.isAlwaysEnabled && button.isDisabled) || button.isAlwaysDisabled;
          return <Button key={button.id} options={{ ...button, isDisabled }} />;
        })}
      </div>
    );
  }
}

export default Buttons;
