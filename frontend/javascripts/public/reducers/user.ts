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

export default {
  userList
};
