import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';

import { HEADER_SIZE, PADDING_S } from '../../../constants/styles/styles';
import { BLACK, traslucentColor } from '../../../constants/styles/styles-colors';
import { FONT_M, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP, MOBILE_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';

const ITEM_PADDING = 10;

const activeProps = {
  backgroundColor: traslucentColor(BLACK, 0.5),
  opacity: 1,
};

const sheet: ISheet = {
  disabled: {
    opacity: 0.4,

    '&:active, &:focus, &:hover': {
      '& > *': {
        opacity: 0,
      },
    },
  },
  item: {
    color: TEXT_WHITE,
    display: 'inline-block',
    fontSize: FONT_M,
    fontWeight: 700,
    height: HEADER_SIZE,
    padding: `${ITEM_PADDING}px ${PADDING_S}px`,
    textDecoration: 'none',

    [MOBILE_L]: {
      padding: ITEM_PADDING,
    },

    '& span': {
      display: 'inline-block',
    },

    '&, & span': {
      lineHeight: `${HEADER_SIZE - ITEM_PADDING * 2}px`,
      verticalAlign: 'top',
    },
  },
  itemHover: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: HEADER_SIZE - ITEM_PADDING * 2,
    textAlign: 'center',
    transition: 'background-color 0.2s',
    width: `calc((100% - ${HEADER_SIZE}px) / 3)`,

    [MOBILE_L]: {
      width: 120,
    },

    [DESKTOP]: {
      '& > *': {
        backgroundColor: 'transparent',
        opacity: 0,
      },

      '&:active, &:focus, &:hover': {
        '& > *': {
          ...activeProps,
        },
      },
    },

    '&:first-child, &:first-child:active, &:first-child:focus, &:first-child:hover': {
      padding: ITEM_PADDING,
      width: HEADER_SIZE,

      '& > *': {
        backgroundColor: 'transparent',
      },
    },

    '& > *': {
      backgroundColor: traslucentColor(BLACK, 0.5),
      display: 'inline-block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'opacity 0.2s',
      whiteSpace: 'nowrap',
      width: '100%',
    },
  },
  itemHoverActive: {
    '& > *': {
      ...activeProps,
    },
  },
  itemInline: {},
  itemInlineImage: {
    height: HEADER_SIZE - ITEM_PADDING * 2,
    marginRight: ITEM_PADDING,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  hoverEffect?: boolean;
  image?: string;
  text?: string;
  to?: string;
}

const unstyledHeaderItem = ({ classes, hoverEffect = false, image, text, to }: IOwnProps) => {
  if (!hoverEffect) {
    return (
      <NavLink className={classnames(classes.item, classes.itemInline)} to={{ pathname: to }}>
        <img className={classes.itemInlineImage} src={image} />
        {text && <span>{text}</span>}
      </NavLink>
    );
  }

  if (!!to) {
    return (
      <NavLink
        activeClassName={classes.itemHoverActive}
        className={classnames(classes.item, classes.itemHover)}
        to={{ pathname: to }}
        style={image ? { backgroundImage: `url(${image})` } : {}}
      >
        {text && <span>{text}</span>}
      </NavLink>
    );
  }

  return (
    <span
      className={classnames(classes.item, classes.itemHover, classes.disabled)}
      style={image ? { backgroundImage: `url(${image})` } : {}}
    />
  );
};

const HeaderItem = injectSheet(sheet)(unstyledHeaderItem);

export default HeaderItem;
