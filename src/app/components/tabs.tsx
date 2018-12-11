import classnames from 'classnames';
import * as React from 'react';

import Tab, { ITabOptions } from './tab';

interface IOwnProps {
  options: ITabOptions[];
  activeTab: string;
  className?: string;
}

interface IOwnState {
  width: number;
}

class Tabs extends React.Component<IOwnProps, IOwnState> {
  public static displayName = 'Tabs';

  public state = {
    width: 0,
  };

  public componentDidMount() {
    this.calculateWidth();
  }

  public calculateWidth() {
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

  public onClick = (tab: ITabOptions) => {
    if (tab.onClick) {
      tab.onClick(tab.id);
    }
  };

  public render() {
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
