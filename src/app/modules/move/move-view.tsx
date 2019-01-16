import * as React from 'react';
import injectSheet from 'react-jss';
import { getGameTranslation } from '../../utils/translations';

import CategoryIcon from '../../components/category-icon';
import CurvedWindow from '../../components/curved-window';
import Tag from '../../components/tag';

import { getTypeName } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon/pokemon-types-icons';
import { HEADER_SIZE, PADDING_M, PADDING_S, PADDING_XS, PADDING_XXXL } from '../../../constants/styles/styles';
import { ACCURACY_LABEL, CATEGORY_LABEL, POWER_LABEL } from '../../../constants/styles/styles-colors';
import {
  MODAL_BACKDROP_BAKGROUND,
  MODAL_BACKGROUND,
  WINDOW_BACKGROUND,
  WINDOW_BORDER,
} from '../../../constants/styles/styles-skin';
import { MODAL, MODAL_BACKDROP } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../root.models';
import { IRichMove } from '../moves/moves.models';

const sheet: ISheet = {
  backdrop: {
    backgroundColor: MODAL_BACKDROP_BAKGROUND,
    height: `calc(100% - ${HEADER_SIZE}px)`,
    position: 'fixed',
    top: HEADER_SIZE,
    width: '100%',
    zIndex: MODAL_BACKDROP,
  },

  titleWrapper: {}, // Position and size
  titleContent: {}, // White border (like button)
  type: {},
  name: {},
  pp: {},

  contentWrapper: {
    margin: '0px auto',
    marginTop: PADDING_XXXL,
    maxWidth: 800,
    textAlign: 'center',
  }, // Position and size
  contentContent: {}, // White border (like button)
  category: {},
  categoryLabel: {
    color: CATEGORY_LABEL,
  },
  categoryIcon: {},
  power: {},
  powerLabel: {
    color: POWER_LABEL,
  },
  powerValue: {},
  accuracy: {},
  accuracyLabel: {
    color: ACCURACY_LABEL,
  },
  accuracyValue: {},
  effectWrapper: {},
  effectContent: {},

  wrapper: {
    backgroundColor: MODAL_BACKGROUND,
    padding: PADDING_XXXL,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
    zIndex: MODAL,
  },

  windowWrapper: {
    padding: PADDING_S,
  },
  windowBorder: {
    padding: PADDING_XS,
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
        <div className={classes.titleWrapper}>
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
              {getGameTranslation('pp')}: {move.pp}/{move.pp}
            </div>
          </div>
        </div>

        <CurvedWindow>
          <div className={classes.contentContent}>
            <div className={classes.category}>
              <span className={classes.categoryLabel}>{getGameTranslation('category')}</span>
              <span className={classes.labelIcon}>
                {move.category ? <CategoryIcon category={move.category} /> : '-'}
              </span>
            </div>
            <div className={classes.power}>
              <span className={classes.powerLabel}>{getGameTranslation('category')}</span>
              <span className={classes.powerValue}>{move.power ? move.power : '-'}</span>
            </div>
            <div className={classes.accuracy}>
              <span className={classes.accuracyLabel}>{getGameTranslation('accuracy')}</span>
              <span className={classes.accuracyValue}>{move.accuracy ? `${move.accuracy}%` : '-'}</span>
            </div>

            <div className={classes.effectWrapper}>
              <div className={classes.effectWrapper}>{move.effect}</div>
            </div>
          </div>
        </CurvedWindow>
      </div>
    </div>
  </>
);

const MoveView = injectSheet(sheet)(unstyledMoveView);

export default MoveView;
