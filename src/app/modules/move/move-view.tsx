import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { getGameTranslation } from '../../utils/translations';

import CategoryIcon from '../../components/category-icon';
import CurvedWindow from '../../components/curved-window';
import Modal from '../../components/modal';
import Tag from '../../components/tag';

import { MOVES } from '../../../constants/appRoutes';
import { getTypeName } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon, getTypeWaterMarkStyles } from '../../../constants/pokemon/pokemon-types-icons';
import {
  BORDER_RADIUS,
  PADDING_M,
  PADDING_S,
  PADDING_XL,
  PADDING_XS,
  PADDING_XXXL,
} from '../../../constants/styles/styles';
import {
  ACCURACY_LABEL,
  CATEGORY_LABEL,
  GREY_DARK,
  GREY_LIGHT_3,
  POWER_LABEL,
  traslucentColor,
  WHITE,
} from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP, MAX_MOBILE_L, MOBILE_XL, TABLET_OR_LANDSCAPE } from '../../../constants/styles/styles-media-queries';
import { BACKGROUND, CONTENT } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../root.models';
import { IMovePagination, IRichMove } from '../moves/moves.models';

const prevArrow = require('../../../assets/images/move-prev-arrow.png');
const nextArrow = require('../../../assets/images/move-next-arrow.png');

const typeWidth = 80;
const ppWidth = 100;

const maxWindowWidth = 600;

const sheet: ISheet = {
  accuracy: {},
  accuracyLabel: {
    color: ACCURACY_LABEL,
  },
  accuracyValue: {
    flex: 1,
    textAlign: 'right',
  },
  category: {
    [MOBILE_XL]: {
      borderRight: `1px solid ${GREY_LIGHT_3}`,
    },
  },
  categoryIcon: {
    flex: 1,
    textAlign: 'right',
  },
  categoryLabel: {
    color: CATEGORY_LABEL,
  },
  contentContent: {
    minHeight: 128,
    paddingTop: PADDING_M,
    width: '100%',
  },
  contentTitle: {
    width: '100%',

    [MOBILE_XL]: {
      textAlign: 'left',
    },
  },
  contentWrapper: {
    margin: '0px auto',
    marginTop: PADDING_XL,
    maxWidth: maxWindowWidth,
    position: 'relative',
    textAlign: 'center',
  },
  effectContent: {},
  effectWrapper: {
    margin: '0px auto',
    paddingTop: PADDING_XXXL,
    textAlign: 'center',
    width: '100%',

    [MOBILE_XL]: {
      textAlign: 'left',
      width: '70%',
    },
  },
  link: {
    '&, &:active, &:focus, &:hover': {
      textDecoration: 'none',
    },
  },
  mobilePp: {
    [MOBILE_XL]: {
      display: 'none',
    },
  },
  mobileType: {
    [MOBILE_XL]: {
      display: 'none',
    },
  },
  name: {
    display: 'inline-block',
    marginLeft: typeWidth,
    width: `calc(100% - ${typeWidth + ppWidth}px)`,

    [MAX_MOBILE_L]: {
      margin: 0,
      padding: `0px ${PADDING_S}px`,
      width: '100%',
    },
  },
  pagination: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: CONTENT,

    '& img': {
      height: 96,
    },
  },
  paginationNext: {
    right: PADDING_XXXL,

    '& img': {
      animation: 'arrow-bounce-prev 1s linear infinite',
      height: 96,
    },

    [DESKTOP]: {
      right: `calc(50% - ${maxWindowWidth / 2 + 60}px)`,
    },
  },
  paginationPrev: {
    left: PADDING_XXXL,

    '& img': {
      animation: 'arrow-bounce-next 1s linear infinite',
      height: 96,
    },

    [DESKTOP]: {
      left: `calc(50% - ${maxWindowWidth / 2 + 60}px)`,
    },
  },
  power: {
    [MOBILE_XL]: {
      borderRight: `1px solid ${GREY_LIGHT_3}`,
    },
  },
  powerLabel: {
    color: POWER_LABEL,
  },
  powerValue: {
    flex: 1,
    textAlign: 'right',
  },
  pp: {
    borderBottomRightRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    color: TEXT_WHITE,
    display: 'inline-block',
    overflow: 'hidden',
    padding: PADDING_S + PADDING_S / 2,
    position: 'absolute',
    right: -(PADDING_S + PADDING_S / 2),
    textAlign: 'center',
    top: -(PADDING_S + PADDING_S / 2),
    width: ppWidth,
    zIndex: BACKGROUND,

    [MAX_MOBILE_L]: {
      display: 'none',
    },
  },
  ppBackground: {
    backgroundColor: GREY_DARK,
    height: ppWidth,
    position: 'absolute',
    right: -22,
    top: -29,
    transform: 'rotate(45deg)',
    width: ppWidth,
    zIndex: BACKGROUND,
  },
  titleContent: {
    border: `${PADDING_S / 2}px solid ${WHITE}`,
    borderRadius: BORDER_RADIUS,
    height: '100%',
    position: 'relative',
    verticalAlign: 'top',
    width: '100%',
  },
  titleElement: {
    display: 'inline-flex',
    padding: PADDING_M,
    width: '100%',

    [MOBILE_XL]: {
      padding: `0px ${PADDING_M}px`,
      width: '33%',
    },
  },
  titleWrapper: {
    background: `linear-gradient(to right, ${traslucentColor(WHITE, 0.5)}, ${traslucentColor(WHITE, 0)} 100%)`,
    borderRadius: BORDER_RADIUS,

    height: 36,
    left: '50%',
    margin: '0 auto',
    padding: PADDING_S,
    position: 'absolute',
    textAlign: 'left',
    top: -36 / 3,
    transform: 'translateX(-50%)',
    width: '70%',
    zIndex: CONTENT,
  },
  type: {
    display: 'inline-block',
    left: -24,
    position: 'absolute',
    top: -3,

    [MAX_MOBILE_L]: {
      display: 'none',
    },
  },
  typeIcon: {
    opacity: 0.35,
    position: 'absolute',
    right: -12,
  },
  typeIconWrapper: {
    display: 'none',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: '100%',

    [TABLET_OR_LANDSCAPE]: {
      display: 'inline-block',
    },
  },
  windowBorder: {
    padding: PADDING_XS,
  },
  windowWrapper: {
    padding: PADDING_S,
  },
  wrapper: {},
};

interface IOwnProps {
  classes: { [key: string]: string };
  handleModalClose: () => void;
  move: IRichMove;
  pagination: IMovePagination;
  referrer?: string;
}

const unstyledMoveView = ({ classes, handleModalClose, referrer, move, pagination }: IOwnProps) => (
  <Modal handleClose={handleModalClose}>
    <>
      <div className={classnames(classes.pagination, classes.paginationPrev)}>
        {move.id !== pagination.prev.id && (
          <Link
            className={classes.link}
            to={{ pathname: MOVES.replace(':id?', pagination.prev.id), state: { referrer } }}
          >
            <img src={prevArrow} />
          </Link>
        )}
      </div>

      <div className={classes.contentWrapper}>
        <div className={classes.titleWrapper} style={{ backgroundColor: getTypeColor(move.types.ownType) }}>
          <div className={classes.titleContent}>
            <div className={classes.type}>
              <Tag
                backgroundColor={getTypeColor(move.types.ownType)}
                icon={getTypeIcon(move.types.ownType)}
                label={getTypeName(move.types.ownType)}
              />
            </div>
            <div className={classes.name}>{move.name}</div>
            <div className={classes.pp}>
              <div className={classes.ppBackground} />
              {move.pp} / {move.pp}
            </div>
          </div>
          <div className={classes.typeIconWrapper}>
            <img
              className={classnames(classes.typeIcon)}
              src={getTypeIcon(move.types.ownType)}
              style={getTypeWaterMarkStyles(move.types.ownType)}
            />
          </div>
        </div>

        <CurvedWindow>
          <div className={classes.contentContent}>
            <div className={classes.mobileContent}>
              <div className={classes.mobileType}>
                <Tag
                  backgroundColor={getTypeColor(move.types.ownType)}
                  icon={getTypeIcon(move.types.ownType)}
                  label={getTypeName(move.types.ownType)}
                />
              </div>
              <div className={classes.mobilePp}>
                PP: {move.pp} / {move.pp}
              </div>
            </div>
            <div className={classes.contentTitle}>
              <div className={classnames(classes.category, classes.titleElement)}>
                <span className={classes.categoryLabel}>{getGameTranslation('category')}</span>
                <span className={classes.categoryIcon}>
                  {move.category ? <CategoryIcon category={move.category} /> : '-'}
                </span>
              </div>
              <div className={classnames(classes.power, classes.titleElement)}>
                <span className={classes.powerLabel}>{getGameTranslation('power')}</span>
                <span className={classes.powerValue}>{move.power ? move.power : '-'}</span>
              </div>
              <div className={classnames(classes.accuracy, classes.titleElement)}>
                <span className={classes.accuracyLabel}>{getGameTranslation('accuracy')}</span>
                <span className={classes.accuracyValue}>{move.accuracy ? `${move.accuracy}%` : '-'}</span>
              </div>
            </div>
            <div className={classes.effectWrapper}>
              <div className={classes.effectContent}>
                {move.probability ? `(${move.probability}%) ` : ''}
                {move.effect}
              </div>
            </div>
          </div>
        </CurvedWindow>
      </div>

      <div className={classnames(classes.pagination, classes.paginationNext)}>
        {move.id !== pagination.next.id && (
          <Link
            className={classes.link}
            to={{ pathname: MOVES.replace(':id?', pagination.next.id), state: { referrer } }}
          >
            <img src={nextArrow} />
          </Link>
        )}
      </div>
    </>
  </Modal>
);

const MoveView = injectSheet(sheet)(unstyledMoveView);

export default MoveView;
