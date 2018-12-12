import classnames from 'classnames';
import * as React from 'react';
// @ts-ignore
import Media from 'react-media';

import Card from './card';

interface ITableCellProps {
  className?: string;
  center?: boolean;
  style?: React.CSSProperties;
  children: any;
}

export const TableCell = ({ className, center, style, children }: ITableCellProps) => (
  <td className={classnames('Table-cell', className, { 'Table--center': center })} style={style}>
    {children}
  </td>
);

interface ITableRowProps {
  className?: string;
  children: JSX.Element[];
}

export const TableRow = ({ className, children }: ITableRowProps) => (
  <tr className={classnames('Table-row', className)}>{children}</tr>
);

interface IOwnProps {
  readonly headings: Array<{
    label: string;
    onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
    style?: React.CSSProperties;
  }>;
  className?: string;
  children: JSX.Element[];
}

const Table = ({ children, className, headings }: IOwnProps) => {
  const renderHeads = () => (
    <thead>
      <tr className="Table-row">
        {headings &&
          headings.map((heading, index) => (
            <th
              key={index}
              className={classnames('Table-cell', { 'is-clickable': heading.onClick })}
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
    <Media query="(max-width: 1023px)">
      {(matches: boolean) =>
        matches ? (
          <div className={classnames('Table Table--mobile', className)}>
            {React.Children.map(children, child => {
              return (
                <Card className="Table-card">
                  <table>
                    {renderHeads()}
                    <tbody>{child}</tbody>
                  </table>
                </Card>
              );
            })}
          </div>
        ) : (
          <table className={classnames('Table Table--desktop', className)}>
            {renderHeads()}
            <tbody>{children}</tbody>
          </table>
        )
      }
    </Media>
  );
};

export default Table;
