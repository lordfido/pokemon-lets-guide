import classnames from 'classnames';
import * as React from 'react';

import Space from '../../components/space';

import { ICheckboxOptions } from './form.models';

interface IOwnProps {
  options: ICheckboxOptions;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Switch = ({ options, onChange, onClick, onFocus }: IOwnProps) => (
  <label htmlFor={options.id} className={classnames('Switch', options.className)}>
    <input
      id={options.id}
      name={options.id}
      className="Switch-field"
      type="checkbox"
      required={options.isRequired}
      disabled={options.isDisabled}
      defaultChecked={!!options.defaultChecked}
      onClick={onClick}
      onChange={onChange}
      onFocus={onFocus}
    />

    <span className="Switch-label">
      <div className={classnames('Switch-switch', { 'is-on': options.isChecked })} />
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      {options.label && <Space />}
      {options.label}
    </span>
  </label>
);

export default Switch;
