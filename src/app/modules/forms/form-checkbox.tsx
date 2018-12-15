import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { commonStyles } from './field.styles';

import { ISheet } from '../../root.models';
import { ICheckboxOptions } from './form.models';

const sheet: ISheet = {
  field: {
    verticalAlign: 'middle',
  },
  label: {
    display: 'inline-block',
    fontFamily: commonStyles.field.fontFamily,
    fontSize: commonStyles.field.fontSize,
    lineHeight: commonStyles.field.lineHeight,
    paddingLeft: 4,
  },
  wrapper: {
    ...commonStyles.field,
    color: commonStyles.wrapper.color,
    fontSize: commonStyles.wrapper.fontSize,
    margin: commonStyles.wrapper.margin,
    marginTop: commonStyles.wrapper.marginTop,
    paddingBottom: 7,
    paddingTop: 7,
    width: commonStyles.wrapper.width,

    '&:active, &focus': {
      border: commonStyles.field.border,
      boxShadow: 'none',
    },
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
