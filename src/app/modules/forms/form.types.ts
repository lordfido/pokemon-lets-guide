export interface Resource {
  type: string;
  id: number | void;
}

export interface Option {
  id: string;
  type: string;
  label: string;
  value: string;
}

export interface Error {
  channel: string;
  reason: string;
  body: string;
}

export interface FormPicture {
  type: string;
  url: string;
}

export interface FormPayload {
  form: string;
  resource: string;
  picture: string;
  errors?: Array<any>;
}

export interface PersistedForm {
  state: string;
  picture?: FormPicture;
  errors: Array<any>;
}
