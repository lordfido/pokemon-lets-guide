import * as React from 'react';
import classnames from 'classnames';
// @ts-ignore
import Media from 'react-media';

import Card from './card';

type TableCellProps = { className?: string; center?: boolean; style?: React.CSSProperties; children: any };
export const TableCell = ({ className, center, style, children }: TableCellProps) => (
  <td className={classnames('Table-cell', className, { 'Table--center': center })} style={style}>
    {children}
  </td>
);

type TableRowProps = { className?: string; children: Array<JSX.Element> };
export const TableRow = ({ className, children }: TableRowProps) => (
  <tr className={classnames('Table-row', className)}>{children}</tr>
);

interface OwnProps {
  readonly headings: Array<{
    label: string;
    onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
    style?: React.CSSProperties;
  }>;
  className?: string;
  children: Array<JSX.Element>;
}

class Table extends React.Component<OwnProps> {
  static displayName = 'Table';

  renderHeads() {
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

  render() {
    const { children, className } = this.props;

    const classes = {
      mobile: classnames('Table Table--mobile', className),
      desktop: classnames('Table Table--desktop', className),
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
