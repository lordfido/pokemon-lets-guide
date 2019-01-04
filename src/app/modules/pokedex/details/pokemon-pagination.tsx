import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { getAvatarFromId } from '../../../utils/pokemon';

import Avatar from '../../../components/avatar';

import { POKEMON } from '../../../../constants/appRoutes';
import { PADDING_L, PADDING_XL } from '../../../../constants/styles';
import { traslucentColor, WHITE } from '../../../../constants/styles-colors';
import { FONT_XL, TEXT_WHITE } from '../../../../constants/styles-fonts';
import { MAX_MOBILE_L, MOBILE_XL } from '../../../../constants/styles-media-queries';

import { ISheet } from '../../../root.models';
import { IPokemonDetailPagination } from '../pokedex.models';

const borderWidth = 3;

const sheet: ISheet = {
  content: {
    border: `2px solid ${WHITE}`,
    display: 'inline-block',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  contentLeft: {
    borderBottomRightRadius: 50,
    borderLeft: 'none',
    borderTopRightRadius: 50,
    marginLeft: 0,
  },
  contentRight: {
    borderBottomLeftRadius: 50,
    borderRight: 0,
    borderTopLeftRadius: 50,
    marginRight: 0,
  },
  label: {
    color: TEXT_WHITE,
    fontSize: FONT_XL,
    margin: `0 ${PADDING_L}px`,
    position: 'relative',
    top: '-50%',
    verticalAlign: 'middle',

    [MAX_MOBILE_L]: {
      display: 'none',
    },
  },
  link: {
    backgroundColor: 'darkgreen',
    border: `${borderWidth}px solid ${traslucentColor('darkgreen', 0.5)}`,
    display: 'inline-block',
    height: '100%',
    maxWidth: '48%',
    minWidth: 150,
    transition: 'width 0.3s',

    [MOBILE_XL]: {
      minWidth: 230,
    },
  },
  linkLeft: {
    borderBottomRightRadius: 50,
    borderLeft: 'none',
    borderTopRightRadius: 50,
    float: 'left',
    marginLeft: 0,
    textAlign: 'right',
  },
  linkRight: {
    borderBottomLeftRadius: 50,
    borderRight: 0,
    borderTopLeftRadius: 50,
    float: 'right',
    marginRight: 0,
  },
  wrapper: {
    display: 'block',
    height: 96 + borderWidth * 2,
    margin: `${PADDING_XL}px 0`,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  currentPokemon: string;
  pagination: IPokemonDetailPagination;
}

const unstyledPokemonPagination = ({ classes, currentPokemon, pagination: { prev, next } }: IOwnProps) =>
  currentPokemon !== prev.id || currentPokemon !== next.id ? (
    <div className={classes.wrapper}>
      {currentPokemon !== prev.id && (
        <Link
          className={classnames(classes.link, classes.linkLeft)}
          to={{ pathname: `${POKEMON.replace(':id', String(prev.id))}` }}
        >
          <span className={classnames(classes.content, classes.contentLeft)}>
            <span className={classes.label}>{prev.name}</span> <Avatar picture={getAvatarFromId(prev.id)} />
          </span>
        </Link>
      )}

      {currentPokemon !== next.id && (
        <Link
          className={classnames(classes.link, classes.linkRight)}
          to={{ pathname: `${POKEMON.replace(':id', String(next.id))}` }}
        >
          <span className={classnames(classes.content, classes.contentRight)}>
            <Avatar picture={getAvatarFromId(next.id)} /> <span className={classes.label}>{next.name}</span>
          </span>
        </Link>
      )}
    </div>
  ) : null;

const PokemonPagination = injectSheet(sheet)(unstyledPokemonPagination);

export default PokemonPagination;
