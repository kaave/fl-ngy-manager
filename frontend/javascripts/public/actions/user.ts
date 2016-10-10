import { createAction } from 'redux-actions';
import UserModel from '../models/user';

const actionPrefix = 'USER_';
export const GET_USERS = `${actionPrefix}GET_USERS`;
export const GET_USERS_SUCCESS = `${actionPrefix}GET_USERS_SUCCESS`;
export const GET_USERS_ERROR = `${actionPrefix}GET_USERS_ERROR`;

export const getUsers = createAction<null>(
  GET_USERS,
  () => null
);

export const getUsersSuccess = createAction<UserModel[]>(
  GET_USERS_SUCCESS,
  (models: UserModel[]) => models
);

export const getUsersError = createAction<string>(
  GET_USERS_ERROR,
  (text: string) => text
);
