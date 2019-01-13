import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Space from '../../components/space';

import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../root.models';
import { CheckboxOutput, ICheckboxOptions } from './form.models';

const sheet: ISheet = {
  field: {
    verticalAlign: 'middle',
  },
  label: {
    display: 'inline-block',
    fontFamily: formInputStyles.field.fontFamily,
    fontSize: formInputStyles.field.fontSize,
    lineHeight: formInputStyles.field.lineHeight,
    paddingLeft: 4,
  },
  wrapper: {
    ...formInputStyles.field,
    color: formInputStyles.wrapper.color,
    fontSize: formInputStyles.wrapper.fontSize,
    margin: formInputStyles.wrapper.margin,
    marginTop: formInputStyles.wrapper.marginTop,
    paddingBottom: 7,
    paddingTop: 7,
    textAlign: formInputStyles.wrapper.textAlign,
    width: formInputStyles.wrapper.width,

    '&:active, &focus': {
      border: formInputStyles.field.border,
      boxShadow: 'none',
    },
  },
  wrapperDisabled: formInputStyles.fieldDisabled,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: ICheckboxOptions;
  onChange: (event: CheckboxOutput) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const unstyledCheckbox = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      htmlFor={options.id}
      data-type={options.type}
      className={classnames(
        classes.wrapper,
        options.className,
        className,
        options.isDisabled ? classes.wrapperDisabled : undefined
      )}
    >
      <input
        id={options.id}
        name={options.id}
        className={classes.field}
        type="checkbox"
        required={options.isRequired}
        disabled={options.isDisabled}
        defaultChecked={!!options.defaultChecked}
        onChange={onChangeProxy}
        onFocus={onFocus}
      />

      <span className={classes.label}>
        <div className={classnames(classes.checkbox, { [classes.isOn]: options.isChecked })} />
        {options.icon && <FontAwesomeIcon icon={options.icon} />}
        {options.icon && options.label && <Space />}
        {options.label}
      </span>
    </label>
  );
};

const Checkbox = injectSheet(sheet)(unstyledCheckbox);

export default Checkbox;
