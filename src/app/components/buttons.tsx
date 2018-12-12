import classnames from 'classnames';
import * as React from 'react';

import Button, { IButtonProps } from './button';

interface IButtonsProps {
  options: IButtonProps[];
  className?: string;
  align?: string;
}

const Buttons = ({ className, options, align = 'right' }: IButtonsProps) =>
  options.length ? (
    <div
      className={classnames('Buttons', className, {
        'is-center': align === 'center',
        'is-left': align === 'left',
      })}
    >
      {options.map(button => (
        <Button
          key={button.id}
          options={{ ...button, isDisabled: (!button.isAlwaysEnabled && button.isDisabled) || button.isAlwaysDisabled }}
        />
      ))}
    </div>
  ) : null;

export default Buttons;
