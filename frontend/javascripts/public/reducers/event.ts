import { Action } from 'redux-actions';

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

export default {
  eventList
};
