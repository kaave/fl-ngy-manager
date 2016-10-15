import { createAction } from 'redux-actions';

import UserModel from '../models/device';
import DeviceModel from '../models/device';

const actionPrefix = 'DEVICE_';
export const DEVICE_READ = `${actionPrefix}DEVICE_READ`;
export const GET_DEVICES = `${actionPrefix}GET_DEVICES`;
export const GET_DEVICES_SUCCESS = `${actionPrefix}GET_DEVICES_SUCCESS`;
export const GET_DEVICES_ERROR = `${actionPrefix}GET_DEVICES_ERROR`;
export const CREATE_DEVICE = `${actionPrefix}CREATE_DEVICE`;
export const CREATE_DEVICE_SUCCESS = `${actionPrefix}CREATE_DEVICE_SUCCESS`;
export const CREATE_DEVICE_ERROR = `${actionPrefix}CREATE_DEVICE_ERROR`;
export const SET_DEVICE_FORM = `${actionPrefix}SET_DEVICE_FORM`;
export const UPDATE_FORM_NAME = `${actionPrefix}UPDATE_FORM_NAME`;
export const UPDATE_FORM_KEY = `${actionPrefix}UPDATE_FORM_KEY`;
export const UPDATE_FORM_TYPECODE = `${actionPrefix}UPDATE_FORM_TYPECODE`;
export const UPDATE_FORM_SOURCE = `${actionPrefix}UPDATE_FORM_SOURCE`;
export const ERASE_FORM = `${actionPrefix}ERASE_FORM`;

export const deviceRead = createAction<DeviceModel>(
  DEVICE_READ,
  (device: DeviceModel) => device
);

export const getDevices = createAction<null>(
  GET_DEVICES,
  () => null
);

export const getDevicesSuccess = createAction<UserModel[]>(
  GET_DEVICES_SUCCESS,
  (models: UserModel[]) => models
);

export const getDevicesError = createAction<string>(
  GET_DEVICES_ERROR,
  (text: string) => text
);

export const createDevice = createAction<DeviceModel>(
  CREATE_DEVICE,
  (model: DeviceModel) => model
);

export const createDeviceSuccess = createAction<DeviceModel>(
  CREATE_DEVICE_SUCCESS,
  (model: DeviceModel) => model
);

export const createDeviceError = createAction<string>(
  CREATE_DEVICE_ERROR,
  (text: string) => text
);

export const setDeviceForm = createAction<UserModel>(
  SET_DEVICE_FORM,
  (model: UserModel) => model
);

export const updateFormName = createAction<string>(
  UPDATE_FORM_NAME,
  (text: string) => text
);

export const updateFormKey = createAction<string>(
  UPDATE_FORM_KEY,
  (text: string) => text
);

export const updateFormTypeCode = createAction<number>(
  UPDATE_FORM_TYPECODE,
  (code: number) => code
);

export const updateFormSource = createAction<string>(
  UPDATE_FORM_SOURCE,
  (text: string) => text
);

export const eraseForm = createAction<void>(
  ERASE_FORM,
  () => null
);
