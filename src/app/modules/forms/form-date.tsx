import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { BORDER_RADIUS } from '../../../constants/styles';
import { BRAND_COLOR } from '../../../constants/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles-fonts';
import { commonStyles } from './field.styles';

import { ISheet } from '../../root.models';
import { IDateOptions } from './form.models';

const sheet: ISheet = {
  field: commonStyles.field,
  fieldDisabled: commonStyles.fieldDisabled,
  label: commonStyles.label,
  wrapper: {
    ...commonStyles.wrapper,

    '.vdp-datepicker__clear-button': {
      position: 'absolute',
      right: 10,
      top: 2,
    },

    '.vdp-datepicker__calendar .cell.selected': {
      backgroundColor: BRAND_COLOR,
      borderRadius: BORDER_RADIUS,
      color: TEXT_WHITE,
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: IDateOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// TODO: Add a React date-picker
const unstyledDatePicker = ({ classes, className, options, onChange, onClick, onFocus }: IOwnProps) => (
  <div data-type={options.type} className={classnames(classes.wrapper, className)}>
    <label htmlFor={options.id} className={classes.label}>
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      <span>{options.label}</span>
    </label>

    <input
      type="date"
      data-type={options.type}
      id={options.id}
      name={options.id}
      className={classnames(classes.field, options.className, options.isDisabled ? classes.fieldDisabled : undefined)}
      placeholder={options.placeholder}
      disabled={options.isDisabled}
      required={options.isRequired}
      defaultValue={options.defaultValue || ''}
      onClick={onClick}
      onChange={onChange}
      onFocus={onFocus}
    />

    {options.error && <span className={classes.error}>{options.error}</span>}
  </div>
);

const DatePicker = injectSheet(sheet)(unstyledDatePicker);

export default DatePicker;
