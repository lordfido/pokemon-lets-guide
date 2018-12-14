import classnames from 'classnames';
import * as React from 'react';
import Select from 'react-select';

import TouchableContent from '../../components/touchable-content';

import { IDropdownOptions } from './form.models';

interface IOwnProps {
  options: IDropdownOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
  onClick?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement> | any) => void;
}

const Dropdown = ({ options, onChange, onClick, onFocus }: IOwnProps) => (
  <label
    htmlFor={options.id}
    className={classnames('Dropdown', options.className, {
      'is-submitted': options.isSubmitted || options.error,
    })}
  >
    <span className="Dropdown-label">
      <TouchableContent options={options} />
    </span>

    {options.isMulti && (
      <Select
        placeholder={options.placeholder}
        options={options.options}
        defaultValue={
          options.options
            ? options.options.filter(option => {
                if (options.defaultValue) {
                  return options.defaultValue.findIndex(o => o === option.value) >= 0;
                }

                return false;
              })
            : null
        }
        onChange={onChange}
        isMulti
        isDisabled={options.isDisabled}
        styles={options.colourStyles}
      />
    )}

    {!options.isMulti && (
      <select
        id={options.id}
        name={options.id}
        className={classnames('Dropdown-field', { 'has-errors': options.error })}
        defaultValue={options.defaultValue ? options.defaultValue : undefined}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        disabled={options.isDisabled}
      >
        {options.options &&
          options.options.map(option => (
            <option key={option.id} className="Dropdown-options" value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    )}

    {options.error && <span className="Dropdown-error">{options.error}</span>}
  </label>
);

export default Dropdown;
