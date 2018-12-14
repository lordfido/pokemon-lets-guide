import classnames from 'classnames';
import * as React from 'react';
import { getTranslation } from '../../utils/translations';

import Space from '../../components/space';

import { ICheckboxOptions } from './form.models';

const prevArrow = require('../../../assets/images/prev-arrow.png');
const nextArrow = require('../../../assets/images/next-arrow.png');

interface IOwnProps {
  options: ICheckboxOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      {options.icon && options.label && <Space />}
      {options.label}
    </span>

    <span className="Switch-options">
      <img className="Switch-arrow Switch--prev" src={prevArrow} />
      <span className="Switch-selectedOption">
        {options.defaultChecked || options.isChecked ? getTranslation('generic-yes') : getTranslation('generic-no')}
      </span>
      <img className="Switch-arrow Switch--next" src={nextArrow} />
    </span>
  </label>
);

export default Switch;
