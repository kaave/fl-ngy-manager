import { createAction } from 'redux-actions';
import UserModel from '../models/user';

const actionPrefix = 'USER_';
export const GET_USERS = `${actionPrefix}GET_USERS`;
export const GET_USERS_SUCCESS = `${actionPrefix}GET_USERS_SUCCESS`;
export const GET_USERS_ERROR = `${actionPrefix}GET_USERS_ERROR`;
export const SET_USER_FORM = `${actionPrefix}SET_USER_FORM`;
export const UPDATE_FORM_NAME = `${actionPrefix}UPDATE_FORM_NAME`;
export const UPDATE_FORM_EMAIL = `${actionPrefix}UPDATE_FORM_EMAIL`;
export const UPDATE_FORM_DEVICES = `${actionPrefix}UPDATE_FORM_DEVICES`;
export const UPDATE_USER = `${actionPrefix}UPDATE_USER`;
export const UPDATE_USER_SUCCESS = `${actionPrefix}UPDATE_USER_SUCCESS`;
export const UPDATE_USER_ERROR = `${actionPrefix}UPDATE_USER_ERROR`;
export const ERASE_FORM = `${actionPrefix}ERASE_FORM`;

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

export const setUserForm = createAction<UserModel>(
  SET_USER_FORM,
  (model: UserModel) => model
);

export const updateFormName = createAction<string>(
  UPDATE_FORM_NAME,
  (text: string) => text
);

export const updateFormEmail = createAction<string>(
  UPDATE_FORM_EMAIL,
  (text: string) => text
);

export const updateFormDevices = createAction<number>(
  UPDATE_FORM_DEVICES,
  (id: number) => id
);

export const updateUser = createAction<UserModel>(
  UPDATE_USER,
  (model: UserModel) => model
);

export const updateUserSuccess = createAction<UserModel>(
  UPDATE_USER_SUCCESS,
  (model: UserModel) => model
);

export const updateUserError = createAction<string>(
  UPDATE_USER_ERROR,
  (text: string) => text
);

export const eraseForm = createAction<void>(
  ERASE_FORM,
  () => null
);
