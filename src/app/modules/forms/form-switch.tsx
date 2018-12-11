import classnames from 'classnames';
import * as React from 'react';

import { IFieldProps } from './field';

import Space from '../../components/space';

interface IOwnProps {
  options: IFieldProps;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

class Switch extends React.Component<IOwnProps> {
  public static displayName = 'Switch';

  public render() {
    const { options, onClick, onChange, onFocus } = this.props;

    return (
      <label htmlFor={options.id} className={classnames('Switch', options.className)}>
        <input
          id={options.id}
          name={options.id}
          className="Switch-field"
          type="checkbox"
          required={options.isRequired}
          disabled={options.isDisabled}
          defaultChecked={typeof options.defaultValue === 'boolean' ? options.defaultValue : undefined}
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
  }
}

export default Switch;
