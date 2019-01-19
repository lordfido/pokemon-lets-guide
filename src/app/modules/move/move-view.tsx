import * as React from 'react';
import injectSheet from 'react-jss';
import { getGameTranslation } from '../../utils/translations';

import CategoryIcon from '../../components/category-icon';
import CurvedWindow from '../../components/curved-window';
import Tag from '../../components/tag';

import { getTypeName } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon/pokemon-types-icons';
import {
  BORDER_RADIUS,
  HEADER_SIZE,
  PADDING_S,
  PADDING_XS,
  PADDING_XXXL,
  PADDING_M,
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
import { MAX_MOBILE_L, MOBILE_XL } from '../../../constants/styles/styles-media-queries';
import { MODAL_BACKDROP_BAKGROUND, MODAL_BACKGROUND } from '../../../constants/styles/styles-skin';
import { BACKGROUND, MODAL, MODAL_BACKDROP } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../root.models';
import { IRichMove } from '../moves/moves.models';

const typeWidth = 80;
const ppWidth = 100;

const sheet: ISheet = {
  backdrop: {
    backgroundColor: MODAL_BACKDROP_BAKGROUND,
    height: `calc(100% - ${HEADER_SIZE}px)`,
    position: 'fixed',
    top: HEADER_SIZE,
    width: '100%',
    zIndex: MODAL_BACKDROP,
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
  pp: {
    backgroundColor: GREY_DARK,
    borderBottomRightRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    color: TEXT_WHITE,
    display: 'inline-block',
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
  titleContent: {
    border: `${PADDING_S / 2}px solid ${WHITE}`,
    borderRadius: BORDER_RADIUS,
    height: '100%',
    position: 'relative',
    verticalAlign: 'top',
    width: '100%',
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

  accuracy: {
    display: 'block',
    padding: PADDING_M,

    [MOBILE_XL]: {
      display: 'inline-flex',
      padding: `0px ${PADDING_M}px`,
      width: '33%',
    },
  },
  accuracyLabel: {
    color: ACCURACY_LABEL,
  },
  accuracyValue: {
    flex: 1,
    textAlign: 'right',
  },
  category: {
    display: 'block',
    padding: PADDING_M,

    [MOBILE_XL]: {
      borderRight: `1px solid ${GREY_LIGHT_3}`,
      display: 'inline-flex',
      padding: `0px ${PADDING_M}px`,
      width: '33%',
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
    marginTop: PADDING_XXXL,
    maxWidth: 600,
    position: 'relative',
    textAlign: 'center',
  },
  effectContent: {},
  effectWrapper: {
    paddingTop: PADDING_XXXL,
    textAlign: 'left',
    width: '70%',
  },
  power: {
    display: 'block',
    padding: PADDING_M,

    [MOBILE_XL]: {
      borderRight: `1px solid ${GREY_LIGHT_3}`,
      display: 'inline-flex',
      padding: `0px ${PADDING_M}px`,
      width: '33%',
    },
  },
  powerLabel: {
    color: POWER_LABEL,
  },
  powerValue: {
    flex: 1,
    textAlign: 'right',
  },

  wrapper: {
    backgroundColor: MODAL_BACKGROUND,
    padding: PADDING_XXXL,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    zIndex: MODAL,
  },

  windowBorder: {
    padding: PADDING_XS,
  },
  windowWrapper: {
    padding: PADDING_S,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  handleClose: () => void;
  move: IRichMove;
}

const unstyledMoveView = ({ classes, handleClose, move }: IOwnProps) => (
  <>
    <div className={classes.backdrop} onClick={handleClose} />
    <div className={classes.wrapper}>
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
              {move.pp} / {move.pp}
            </div>
          </div>
        </div>

        <CurvedWindow>
          <div className={classes.contentContent}>
            <div className={classes.contentTitle}>
              <div className={classes.category}>
                <span className={classes.categoryLabel}>{getGameTranslation('category')}</span>
                <span className={classes.categoryIcon}>
                  {move.category ? <CategoryIcon category={move.category} /> : '-'}
                </span>
              </div>
              <div className={classes.power}>
                <span className={classes.powerLabel}>{getGameTranslation('power')}</span>
                <span className={classes.powerValue}>{move.power ? move.power : '-'}</span>
              </div>
              <div className={classes.accuracy}>
                <span className={classes.accuracyLabel}>{getGameTranslation('accuracy')}</span>
                <span className={classes.accuracyValue}>{move.accuracy ? `${move.accuracy}%` : '-'}</span>
              </div>
            </div>

            <div className={classes.effectWrapper}>
              <div className={classes.effectContent}>{move.effect}</div>
            </div>
          </div>
        </CurvedWindow>
      </div>
    </div>
  </>
);

const MoveView = injectSheet(sheet)(unstyledMoveView);

export default MoveView;
