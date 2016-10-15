import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { Action } from 'redux-actions';

import { IDevice, default as DeviceModel } from '../models/device';
import * as DeviceAction from '../actions/device';
import * as Api from '../api/device';

function* createAllDevices(action: Action<DeviceModel>): IterableIterator<any> {
  try {
    const model: DeviceModel = action.payload as DeviceModel;
    const radios: IDevice = yield call(Api.create, model.toFormData());
    yield put(DeviceAction.createDeviceSuccess(new DeviceModel(radios)));
  } catch (e) {
    yield put(DeviceAction.createDeviceError(e));
  }
}

export function* watchCreateRadio() {
  yield* takeEvery(DeviceAction.CREATE_DEVICE, createAllDevices);
};

export default [
  fork(watchCreateRadio)
];
