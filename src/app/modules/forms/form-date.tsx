import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Space from '../../components/space';

import { BORDER_RADIUS } from '../../../constants/styles/styles';
import { BRAND_COLOR } from '../../../constants/styles/styles-colors';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../root.models';
import { DateOutput, IDateOptions } from './form.models';

const sheet: ISheet = {
  field: formInputStyles.field,
  fieldDisabled: formInputStyles.fieldDisabled,
  label: formInputStyles.label,
  wrapper: {
    ...formInputStyles.wrapper,

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
  onChange: (value: DateOutput) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// TODO: Add a React date-picker
const unstyledDatePicker = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new Date(event.target.value).getTime());
  };

  return (
    <label htmlFor={options.id} data-type={options.type} className={classnames(classes.wrapper, className)}>
      <span className={classes.label}>
        {options.icon && <FontAwesomeIcon icon={options.icon} />}
        {options.icon && options.label && <Space />}
        <span>{options.label}</span>
      </span>

      <input
        type="date"
        data-type={options.type}
        id={options.id}
        name={options.id}
        className={classnames(classes.field, options.className, options.isDisabled ? classes.fieldDisabled : undefined)}
        placeholder={options.placeholder}
        disabled={options.isDisabled}
        required={options.isRequired}
        defaultValue={options.defaultValue ? new Date(options.defaultValue).toString() : undefined}
        onChange={onChangeProxy}
        onFocus={onFocus}
      />

      {options.error && <span className={classes.error}>{options.error}</span>}
    </label>
  );
};

const DatePicker = injectSheet(sheet)(unstyledDatePicker);

export default DatePicker;
