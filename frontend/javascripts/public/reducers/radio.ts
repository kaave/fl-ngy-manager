import { Action } from 'redux-actions';

import * as Actions from '../actions/radio';
import RadioModel from '../models/radio';

export function radioList(state = [], { type, payload }: Action<RadioModel[]>): RadioModel[] {
  switch (type) {
  case Actions.GET_RADIOS_SUCCESS:
    return payload as RadioModel[];
  default:
    return state;
  }
}

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
  radioList,
  formModel
};
