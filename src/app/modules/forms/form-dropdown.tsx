import classnames from 'classnames';
import * as React from 'react';
import Select from 'react-select';

import TouchableContent from '../../components/touchable-content';
import { IFieldProps } from './field';

interface IOptions extends IFieldProps {
  colourStyles?: any;
}

interface IOwnProps {
  options: IOptions;
  onClick: any;
  onChange: any;
  onFocus: any;
}

class Dropdown extends React.Component<IOwnProps> {
  public static displayName = 'Dropdown';

  public render() {
    const { options, onClick, onChange, onFocus } = this.props;

    if (options.isMulti) {
      return (
        <label
          htmlFor={options.id}
          className={classnames('Dropdown', options.className, {
            'is-submitted': options.isSubmitted || options.error,
          })}
        >
          <span className="Dropdown-label">
            <TouchableContent options={options} />
          </span>

          <Select
            placeholder={options.placeholder}
            options={options.options}
            defaultValue={
              options.options
                ? options.options.filter(option => {
                    if (options.defaultValue) {
                      if (typeof options.defaultValue !== 'string' && typeof options.defaultValue !== 'boolean') {
                        return options.defaultValue.findIndex(o => o === option.value) >= 0;
                      }

                      return options.defaultValue === option.value;
                    }

                    return false;
                  })
                : null
            }
            onChange={onChange}
            isMulti
            isDisabled={options.isDisabled}
            styles={options.colourStyles}
          />
        </label>
      );
    }

    return (
      <label
        className={classnames('Dropdown', options.className, {
          'is-submitted': options.isSubmitted || options.error,
        })}
      >
        <span className="Dropdown-label">
          <TouchableContent options={options} />
        </span>

        <select
          id={options.id}
          name={options.id}
          className={classnames('Dropdown-field', { 'has-errors': options.error })}
          defaultValue={options.model || ''}
          onClick={onClick}
          onChange={onChange}
          onFocus={onFocus}
          disabled={options.isDisabled}
        >
          {options.options &&
            options.options.map(option => (
              <option
                key={option.id}
                className="Dropdown-options"
                value={option.value}
                selected={!!(options.defaultValue && options.defaultValue === option.value)}
              >
                {option.label}
              </option>
            ))}
        </select>

        {options.error && <span className="Dropdown-error">{options.error}</span>}
      </label>
    );
  }
}

export default Dropdown;
