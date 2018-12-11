export interface IResource {
  type: string;
  id: number | void;
}

export interface IOption {
  id: string;
  type: string;
  label: string;
  value: string;
}

export interface IError {
  channel: string;
  reason: string;
  body: string;
}

export interface IFormPicture {
  type: string;
  url: string;
}

export interface IFormPayload {
  form: string;
  resource: string;
  picture: string;
  errors?: any[];
}

export interface IPersistedForm {
  state: string;
  picture?: IFormPicture;
  errors: any[];
}
