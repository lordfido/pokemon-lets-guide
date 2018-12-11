import classnames from 'classnames';
import * as React from 'react';

import Link from './link';
import TouchableContent from './touchable-content';

export interface ITabOptions {
  id: string;
  label?: string;
  icon?: string;
  iconLast?: boolean;
  to?: string;
  onClick?: (params?: any) => void;
}

interface IOwnSingleProps {
  options: ITabOptions;
  isActive: boolean;
  handleClick: (params?: any) => void;
  reference: any;
}

class Tab extends React.Component<IOwnSingleProps> {
  public static displayName = 'Tab';

  public render() {
    const { options, isActive, handleClick, reference } = this.props;

    const classes = classnames('Tabs-tab', { 'is-active': isActive });

    if (options.to) {
      return (
        <li id={options.id} role="button" className={classes} ref={reference}>
          <Link options={options} isTransparent shouldInherit />
        </li>
      );
    }

    return (
      <li
        id={options.id}
        role="button"
        className={classes}
        onClick={() => {
          handleClick(options);
        }}
        ref={reference}
      >
        <TouchableContent options={options} />
      </li>
    );
  }
}

export default Tab;
