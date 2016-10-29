import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { Action } from 'redux-actions';

import { IDevice, IDeviceApi, default as DeviceModel } from '../models/device';
import * as DeviceAction from '../actions/device';
import * as Api from '../api/device';

function* getAllDevices(action: Action<void>): IterableIterator<any> {
  try {
    const devices: IDeviceApi[] = yield call(Api.index);
    yield put(DeviceAction.getDevicesSuccess(devices.map(device => DeviceModel.parseApiResult(device))));
  } catch (e) {
    yield put(DeviceAction.getDevicesError(e));
  }
}

function* createAllDevices(action: Action<DeviceModel>): IterableIterator<any> {
  try {
    const model: DeviceModel = action.payload as DeviceModel;
    const radios: IDevice = yield call(Api.create, model.toFormData());
    yield put(DeviceAction.createDeviceSuccess(new DeviceModel(radios)));
  } catch (e) {
    yield put(DeviceAction.createDeviceError(e));
  }
}

export function* watchGetDevices(): {} {
  yield* takeLatest(DeviceAction.GET_DEVICES, getAllDevices);
};

export function* watchCreateRadio(): {} {
  yield* takeEvery(DeviceAction.CREATE_DEVICE, createAllDevices);
};

export default [
  fork(watchGetDevices),
  fork(watchCreateRadio)
];
