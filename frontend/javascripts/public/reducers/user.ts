import { Action } from 'redux-actions';

import * as Actions from '../actions/user';
import { default as UserModel, IUserSrc } from '../models/user';

export function userList(state: UserModel[] = [], { type, payload }: Action<UserModel | UserModel[] | IUserSrc>): UserModel[] {
  switch (type) {
  case Actions.GET_USERS_SUCCESS:
    return payload as UserModel[];
  case Actions.UPDATE_USER_SUCCESS:
    const updateUser = payload as IUserSrc;
    return state.map(user => user.id === updateUser.id ? UserModel.parse(updateUser) : user);
  default:
    return state;
  }
}

export function userFormModel(state: UserModel, action: Action<UserModel|string|number>): UserModel | null {
  switch (action.type) {
  case Actions.SET_USER_FORM:
    return action.payload as UserModel;
  case Actions.UPDATE_FORM_NAME:
    return new UserModel(Object.assign({}, state, { name: action.payload }));
  case Actions.UPDATE_FORM_EMAIL:
    return new UserModel(Object.assign({}, state, { email: action.payload }));
  case Actions.UPDATE_FORM_DEVICES:
    if (typeof action.payload !== 'number') {
      throw new TypeError('Error! action.payload is not Number!');
    }

    const index = state.devices.indexOf(action.payload);
    return new UserModel(Object.assign({}, state, {
      devices: index === -1 ? [
        ...state.devices,
        action.payload
      ] : [
        ...state.devices.slice(0, index),
        ...state.devices.slice(index + 1)
      ]
    }));
  case Actions.UPDATE_USER_SUCCESS:
    return null;
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
