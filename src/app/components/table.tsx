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

class Table extends React.Component<IOwnProps> {
  public static displayName = 'Table';

  public renderHeads() {
    const { headings } = this.props;

    return (
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
  }

  public render() {
    const { children, className } = this.props;

    const classes = {
      desktop: classnames('Table Table--desktop', className),
      mobile: classnames('Table Table--mobile', className),
    };

    return (
      <Media query="(max-width: 1023px)">
        {(matches: boolean) =>
          matches ? (
            <div className={classes.mobile}>
              {React.Children.map(children, child => {
                return (
                  <Card className="Table-card">
                    <table>
                      {this.renderHeads()}
                      <tbody>{child}</tbody>
                    </table>
                  </Card>
                );
              })}
            </div>
          ) : (
            <table className={classes.desktop}>
              {this.renderHeads()}
              <tbody>{children}</tbody>
            </table>
          )
        }
      </Media>
    );
  }
}

export default Table;
