import { Action } from 'redux-actions';

import * as Actions from '../actions/radio';
import RadioModel from '../models/radio';

export function formModel(state: RadioModel = new RadioModel(), action: Action<string>): RadioModel {
  switch (action.type) {
  case Actions.UPDATE_FORM_NAME:
    return new RadioModel(Object.assign({}, state, { name: action.payload }));
  case Actions.UPDATE_FORM_URL:
    return new RadioModel(Object.assign({}, state, { url: action.payload }));
  case Actions.UPDATE_FORM_MEMO:
    return new RadioModel(Object.assign({}, state, { memo: action.payload }));
  case Actions.ERASE_FORM:
    return new RadioModel();
  default:
    return state;
  }
}

export default {
  formModel,
};
