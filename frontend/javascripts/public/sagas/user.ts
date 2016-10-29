import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { Action } from 'redux-actions';

import { IUser, IUserSrc, default as UserModel } from '../models/user';
import * as UserAction from '../actions/user';
import * as Api from '../api/User';

function* getAllUsers(action: Action<void>): IterableIterator<any> {
  try {
    const users: IUserSrc[] = yield call(Api.index);
    yield put(UserAction.getUsersSuccess(users.map(user => UserModel.parse(user))));
  } catch (e) {
    yield put(UserAction.getUsersError(e));
  }
}

function* updateUser(action: Action<UserModel>): IterableIterator<any> {
  try {
    const model: UserModel = action.payload as UserModel;
    const radios: IUser = yield call(Api.update, model.id, model.toFormData());
    yield put(UserAction.updateUserSuccess(new UserModel(radios)));
  } catch (e) {
    yield put(UserAction.updateUserError(e));
  }
}

export function* watchGetUsers() {
  yield* takeLatest(UserAction.GET_USERS, getAllUsers);
};

export function* watchUpdateUser() {
  yield* takeLatest(UserAction.UPDATE_USER, updateUser);
};

export default [
  fork(watchGetUsers),
  fork(watchUpdateUser)
];
