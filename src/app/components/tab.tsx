import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Link from './link';
import TouchableContent from './touchable-content';

import { BORDER_RADIUS, PADDING_M, PADDING_XL } from '../../constants/styles';
import { GREEN_LIGHT, WHITE, YELLOW } from '../../constants/styles-colors';
import { FONT_M, TEXT_BLACK } from '../../constants/styles-fonts';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  activeWrapper: {
    backgroundColor: `${YELLOW} !important`,
  },
  wrapper: {
    WebkitTouchCallout: 'none',
    backgroundColor: GREEN_LIGHT,
    borderBottom: `1px solid ${WHITE}`,
    borderTop: `1px solid ${WHITE}`,
    color: TEXT_BLACK,
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: FONT_M,
    lineHeight: '1.3em',
    padding: `${PADDING_M}px ${PADDING_XL}px`,
    userSelect: 'none',

    '&:active, &:focus, &:hover': {
      backgroundColor: YELLOW,
    },

    '&:first-of-type': {
      borderBottomLeftRadius: BORDER_RADIUS,
      borderLeft: `1px solid ${WHITE}`,
      borderTopLeftRadius: BORDER_RADIUS * 2,
    },

    '&:last-of-type': {
      borderBottomRightRadius: BORDER_RADIUS * 2,
      borderRight: `1px solid ${WHITE}`,
      borderTopRightRadius: BORDER_RADIUS,
    },
  },
};

export interface ITabOptions {
  customIcon?: React.ReactElement<{}>;
  id: string;
  label?: string;
  icon?: IconName;
  iconLast?: boolean;
  iconPrefix?: IconPrefix;
  to?: string;
  onClick?: (params?: any) => void;
}

interface IOwnSingleProps {
  classes: { [key: string]: string };
  handleClick: (params?: any) => void;
  isActive: boolean;
  options: ITabOptions;
  reference: any;
}

const unstyledTab = ({ classes, handleClick, isActive, options, reference }: IOwnSingleProps) =>
  options.to ? (
    <li
      id={options.id}
      role="button"
      className={classnames(classes.wrapper, isActive ? classes.activeWrapper : undefined)}
      ref={reference}
    >
      <Link options={options} isTransparent shouldInherit />
    </li>
  ) : (
    <li
      id={options.id}
      role="button"
      className={classnames(classes.wrapper, isActive ? classes.activeWrapper : undefined)}
      onClick={() => {
        handleClick(options);
      }}
      ref={reference}
    >
      <TouchableContent options={options} />
    </li>
  );

const Tab = injectSheet(sheet)(unstyledTab);

export default Tab;
