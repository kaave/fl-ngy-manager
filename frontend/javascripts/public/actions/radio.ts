import { createAction } from 'redux-actions';
import RadioModel from '../models/radio';

const actionPrefix = 'RADIO_';
export const GET_RADIOS = `${actionPrefix}GET_RADIOS`;
export const GET_RADIOS_SUCCESS = `${actionPrefix}GET_RADIOS_SUCCESS`;
export const GET_RADIOS_ERROR = `${actionPrefix}GET_RADIOS_ERROR`;
export const UPDATE_FORM_NAME = `${actionPrefix}UPDATE_FORM_NAME`;
export const UPDATE_FORM_URL = `${actionPrefix}UPDATE_FORM_URL`;
export const UPDATE_FORM_MEMO = `${actionPrefix}UPDATE_FORM_MEMO`;
export const ERASE_FORM = `${actionPrefix}ERASE_FORM`;

export const getRadios = createAction<null>(
  GET_RADIOS,
  () => null
);

export const getRadiosSuccess = createAction<RadioModel[]>(
  GET_RADIOS_SUCCESS,
  (models: RadioModel[]) => models
);

export const getRadiosError = createAction<string>(
  GET_RADIOS_ERROR,
  (text: string) => text
);

export const updateFormName = createAction<string>(
  UPDATE_FORM_NAME,
  (text: string) => text
);

export const updateFormUrl = createAction<string>(
  UPDATE_FORM_URL,
  (text: string) => text
);

export const updateFormMemo = createAction<string>(
  UPDATE_FORM_MEMO,
  (text: string) => text
);

export const eraseForm = createAction<void>(
  ERASE_FORM,
  () => null
);
