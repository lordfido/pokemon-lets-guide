import * as React from 'react';
import classnames from 'classnames';

import Link from './link';
import TouchableContent from './touchable-content';

export interface TabOptions {
  id: string;
  label?: string;
  icon?: string;
  iconLast?: boolean;
  to?: string;
  onClick?: (id: string) => void;
}

interface OwnSingleProps {
  options: TabOptions;
  isActive: boolean;
  handleClick: Function;
  reference: any;
}

class Tab extends React.Component<OwnSingleProps> {
  static displayName = 'Tab';

  render() {
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

interface OwnProps {
  options: TabOptions[];
  activeTab: string;
  className?: string;
}

class Tabs extends React.Component<OwnProps> {
  static displayName = 'Tabs';

  state = {
    width: 0,
  };

  componentDidMount() {
    this.calculateWidth();
  }

  calculateWidth() {
    // Get all elements
    const tabs = Object.keys(this)
      .filter(key => /tab/.test(key))
      // @ts-ignore
      .map(key => this[key]);

    // Calc its width
    let requiredWidth = 0;
    tabs.forEach(tab => {
      requiredWidth += tab.offsetWidth + 6;
    });

    // Update styles
    this.setState({
      width: requiredWidth,
    });
  }

  onClick = (tab: TabOptions) => {
    if (tab.onClick) {
      tab.onClick(tab.id);
    }
  };

  render() {
    const { className, options, activeTab } = this.props;
    const { width } = this.state;

    if (!options || !options.length) {
      return null;
    }

    const classes = classnames('Tabs', className);
    const wrapperStyle = { minWidth: `${width}px` };

    return (
      <div className={classes}>
        <ul className="Tabs-wrapper" style={wrapperStyle}>
          {options.map(tab => (
            <Tab
              key={tab.id}
              options={tab}
              isActive={activeTab === tab.id}
              handleClick={() => {
                this.onClick(tab);
              }}
              reference={(domElem: HTMLElement) => {
                const key = `tab-${tab.id}`;
                // @ts-ignore
                this[key] = domElem;
              }}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Tabs;
