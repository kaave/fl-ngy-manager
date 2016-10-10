import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { Action } from 'redux-actions';

import { IUser, default as UserModel } from '../models/user';
import * as UserAction from '../actions/user';
import * as Api from '../api/User';

function* getAllUsers(action: Action<void>): IterableIterator<any> {
  try {
    const users: IUser[] = yield call(Api.index);
    yield put(UserAction.getUsersSuccess(users.map(user => new UserModel(user))));
  } catch (e) {
    yield put(UserAction.getUsersError(e));
  }
}

export function* watchGetUsers() {
  yield* takeLatest(UserAction.GET_USERS, getAllUsers);
};

export default [
  fork(watchGetUsers)
];
