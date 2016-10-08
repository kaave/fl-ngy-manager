import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { Action } from 'redux-actions';

import { IRadio, default as RadioModel } from '../models/radio';
import * as RadioAction from '../actions/radio';
import * as Api from '../api/radio';

function* getAllRadios(action: Action<null>): IterableIterator<any> {
  try {
    const radios: IRadio[] = yield call(Api.index);
    yield put(RadioAction.getRadiosSuccess(radios.map(radio => new RadioModel(radio))));
  } catch (e) {
    yield put(RadioAction.createRadioError());
  }
}

function* createAllRadios(action: Action<RadioModel>): IterableIterator<any> {
  try {
    const model: RadioModel = action.payload as RadioModel;
    const radios: IRadio = yield call(Api.create, model.toFormData());
    yield put(RadioAction.createRadioSuccess(new RadioModel(radios)));
  } catch (e) {
    yield put(RadioAction.createRadioError());
  }
}

function* watchGetRadios() {
  yield* takeLatest(RadioAction.GET_RADIOS, getAllRadios);
};

function* watchCreateRadio() {
  yield* takeEvery(RadioAction.CREATE_RADIO, createAllRadios);
};

export default function* root() {
  yield [
    fork(watchGetRadios),
    fork(watchCreateRadio)
  ];
}
