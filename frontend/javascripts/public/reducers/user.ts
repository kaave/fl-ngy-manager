import { Action } from 'redux-actions';

import * as Actions from '../actions/user';
import UserModel from '../models/user';

export function userList(state = [], { type, payload }: Action<UserModel | UserModel[]>): UserModel[] {
  switch (type) {
  case Actions.GET_USERS_SUCCESS:
    return payload as UserModel[];
  default:
    return state;
  }
}

export function userFormModel(state: UserModel, action: Action<UserModel|string>): UserModel | null {
  switch (action.type) {
  case Actions.SET_USER_FORM:
    return action.payload as UserModel;
  case Actions.UPDATE_FORM_NAME:
    return new UserModel(Object.assign({}, state, { name: action.payload }));
  case Actions.UPDATE_FORM_EMAIL:
    return new UserModel(Object.assign({}, state, { email: action.payload }));
  case Actions.ERASE_FORM:
    return null;
  default:
    return state || null;
  }
}

export default {
  userList,
  userFormModel
};
