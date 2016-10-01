import { Action } from 'redux-actions';

import * as Actions from '../actions/radio';
import RadioModel from '../models/radio';

function getInitModel(): RadioModel {
  return { name: '', url: '', memo: '' };
}
export function formValue(state: RadioModel = getInitModel(), action: Action<string>): RadioModel {
  switch (action.type) {
  case Actions.UPDATE_FORM_NAME:
    return Object.assign({}, state, { name: action.payload });
  case Actions.UPDATE_FORM_URL:
    return Object.assign({}, state, { url: action.payload });
  case Actions.UPDATE_FORM_MEMO:
    return Object.assign({}, state, { memo: action.payload });
  case Actions.CLEAR_FORM:
    return getInitModel();
  default:
    return state;
  }
}

export default {
  formValue,
};
