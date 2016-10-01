import { createAction } from 'redux-actions';

const actionPrefix = 'RADIO_';
export const UPDATE_FORM_NAME = `${actionPrefix}UPDATE_FORM_NAME`;
export const UPDATE_FORM_URL = `${actionPrefix}UPDATE_FORM_URL`;
export const UPDATE_FORM_MEMO = `${actionPrefix}UPDATE_FORM_MEMO`;
export const CLEAR_FORM = `${actionPrefix}UPDATE_FORM_MEMO`;

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

export const clearForm = createAction<void>(
  CLEAR_FORM,
  () => null
);
