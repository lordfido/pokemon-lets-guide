import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import { HEADER_SIZE, PADDING_S } from '../../../constants/styles/styles';
import { BLACK, traslucentColor } from '../../../constants/styles/styles-colors';
import { FONT_M, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP, MOBILE_L } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../root.models';

const ITEM_PADDING = 10;

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
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: HEADER_SIZE - ITEM_PADDING * 2,
    color: TEXT_WHITE,
    display: 'inline-block',
    fontSize: FONT_M,
    fontWeight: 700,
    height: HEADER_SIZE,
    lineHeight: `${HEADER_SIZE - ITEM_PADDING * 2}px`,
    padding: `${ITEM_PADDING}px ${PADDING_S}px`,
    textAlign: 'center',
    transition: 'background-color 0.2s',
    verticalAlign: 'top',
    width: `calc((100% - ${HEADER_SIZE}px) / 3)`,

    [MOBILE_L]: {
      padding: ITEM_PADDING,
      width: 120,
    },

    [DESKTOP]: {
      '& > *': {
        backgroundColor: 'transparent',
        opacity: 0,
      },

      '&:active, &:focus, &:hover': {
        '& > *': {
          backgroundColor: traslucentColor(BLACK, 0.5),
          opacity: 1,
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
};

interface IOwnProps {
  classes: { [key: string]: string };
  image?: string;
  text?: string;
  to?: string;
}

const unstyledHeaderItem = ({ classes, image, text, to }: IOwnProps) =>
  !!to ? (
    <Link className={classes.item} to={{ pathname: to }} style={image ? { backgroundImage: `url(${image})` } : {}}>
      {text && <span>{text}</span>}
    </Link>
  ) : (
    <span
      className={classnames(classes.item, classes.disabled)}
      style={image ? { backgroundImage: `url(${image})` } : {}}
    />
  );

const HeaderItem = injectSheet(sheet)(unstyledHeaderItem);

export default HeaderItem;
