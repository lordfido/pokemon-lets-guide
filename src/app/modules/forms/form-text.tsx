import classnames from 'classnames';
import * as React from 'react';
import TextArea from 'react-textarea-autosize';
import { ITextOptions } from './form.models';

interface IOwnProps {
  options: ITextOptions;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick: (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Text = ({ options, onChange, onClick, onFocus }: IOwnProps) => (
  <label htmlFor={options.id} className={classnames('Text', { 'is-submitted': options.isSubmitted || options.error })}>
    <span className="Text-label">
      {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
      <span>{options.label}</span>
    </span>

    {options.type !== 'textarea' && (
      <input
        id={options.id}
        name={options.id}
        type={options.type}
        className={classnames('Text-field', options.className, { 'has-errors': options.error })}
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
        className={classnames('Text-field', 'is-area', options.className, { 'has-errors': options.error })}
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

    {options.error && <span className="Text-error">{options.error}</span>}
  </label>
);

export default Text;
