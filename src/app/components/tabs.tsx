import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Tab, { ITabOptions } from './tab';

import { SIZE_XXS } from '../../constants/styles';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  content: {
    display: 'block',
    margin: '0 auto',
  },
  wrapper: {
    display: 'block',
    marginBottom: SIZE_XXS,
    overflow: 'hidden',
    overflowX: 'auto',
    textAlign: 'center',
    width: '100%',

    '&::-webkit-scrollbar, &::-webkit-scrollbar-thumb': {
      display: 'none',
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  options: ITabOptions[];
  activeTab: string;
  className?: string;
}

interface IOwnState {
  width: number;
}

class UnstyledTabs extends React.Component<IOwnProps, IOwnState> {
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
    const { classes, className, options, activeTab } = this.props;
    const { width } = this.state;

    if (!options || !options.length) {
      return null;
    }

    const wrapperStyle = { minWidth: `${width}px` };

    return (
      <div className={classnames(classes.wrapper, className)}>
        <ul className={classes.content} style={wrapperStyle}>
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

const Tabs = injectSheet(sheet)(UnstyledTabs);

export default Tabs;
