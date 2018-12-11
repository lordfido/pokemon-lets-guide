import * as React from 'react';
import { log } from '../../../common/utils/logger';

import { Button } from '../../components/button';
import Checkbox from './form-checkbox';
import Date from './form-date';
import Dropdown from './form-dropdown';
import Switch from './form-switch';
import Text from './form-text';

interface IResource {
  type: string;
  id: number | void;
}

interface IOption {
  id: string;
  type: string;
  label: string;
  value: string;
  icon?: string;
}

export interface IFieldProps {
  type: string;
  id: string;
  updateId?: string;
  model?: string | void;
  form?: string;
  defaultValue?: string | boolean | string[] | void;

  className?: string;
  label?: string;
  icon?: string | React.ReactElement<{}>;
  iconLast?: boolean;
  placeholder?: string;

  isRequired?: boolean;
  isSubmitted?: boolean;
  isChecked?: boolean;
  isDiactivatable?: boolean;
  isDisabled?: boolean;
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
  isMulti?: boolean;

  error?: string;

  minLength?: number;
  maxLength?: number;
  options?: IOption[];
  fields?: IFieldProps[];
  resource?: IResource;

  onClick?: (params?: any) => void;
  onChange?: (params?: any) => void;
  onFocus?: (params?: any) => void;
  onUpload?: (result: string, response: any) => void;
}

const checkIsDisabled = (options: IFieldProps) =>
  (typeof options.isDiactivatable === 'undefined' || options.isDiactivatable) &&
  ((options.isDisabled && !options.isAlwaysEnabled) || options.isAlwaysDisabled);

interface IOwnProps {
  options: IFieldProps;
}

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
      <span key={options.updateId || options.id} style={styles.wrapper}>
        {field}
      </span>
    );
  }

  public render() {
    const { options: defaultOptions } = this.props;

    const options = {
      ...defaultOptions,
      isDisabled: checkIsDisabled(defaultOptions),
    };

    switch (options.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
      case 'textarea':
        return this.renderWrappedField(
          <Text options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
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
          <Dropdown options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'multi':
        return this.renderWrappedField(
          <Dropdown
            options={{ ...options, isMulti: true }}
            onClick={this.onClick}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        );

      case 'date':
        return this.renderWrappedField(
          <Date options={options} onClick={this.onClick} onChange={this.onChange} onFocus={this.onFocus} />
        );

      case 'button':
        return this.renderWrappedField(<Button options={options} />);

      default:
        return null;
    }
  }
}

export default Field;
