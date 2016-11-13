import { Action } from 'redux-actions';
import * as moment from 'moment';

import * as Actions from '../actions/workEvent';
import { default as WorkEventModel, IWorkEventApi } from '../models/workEvent';

export function workEventList(state: WorkEventModel[] = [], { type, payload }: Action<WorkEventModel | WorkEventModel[] | IWorkEventApi>): WorkEventModel[] {
  switch (type) {
  case Actions.GET_EVENTS_SUCCESS:
    return payload as WorkEventModel[];
  default:
    return state;
  }
}

export function workEventYearMonth(state: moment.Moment = moment(), { type, payload }: Action<void>): moment.Moment {
  switch (type) {
  case Actions.PREV_MONTH:
    return state.clone().add('month', -1);
  case Actions.NEXT_MONTH:
    return state.clone().add('month', 1);
  default:
    return state;
  }
}

export default {
  workEventList,
  workEventYearMonth
};
