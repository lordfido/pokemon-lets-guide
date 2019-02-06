import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { getUiTranslation } from '../../utils/translations';

import Buttons from '../../components/buttons';
import CategoryIcon from '../../components/category-icon';
import { TableCell, TableRow } from '../../components/table';
import Tag from '../../components/tag';

import { MOVES } from '../../../constants/appRoutes';
import { IMovesConfig } from '../../../constants/configs/moves';
import { getTypeName } from '../../../constants/pokemon/pokemon-types';
import { getTypeColor } from '../../../constants/pokemon/pokemon-types-color';
import { getTypeIcon } from '../../../constants/pokemon/pokemon-types-icons';

import { ISheet } from '../../root.models';
import { IRichMove } from './moves.models';

const sheet: ISheet = {
  fullWidth: {
    width: '100%',
  },
  noMargin: {
    margin: 0,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  config: IMovesConfig;
  move: IRichMove;
}

const unstyledMovesEntry = ({ classes, className, config, move }: IOwnProps) => (
  <TableRow className={className}>
    {/* Id */}
    {config.showId && <TableCell>{move.id}</TableCell>}

    {/* Name */}
    {config.showName && <TableCell ellipsis={true}>{move.name}</TableCell>}

    {/* Type */}
    {config.showType && (
      <TableCell center>
        {move.types.ownType && (
          <Tag
            key={move.types.ownType}
            label={getTypeName(move.types.ownType)}
            icon={getTypeIcon(move.types.ownType)}
            backgroundColor={getTypeColor(move.types.ownType)}
          />
        )}
      </TableCell>
    )}

    {/* Category */}
    {config.showCategory && (
      <TableCell center>
        <CategoryIcon category={move.category} />
      </TableCell>
    )}

    {/* Power */}
    {config.showPower && <TableCell center>{move.power ? `${move.power}` : '-'}</TableCell>}

    {/* Accuracy */}
    {config.showAccuracy && <TableCell center>{move.accuracy ? `${move.accuracy}%` : '-'}</TableCell>}

    {/* PP */}
    {config.showPp && <TableCell center>{move.pp ? `${move.pp}` : '-'}</TableCell>}

    {/* TM */}
    {config.showTm && (
      <TableCell center>
        <FontAwesomeIcon icon={move.tm ? ['far', 'check-square'] : ['far', 'square']} />
      </TableCell>
    )}

    {/* Probability */}
    {config.showProbability && <TableCell center>{move.probability ? `${move.probability}%` : '-'}</TableCell>}

    {/* Quick Actions */}
    {config.showActions && (
      <TableCell center style={{ height: 'auto' }}>
        <Buttons
          className={classnames(classes.fullWidth, classes.noMargin)}
          align="left"
          options={[
            {
              className: classes.noMargin,
              id: `${move.id.toString()}-details`,
              label: getUiTranslation('moves-details'),
              to: MOVES.replace(':id?', move.id),
              type: 'button',
            },
          ]}
        />
      </TableCell>
    )}
  </TableRow>
);

const MovesEntry = injectSheet(sheet)(unstyledMovesEntry);

export default MovesEntry;
