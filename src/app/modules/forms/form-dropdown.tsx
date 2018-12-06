import * as React from 'react';
import classnames from 'classnames';
import Select from 'react-select';

import { FieldProps } from './field';

interface Options extends FieldProps {}

interface OwnProps {
  options: Options;
  onClick: any;
  onChange: any;
  onFocus: any;
}

class Dropdown extends React.Component<OwnProps> {
  static displayName = 'Dropdown';

  render() {
    const { options, onClick, onChange, onFocus } = this.props;

    if (options.isMulti) {
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

          <Select
            placeholder={options.placeholder}
            options={options.options}
            onChange={onChange}
            isMulti
            isDisabled={(options.isDisabled && !options.isAlwaysEnabled) || options.isAlwaysDisabled}
          />
        </label>
      );
    }

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
