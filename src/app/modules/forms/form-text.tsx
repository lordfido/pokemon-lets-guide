import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import TextArea from 'react-textarea-autosize';

import { commonStyles } from './field.styles';

import { PADDING_L } from '../../../constants/styles';

import { ISheet } from '../../root.models';
import { ITextOptions } from './form.models';

const sheet: ISheet = {
  field: commonStyles.field,
  fieldDisabled: commonStyles.fieldDisabled,
  label: commonStyles.label,
  textArea: {
    minHeight: 150,
    padding: PADDING_L,
    resize: 'vertical',
  },
  wrapper: commonStyles.wrapper,
};

interface IOwnProps {
  classes: { [key: string]: string };
  options: ITextOptions;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const unstyledText = ({ classes, options, onChange, onClick, onFocus }: IOwnProps) => (
  <label htmlFor={options.id} className={classes.wrapper}>
    <span className={classes.label}>
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      <span>{options.label}</span>
    </span>

    {options.type !== 'textarea' && (
      <input
        id={options.id}
        name={options.id}
        type={options.type}
        className={classnames(classes.field, options.className, options.isDisabled ? classes.fieldDisabled : undefined)}
        placeholder={options.placeholder}
        disabled={options.isDisabled}
        required={options.isRequired}
        defaultValue={options.defaultValue}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete="off"
      />
    )}

    {options.type === 'textarea' && (
      <TextArea
        id={options.id}
        name={options.id}
        className={classnames(
          classes.field,
          classes.textArea,
          options.className,
          options.isDisabled ? classes.fieldDisabled : undefined
        )}
        placeholder={options.placeholder}
        disabled={options.isDisabled}
        required={options.isRequired}
        defaultValue={options.defaultValue}
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete="off"
      />
    )}

    {options.error && <span className={classes.error}>{options.error}</span>}
  </label>
);

const Text = injectSheet(sheet)(unstyledText);

export default Text;
