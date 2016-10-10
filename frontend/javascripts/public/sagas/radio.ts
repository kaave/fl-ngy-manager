import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { Action } from 'redux-actions';

import { IRadio, default as RadioModel } from '../models/radio';
import * as RadioAction from '../actions/radio';
import * as Api from '../api/radio';

function* getAllRadios(action: Action<void>): IterableIterator<any> {
  try {
    const radios: IRadio[] = yield call(Api.index);
    yield put(RadioAction.getRadiosSuccess(radios.map(radio => new RadioModel(radio))));
  } catch (e) {
    yield put(RadioAction.createRadioError(e));
  }
}

function* createAllRadios(action: Action<RadioModel>): IterableIterator<any> {
  try {
    const model: RadioModel = action.payload as RadioModel;
    const radios: IRadio = yield call(Api.create, model.toFormData());
    yield put(RadioAction.createRadioSuccess(new RadioModel(radios)));
  } catch (e) {
    yield put(RadioAction.createRadioError(e));
  }
}

function* startRadio(action: Action<number>): IterableIterator<any> {
  try {
    const message: string = yield call(Api.start, action.payload);
    yield put(RadioAction.startRadioSuccess(message));
  } catch (e) {
    yield put(RadioAction.startRadioError(e));
  }
}

function* stopRadio(action: Action<void>): IterableIterator<any> {
  try {
    const message: string = yield call(Api.stop);
    yield put(RadioAction.stopRadioSuccess(message));
  } catch (e) {
    yield put(RadioAction.stopRadioError(e));
  }
}

function* watchGetRadios() {
  yield* takeLatest(RadioAction.GET_RADIOS, getAllRadios);
};

function* watchCreateRadio() {
  yield* takeEvery(RadioAction.CREATE_RADIO, createAllRadios);
};

function* watchStartRadio() {
  yield* takeLatest(RadioAction.START_RADIO, startRadio);
}

function* watchStopRadio() {
  yield* takeLatest(RadioAction.STOP_RADIO, stopRadio);
}

export default function* root() {
  yield [
    fork(watchGetRadios),
    fork(watchCreateRadio),
    fork(watchStartRadio),
    fork(watchStopRadio)
  ];
}
