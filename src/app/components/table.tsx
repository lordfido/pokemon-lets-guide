import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import Media from 'react-media';

import Card from './card';

import { PADDING_L, PADDING_M, PADDING_S } from '../../constants/styles/styles';
import { WHITE } from '../../constants/styles/styles-colors';
import getQuery, {
  DESKTOP,
  MAX_TABLET_L,
  MOBILE_XXL,
  TABLET,
  TABLET_L,
} from '../../constants/styles/styles-media-queries';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  card: {
    margin: PADDING_M,
    maxWidth: 366,
    width: `calc(100% - ${PADDING_M * 2}px)`,

    [MOBILE_XXL]: {
      width: `calc(50% - ${PADDING_M * 2}px)`,
    },

    [TABLET_L]: {
      width: `calc(33% - ${PADDING_M * 2}px)`,
    },
  },
  cell: {
    backgroundColor: WHITE,
    padding: PADDING_S,

    [TABLET]: {
      padding: `${PADDING_S}px ${PADDING_L}px`,
    },

    [MAX_TABLET_L]: {
      height: 32,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
    },

    [DESKTOP]: {
      verticalAlign: 'middle',
    },
  },
  cellEllipsis: {
    [MAX_TABLET_L]: {
      textOverflow: 'ellipsis',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
    },
  },
  center: {
    textAlign: 'center',
  },
  isClickable: {
    cursor: 'pointer',
  },
  row: {},
  table: {
    display: 'block',
    textAlign: 'center',
    width: '100%',

    [DESKTOP]: {
      display: 'table',
    },
  },
  tableBody: {
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'top',

    [MAX_TABLET_L]: {
      width: 'calc(100% - 125px)',
    },

    [DESKTOP]: {
      display: 'table-row-group',
    },
  },
  tableHead: {
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'top',

    [MAX_TABLET_L]: {
      width: 125,
    },

    [DESKTOP]: {
      display: 'table-header-group',
    },
  },

  td: {
    display: 'block',
    width: '100%',

    [DESKTOP]: {
      display: 'table-cell',
      width: 'auto',
    },
  },
  th: {
    display: 'block',
    width: '100%',

    [DESKTOP]: {
      display: 'table-cell',
      textAlign: 'center',
      width: 'auto',
    },
  },
  tr: {
    display: 'block',
    width: '100%',

    [DESKTOP]: {
      display: 'table-row',
      width: 'auto',
    },
  },
};

interface ITableCellProps {
  center?: boolean;
  children: any;
  classes: { [key: string]: string };
  className?: string;
  ellipsis?: boolean;
  style?: React.CSSProperties;
}

const unstyledTableCell = ({ children, center, classes, className, ellipsis, style }: ITableCellProps) => (
  <td
    className={classnames(classes.td, classes.cell, className, {
      [classes.center]: center,
      [classes.ellipsis]: ellipsis,
    })}
    style={style}
  >
    {children}
  </td>
);

export const TableCell = injectSheet(sheet)(unstyledTableCell);

interface ITableRowProps {
  children: JSX.Element[];
  classes: { [key: string]: string };
  className?: string;
}

export const unstyledTableRow = ({ children, classes, className }: ITableRowProps) => (
  <tr className={classnames(classes.tr, classes.row, className)}>{children}</tr>
);

export const TableRow = injectSheet(sheet)(unstyledTableRow);

interface IOwnProps {
  children: JSX.Element[];
  classes: { [key: string]: string };
  className?: string;
  readonly headings: Array<{
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
    style?: React.CSSProperties;
  }>;
}

const unstyledTable = ({ children, classes, className, headings }: IOwnProps) => {
  const renderHeads = () => (
    <thead className={classes.tableHead}>
      <tr className={classnames(classes.tr, classes.row)}>
        {headings &&
          headings.map((heading, index) =>
            typeof heading.label !== 'undefined' ? (
              <th
                key={index}
                className={classnames(classes.th, classes.cell, { [classes.isClickable]: heading.onClick })}
                onClick={heading.onClick}
                style={heading.style}
              >
                {heading.label}
              </th>
            ) : null
          )}
      </tr>
    </thead>
  );

  return (
    <Media query={getQuery(MAX_TABLET_L)}>
      {(matches: boolean) =>
        matches ? (
          <div className={classnames(classes.table, className)}>
            {React.Children.map(children, child => {
              return (
                <Card className={classnames(classes.card, child.props.className)}>
                  <table className={classes.table}>
                    {renderHeads()}
                    <tbody className={classes.tableBody}>{React.cloneElement(child, { className: '' })}</tbody>
                  </table>
                </Card>
              );
            })}
          </div>
        ) : (
          <table className={classnames(classes.table, className)}>
            {renderHeads()}
            <tbody className={classes.tableBody}>{children}</tbody>
          </table>
        )
      }
    </Media>
  );
};

const Table = injectSheet(sheet)(unstyledTable);

export default Table;
