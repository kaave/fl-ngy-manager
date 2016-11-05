import { Action } from 'redux-actions';
import * as moment from 'moment';

import * as Actions from '../actions/event';
import { default as EventModel, IEventApi } from '../models/event';

export function eventList(state: EventModel[] = [], { type, payload }: Action<EventModel | EventModel[] | IEventApi>): EventModel[] {
  switch (type) {
  case Actions.GET_EVENTS_SUCCESS:
    return payload as EventModel[];
  default:
    return state;
  }
}

export function eventYearMonth(state: moment.Moment = moment(), { type, payload }: Action<void>): moment.Moment {
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
  eventList,
  eventYearMonth
};
