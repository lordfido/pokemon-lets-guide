import classnames from 'classnames';
import * as React from 'react';

import { IDateOptions } from './form.models';

interface IOwnProps {
  options: IDateOptions;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// TODO: Add a React date-picker
const DatePicker = ({ options, onChange, onClick, onFocus }: IOwnProps) => (
  <div className="Date">
    <label htmlFor={options.id} className="Date-label">
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      <span>{options.label}</span>
    </label>

    <input
      type="date"
      id={options.id}
      name={options.id}
      className={classnames('Date-field', options.className, { 'has-errors': options.error })}
      placeholder={options.placeholder}
      disabled={options.isDisabled}
      required={options.isRequired}
      defaultValue={options.defaultValue || ''}
      onClick={onClick}
      onChange={onChange}
      onFocus={onFocus}
    />

    {options.error && <span className="Date-error">{options.error}</span>}
  </div>
);

export default DatePicker;
