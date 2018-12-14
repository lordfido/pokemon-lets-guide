import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { commonStyles } from './field.styles';

import { ISheet } from '../../root.models';
import { ICheckboxOptions } from './form.models';

const sheet: ISheet = {
  label: {
    ...commonStyles.field,
    backgroundColor: 'none',
    border: 'none',
    display: 'inline-block',
    margin: 0,
    minHeight: 0,
    padding: 0,
    paddingLeft: 4,
    width: 'auto',
  },
  wrapper: {
    ...commonStyles.field,
    color: commonStyles.wrapper.color,
    fontSize: commonStyles.wrapper.fontSize,
    margin: commonStyles.wrapper.margin,
    width: commonStyles.wrapper.width,
  },
  wrapperDisabled: commonStyles.fieldDisabled,
};

interface IOwnProps {
  classes: { [key: string]: string };
  options: ICheckboxOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const unstyledCheckbox = ({ classes, options, onChange, onClick, onFocus }: IOwnProps) => (
  <label
    htmlFor={options.id}
    className={classnames(classes.wrapper, options.className, options.isDisabled ? classes.wrapperDisabled : undefined)}
  >
    <input
      id={options.id}
      name={options.id}
      className={classes.field}
      type="checkbox"
      required={options.isRequired}
      disabled={options.isDisabled}
      defaultChecked={!!options.defaultChecked}
      onClick={onClick}
      onChange={onChange}
      onFocus={onFocus}
    />

    <span className={classes.label}>
      <div className={classnames(classes.checkbox, { [classes.isOn]: options.isChecked })} />
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      {options.label}
    </span>
  </label>
);

const Checkbox = injectSheet(sheet)(unstyledCheckbox);

export default Checkbox;
