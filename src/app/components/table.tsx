import * as React from 'react';
import classnames from 'classnames';

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

  render() {
    const { headings, children, className } = this.props;

    const classes = {
      wrapper: classnames('Table', className),
    };

    return (
      <table className={classes.wrapper}>
        <thead>
          <tr>
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
        <tbody>{children}</tbody>
      </table>
    );
  }
}

export default Table;
