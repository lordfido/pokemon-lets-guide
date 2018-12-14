import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import CustomImage from './image';

import { AVATAR_SIZE, BORDER_RADIUS, SIZE_M, SIZE_XXS } from '../../constants/styles';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  picture: {
    display: 'block',
    margin: '0 auto',
    marginTop: SIZE_XXS,
    maxWidth: '100%',
    minHeight: AVATAR_SIZE,
    minWidth: AVATAR_SIZE,
  },
  title: {},
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS,
    display: 'inline-block',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: SIZE_XXS,
    textAlign: 'center',

    '@media screen and (min-width: 720px)': {
      padding: SIZE_M,
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
    {!!image && <CustomImage className={classes.picture} src={image} />}
    {children}
  </div>
);

const Card = injectSheet(sheet)(unstyledCard);

export default Card;
