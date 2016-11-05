import { createAction } from 'redux-actions';
import EventModel from '../models/event';

const actionPrefix = 'Event_';
export const GET_EVENTS = `${actionPrefix}GET_EVENTS`;
export const GET_EVENTS_SUCCESS = `${actionPrefix}GET_EVENTS_SUCCESS`;
export const GET_EVENTS_ERROR = `${actionPrefix}GET_EVENTS_ERROR`;
export const CREATE_EVENT = `${actionPrefix}CREATE_EVENT`;
export const CREATE_EVENT_SUCCESS = `${actionPrefix}CREATE_EVENT_SUCCESS`;
export const CREATE_EVENT_ERROR = `${actionPrefix}CREATE_EVENT_ERROR`;
export const UPDATE_FORM_EVENT_AT = `${actionPrefix}UPDATE_FORM_EVENT_AT`;
export const UPDATE_FORM_USER_ID = `${actionPrefix}UPDATE_FORM_USER_ID`;
export const ERASE_FORM = `${actionPrefix}ERASE_FORM`;

export const getEvents = createAction<null>(
  GET_EVENTS,
  () => null
);

export const getEventsSuccess = createAction<EventModel[]>(
  GET_EVENTS_SUCCESS,
  (models: EventModel[]) => models
);

export const getEventsError = createAction<string>(
  GET_EVENTS_ERROR,
  (text: string) => text
);

export const createEvent = createAction<EventModel>(
  CREATE_EVENT,
  (model: EventModel) => model
);

export const createEventSuccess = createAction<EventModel>(
  CREATE_EVENT_SUCCESS,
  (model: EventModel) => model
);

export const createEventError = createAction<string>(
  CREATE_EVENT_ERROR,
  (text: string) => text
);

export const updateFormName = createAction<string>(
  UPDATE_FORM_EVENT_AT,
  (text: string) => text
);

export const updateFormUrl = createAction<string>(
  UPDATE_FORM_USER_ID,
  (text: string) => text
);

export const eraseForm = createAction<void>(
  ERASE_FORM,
  () => null
);

