import * as React from 'react';
import classnames from 'classnames';
import { FieldProps } from './field';

interface Options extends FieldProps {}

interface OwnProps {
  options: Options;
  onClick: (event: React.MouseEvent<HTMLSelectElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

class Dropdown extends React.Component<OwnProps> {
  static displayName = 'Dropdown';

  render() {
    const { options, onClick, onChange, onFocus } = this.props;

    return (
      <label
        className={classnames('Dropdown', options.className, {
          'is-submitted': options.isSubmitted || options.error,
        })}
      >
        <span className="Dropdown-label">
          {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
          {options.label}
        </span>

        <select
          id={options.id}
          name={options.id}
          className={classnames('Dropdown-field', { 'has-errors': options.error })}
          defaultValue={options.model || ''}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
        >
          {options.options &&
            options.options.map(option => (
              <option key={option.id} className="Dropdown-options" value={option.value}>
                {option.label}
              </option>
            ))}
        </select>

        {options.error && <span className="Dropdown-error">{options.error}</span>}
      </label>
    );
  }
}

export default Dropdown;
