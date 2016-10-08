import { createAction } from 'redux-actions';
import RadioModel from '../models/radio';

const actionPrefix = 'RADIO_';
export const GET_RADIOS = `${actionPrefix}GET_RADIOS`;
export const GET_RADIOS_SUCCESS = `${actionPrefix}GET_RADIOS_SUCCESS`;
export const GET_RADIOS_ERROR = `${actionPrefix}GET_RADIOS_ERROR`;
export const CREATE_RADIO = `${actionPrefix}CREATE_RADIO`;
export const CREATE_RADIO_SUCCESS = `${actionPrefix}CREATE_RADIO_SUCCESS`;
export const CREATE_RADIO_ERROR = `${actionPrefix}CREATE_RADIO_ERROR`;
export const START_RADIO = `${actionPrefix}START_RADIO`;
export const START_RADIO_SUCCESS = `${actionPrefix}START_RADIO_SUCCESS`;
export const START_RADIO_ERROR = `${actionPrefix}START_RADIO_ERROR`;
export const STOP_RADIO = `${actionPrefix}STOP_RADIO`;
export const STOP_RADIO_SUCCESS = `${actionPrefix}STOP_RADIO_SUCCESS`;
export const STOP_RADIO_ERROR = `${actionPrefix}STOP_RADIO_ERROR`;
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

export const createRadio = createAction<RadioModel>(
  CREATE_RADIO,
  (model: RadioModel) => model
);

export const createRadioSuccess = createAction<RadioModel>(
  CREATE_RADIO_SUCCESS,
  (model: RadioModel) => model
);

export const createRadioError = createAction<string>(
  CREATE_RADIO_ERROR,
  (text: string) => text
);

export const startRadio = createAction<number>(
  START_RADIO,
  (id: number) => id
);

export const startRadioSuccess = createAction<string>(
  START_RADIO_SUCCESS,
  message => message
);

export const startRadioError = createAction<string>(
  START_RADIO_ERROR,
  message => message
);

export const stopRadio = createAction<void>(
  STOP_RADIO,
  () => null
);

export const stopRadioSuccess = createAction<string>(
  STOP_RADIO_SUCCESS,
  message => message
);

export const stopRadioError = createAction<string>(
  STOP_RADIO_ERROR,
  message => message
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
