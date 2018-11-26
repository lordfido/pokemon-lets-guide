import * as React from 'react';
import classnames from 'classnames';
import Card from './card';

type TableCellProps = { className?: string; center?: boolean; children: any };
export const TableCell = ({ className, center, children }: TableCellProps) => (
  <td className={classnames('Table-cell', className, { 'Table--center': center })}>{children}</td>
);

type TableRowProps = { className?: string; children: Array<JSX.Element> };
export const TableRow = ({ className, children }: TableRowProps) => (
  <tr className={classnames('Table-row', className)}>{children}</tr>
);

interface OwnProps {
  readonly headings: Array<{
    label: string;
    onClick?: (event: React.MouseEvent<HTMLTableHeaderCellElement>) => void;
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
              >
                {heading.label}
              </th>
            ))}
        </tr>
      </thead>
    );
  }

  render() {
    const { headings, children, className } = this.props;

    const classes = {
      mobile: classnames('Table Table--mobile', className),
      desktop: classnames('Table Table--desktop', className),
    };

    return (
      <React.Fragment>
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

        <table className={classes.desktop}>
          {this.renderHeads()}
          <tbody>{children}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
