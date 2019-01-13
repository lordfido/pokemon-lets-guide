import * as React from 'react';
import injectSheet from 'react-jss';

import Image from './image';

import { AVATAR_SIZE, PADDING_XL } from '../../constants/styles/styles';
import { traslucentColor, WHITE } from '../../constants/styles/styles-colors';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  picture: {
    maxWidth: '100%',
    minHeight: AVATAR_SIZE,
    minWidth: AVATAR_SIZE,
    padding: PADDING_XL,
  },
  wrapper: {
    backgroundColor: traslucentColor(WHITE, 0.4),
    borderRadius: AVATAR_SIZE / 2,
    display: 'inline-block',
    height: AVATAR_SIZE,
    margin: 0,
    overflow: 'hidden',
    position: 'relative',
    width: AVATAR_SIZE,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  picture: string;
}

const UnstyledAvatar = ({ classes, picture }: IOwnProps) => (
  <div className={classes.wrapper}>
    <Image className={classes.picture} src={picture} />
  </div>
);

const Avatar = injectSheet(sheet)(UnstyledAvatar);

export default Avatar;
