import classnames from 'classnames';
import * as React from 'react';

import Button, { IButtonProps } from './button';

interface IButtonsProps {
  options: IButtonProps[];
  className?: string;
  align?: string;
}

class Buttons extends React.Component<IButtonsProps> {
  public static displayName = 'Buttons';

  public render() {
    const { className, options, align = 'right' } = this.props;

    const classes = classnames('Buttons', className, {
      'is-center': align === 'center',
      'is-left': align === 'left',
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
