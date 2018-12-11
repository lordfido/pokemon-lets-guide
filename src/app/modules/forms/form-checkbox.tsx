import classnames from 'classnames';
import * as React from 'react';

import { IFieldProps } from './field';

interface IOwnProps {
  options: IFieldProps;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

class Checkbox extends React.Component<IOwnProps> {
  public static displayName = 'Checkbox';

  public render() {
    const { options, onClick, onChange, onFocus } = this.props;

    return (
      <label htmlFor={options.id} className={classnames('Checkbox', options.className)}>
        <input
          id={options.id}
          name={options.id}
          className="Checkbox-field"
          type="checkbox"
          required={options.isRequired}
          disabled={options.isDisabled}
          defaultChecked={typeof options.defaultValue === 'boolean' ? options.defaultValue : undefined}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
        />

        <span className="Checkbox-label">
          <div className={classnames('Checkbox-switch', { 'is-on': options.isChecked })} />
          {options.icon && <i className={classnames('fa', { [`fa-${options.icon}`]: options.icon })} />}
          {options.label}
        </span>
      </label>
    );
  }
}

export default Checkbox;
