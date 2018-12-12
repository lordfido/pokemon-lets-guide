import * as React from 'react';
import { log } from '../../../common/utils/logger';

import Button from '../../components/button';
import Checkbox from './form-checkbox';
import Date from './form-date';
import Dropdown from './form-dropdown';
import Switch from './form-switch';
import Text from './form-text';

import { ICheckboxOptions, IDateOptions, IDropdownOptions, IGenericField, ITextOptions } from './form.models';

interface IOwnProps {
  options: IGenericField & (ICheckboxOptions | IDateOptions | IDropdownOptions | ITextOptions);
}

interface IDisablingProps {
  isDiactivatable?: boolean;
  isDisabled?: boolean;
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
}

const isDisabled = ({ isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled }: IDisablingProps) =>
  (typeof isDiactivatable === 'undefined' || isDiactivatable) && ((disabled && !isAlwaysEnabled) || isAlwaysDisabled);

class Field extends React.Component<IOwnProps> {
  public static displayName = 'Field';

  public onClick = (
    event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onClick() of <${options.id}>`);

    if (options.onClick) {
      options.onClick(event);
    }
  };

  public onFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onFocus() of <${options.id}>`);

    if (options.onFocus) {
      options.onFocus(event);
    }
  };

  public onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement>
  ) => {
    const { options } = this.props;

    log(`onChange() of <${options.id}>`, this.props);

    if (options.onChange) {
      if (event.target) {
        switch (event.target.type) {
          case 'checkbox':
            // @ts-ignore
            options.onChange(event.target.checked);
            break;

          default:
            options.onChange(event.target.value);
        }
      } else {
        options.onChange(event);
      }
    }
  };

  public renderWrappedField(field: React.ReactElement<{}>) {
    const { options } = this.props;

    const styles = {
      wrapper: {
        display: 'block',
        textAlign: options.type === 'button' ? 'center' : 'initial',
      } as React.CSSProperties,
    };

    return (
      <span key={options.updateId || options.id} style={styles.wrapper} data-type={options.type}>
        {field}
      </span>
    );
  }

  public render() {
    const {
      options: { isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled, ...defaultOptions },
    } = this.props;

    const options = {
      ...defaultOptions,
      isDisabled: isDisabled({ isDiactivatable, isDisabled: disabled, isAlwaysDisabled, isAlwaysEnabled }),
    };

    switch (options.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
      case 'textarea':
        return this.renderWrappedField(
          <Text
            options={{
              ...options,
              defaultValue: 'defaultValue' in options ? String(options.defaultValue) : undefined,
            }}
            onClick={this.onClick}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        );

      case 'switch':
        return this.renderWrappedField(
          <Switch options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'checkbox':
        return this.renderWrappedField(
          <Checkbox options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'dropdown':
        return this.renderWrappedField(
          <Dropdown
            options={{
              ...options,
              defaultValue:
                'defaultValue' in options && typeof options.defaultValue !== 'string'
                  ? options.defaultValue
                  : undefined,
              options: 'options' in options ? options.options : [],
            }}
            onClick={this.onClick}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        );

      case 'multi':
        return this.renderWrappedField(
          <Dropdown
            options={{
              ...options,
              defaultValue:
                'defaultValue' in options && typeof options.defaultValue !== 'string'
                  ? options.defaultValue
                  : undefined,
              isMulti: true,
              options: 'options' in options ? options.options : [],
            }}
            onClick={this.onClick}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        );

      case 'date':
        return this.renderWrappedField(
          <Date
            options={{
              ...options,
              defaultValue:
                'defaultValue' in options && typeof options.defaultValue === 'string'
                  ? options.defaultValue
                  : undefined,
            }}
            onClick={this.onClick}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        );

      case 'button':
        return this.renderWrappedField(<Button options={options} />);

      default:
        return null;
    }
  }
}

export default Field;
