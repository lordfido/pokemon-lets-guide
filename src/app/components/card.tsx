import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Image from './image';

import { AVATAR_SIZE, BORDER_RADIUS, PADDING_XL, PADDING_XXXL } from '../../constants/styles';
import { WHITE } from '../../constants/styles-colors';
import { TABLET } from '../../constants/styles-media-queries';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  picture: {
    display: 'block',
    margin: '0 auto',
    marginTop: PADDING_XL,
    maxWidth: '100%',
    minHeight: AVATAR_SIZE,
    minWidth: AVATAR_SIZE,
  },
  title: {},
  wrapper: {
    backgroundColor: WHITE,
    borderRadius: BORDER_RADIUS,
    display: 'inline-block',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: PADDING_XL,
    textAlign: 'center',

    [TABLET]: {
      padding: PADDING_XXXL,
    },
  },
};

interface IOwnProps {
  children: JSX.Element;
  classes: { [key: string]: string };
  className?: string;
  title?: string;
  image?: string;
}

const unstyledCard = ({ children, classes, className, image, title }: IOwnProps) => (
  <div className={classnames(classes.wrapper, className)}>
    {!!title && <span className={classes.title}>{title}</span>}
    {!!image && <Image className={classes.picture} src={image} />}
    {children}
  </div>
);

const Card = injectSheet(sheet)(unstyledCard);

export default Card;
