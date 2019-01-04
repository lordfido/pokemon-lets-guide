import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import Media from 'react-media';

import Card from './card';

import { PADDING_L, PADDING_M, PADDING_S, PADDING_XXXL } from '../../constants/styles';
import { WHITE } from '../../constants/styles-colors';
import getQuery, { DESKTOP, MAX_TABLET, TABLET } from '../../constants/styles-media-queries';

import { ISheet } from '../root.models';

const sheet: ISheet = {
  card: {
    margin: PADDING_M,
    width: 256 + PADDING_M * 2,

    [TABLET]: {
      width: 256 + PADDING_XXXL * 2,
    },
  },
  cell: {
    backgroundColor: WHITE,
    padding: PADDING_S,

    [TABLET]: {
      padding: `${PADDING_S}px ${PADDING_L}px`,
    },

    [MAX_TABLET]: {
      height: 32,
      verticalAlign: 'top',
    },

    [DESKTOP]: {
      verticalAlign: 'middle',
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

    [DESKTOP]: {
      display: 'table-row-group',
    },
  },
  tableHead: {
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'top',

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
  style?: React.CSSProperties;
}

const unstyledTableCell = ({ children, center, classes, className, style }: ITableCellProps) => (
  <td className={classnames(classes.td, classes.cell, className, center ? classes.center : undefined)} style={style}>
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
    label: string;
    onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
    style?: React.CSSProperties;
  }>;
}

const unstyledTable = ({ children, classes, className, headings }: IOwnProps) => {
  const renderHeads = () => (
    <thead className={classes.tableHead}>
      <tr className={classnames(classes.tr, classes.row)}>
        {headings &&
          headings.map((heading, index) => (
            <th
              key={index}
              className={classnames(classes.th, classes.cell, { [classes.isClickable]: heading.onClick })}
              onClick={heading.onClick}
              style={heading.style}
            >
              {heading.label}
            </th>
          ))}
      </tr>
    </thead>
  );

  return (
    <Media query={getQuery(MAX_TABLET)}>
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
