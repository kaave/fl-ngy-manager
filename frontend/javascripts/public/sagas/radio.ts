import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Action } from 'redux-actions';

import { IRadio, default as RadioModel } from '../models/radio';
import * as RadioAction from '../actions/radio';
import * as Api from '../api/radio';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getAllRadios(action: Action<null>): IterableIterator<any> {
  try {
    const radios: IRadio[] = yield call(Api.index);
    yield put(RadioAction.getRadiosSuccess(radios.map(radio => new RadioModel(radio))));
  } catch (e) {
    yield put({type: RadioAction.GET_RADIOS_ERROR, message: e.message});
  }
}

function* radioSaga() {
  yield* takeLatest(RadioAction.GET_RADIOS, getAllRadios);
}

export default radioSaga;
