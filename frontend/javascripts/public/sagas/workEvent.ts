import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { Action } from 'redux-actions';

import { IWorkEventApi, default as WorkEventModel } from '../models/workEvent';
import * as EventAction from '../actions/workEvent';
import * as Api from '../api/workEvent';

function* getAllEvents(action: Action<void>): IterableIterator<any> {
  try {
    const devices: IWorkEventApi[] = yield call(Api.index);
    yield put(EventAction.getEventsSuccess(devices.map(device => WorkEventModel.parseApiResult(device))));
  } catch (e) {
    yield put(EventAction.getEventsError(e));
  }
}

export function* watchGetEvents(): {} {
  yield* takeLatest(EventAction.GET_EVENTS, getAllEvents);
};

export default [
  fork(watchGetEvents)
];
