import * as React from 'react';
import { connect } from 'react-redux';

import { EDIT_ICON, EDIT_LABEL, CANCEL_ICON, CANCEL_LABEL } from '../../../constants/buttons';

import Buttons from '../../components/buttons';
import { getFormState } from '../../root.reducer';
import { mapClientErrors } from '../../utils/error-handler';
import { RootState } from '../../root.types';
import { Permissions } from '../../utils/permissions';
import { FieldProps } from './field';

export function updateFields(
  { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  key = 'fields'
) {
  // @ts-ignore
  const { name, value, checked } = target;
  // @ts-ignore
  const modifiedField: FieldProps = this.state[key].find((field: FieldProps) => field.id === name);
  const isCheckable = (field: FieldProps | void) =>
    field && (field.type === 'checkbox' || field.type === 'radio' || field.type === 'switch');

  // Normal field
  if (typeof modifiedField !== 'undefined') {
    // @ts-ignore
    this.setState({
      // @ts-ignore
      [key]: this.state[key].map((field: FieldProps) => {
        if (field.id === name) {
          const newField = isCheckable(field) ? { ...field, isChecked: checked } : { ...field, model: value };

          const error = mapClientErrors(newField);

          return {
            ...newField,
            error,
          };
        }

        return field;
      }),
    });

    // Array field
  } else {
    // Select the field's wrapper
    // @ts-ignore
    const fieldsWrapper: FieldProps[] = this.state[key];

    // If fields wrapper exists
    if (fieldsWrapper) {
      let modifiedArrayField: FieldProps[];
      let modifiedArrayFieldIndex: number;

      // Loop through each one
      fieldsWrapper.forEach((arrayField, index) => {
        // Look for the modified field into this arrayField
        let modifiedFieldIndex = arrayField.fields && arrayField.fields.findIndex(field => field.id === name);
        let modifiedSubFieldIndex = -1;

        let newModifiedField;

        // If modified field is inside of this arrayField
        if (arrayField.fields && modifiedFieldIndex && modifiedFieldIndex >= 0) {
          modifiedArrayFieldIndex = index;

          const checkableField = arrayField.fields[modifiedFieldIndex];

          newModifiedField = isCheckable(checkableField)
            ? { ...checkableField, isChecked: checked }
            : { ...checkableField, model: value };

          modifiedArrayField = [
            ...arrayField.fields.slice(0, modifiedFieldIndex),
            newModifiedField,
            ...arrayField.fields.slice(modifiedFieldIndex + 1),
          ];

          // If no modifiedFieldIndex, look in the second level
        } else {
          if (arrayField.fields && modifiedFieldIndex && modifiedFieldIndex < 0 && arrayField.fields) {
            arrayField.fields.forEach((field, index2) => {
              if (field.fields) {
                field.fields.forEach((f, index3) => {
                  if (f.id === name) {
                    modifiedArrayFieldIndex = index;
                    modifiedFieldIndex = index2;
                    modifiedSubFieldIndex = index3;
                  }
                });
              }
            });

            if (modifiedFieldIndex >= 0 && modifiedSubFieldIndex && modifiedSubFieldIndex >= 0) {
              const fields =
                (arrayField.fields[modifiedFieldIndex] && arrayField.fields[modifiedFieldIndex].fields) || [];
              const checkableSubField = fields && fields[modifiedSubFieldIndex];

              newModifiedField = isCheckable(checkableSubField)
                ? { ...checkableSubField, isChecked: checked }
                : { ...checkableSubField, model: value };

              modifiedArrayField = [
                ...arrayField.fields.slice(0, modifiedFieldIndex),
                {
                  ...arrayField.fields[modifiedFieldIndex],
                  fields: [
                    ...fields.slice(0, modifiedSubFieldIndex),
                    newModifiedField,
                    ...fields.slice(modifiedSubFieldIndex + 1),
                  ],
                },
                ...arrayField.fields.slice(modifiedFieldIndex + 1),
              ];
            }
          }
        }
      });

      // @ts-ignore
      if (modifiedArrayField && modifiedArrayFieldIndex >= 0) {
        // @ts-ignore
        this.setState({
          // @ts-ignore
          [key]: this.state[key].map((field: FieldProps, index: number) => {
            if (index === modifiedArrayFieldIndex) {
              return {
                ...field,
                fields: modifiedArrayField,
              };
            }

            return field;
          }),
        });
      }
    }
  }
}

interface OwnState {
  canBeLocked: boolean;
  hasPermissions: boolean;
  isEditEnabled: boolean;
}

interface OwnProps {
  form: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  render: (isEditEnabled: boolean) => void;
  permissions?: Permissions;
  className?: string;
  defaultEnabled?: boolean;
}

interface StateProps {
  isSubmitted: boolean;
}

type Props = OwnProps & StateProps;

class SmartForm extends React.Component<Props, OwnState> {
  static displayName = 'SmartForm';

  constructor(props: Props) {
    super(props);

    this.state = {
      canBeLocked: true,
      hasPermissions: false,
      isEditEnabled: false,
    };
  }

  componentDidMount() {
    const { permissions, defaultEnabled, isSubmitted } = this.props;

    // If there is a permissions key, form can be locked/unlocked
    const canBeLocked = !!permissions;

    // If user is able to edit form data
    const hasPermissions = !!(permissions && permissions.editing && permissions.editing.value);

    // If form is enabled to be modified by default
    const isEditEnabled =
      !isSubmitted && (!canBeLocked || (typeof defaultEnabled !== 'undefined' && defaultEnabled === true));

    this.setState({ canBeLocked, isEditEnabled, hasPermissions });
  }

  /**
   * This method is called when user clicks on edit/cancel button,
   * and this updates the form state, so all fields are enabled/disabled
   */
  toggle = () => {
    this.setState({ isEditEnabled: !this.state.isEditEnabled });
  };

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { handleSubmit } = this.props;
    const { canBeLocked, hasPermissions, isEditEnabled } = this.state;

    if (isEditEnabled && (!canBeLocked || (canBeLocked && hasPermissions))) {
      handleSubmit(event);
    }
  };

  render() {
    const { className, form, render } = this.props;
    const { canBeLocked, isEditEnabled, hasPermissions } = this.state;

    const toggleButton = {
      type: 'button',
      id: 'toggle',
      label: isEditEnabled ? CANCEL_LABEL : EDIT_LABEL,
      icon: isEditEnabled ? CANCEL_ICON : EDIT_ICON,
      className: isEditEnabled ? '' : 'Button--primary',
      onClick: this.toggle,
      isDisabled: canBeLocked && !hasPermissions,
    };

    return (
      <form className={className} id={form} name={form} onSubmit={this.onSubmit}>
        {render(isEditEnabled)}

        {canBeLocked && <Buttons options={[toggleButton]} />}
      </form>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  isSubmitted: getFormState(state)(ownProps.form) === 'submitted',
});

export default connect(mapStateToProps)(SmartForm);
