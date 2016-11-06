import * as fetch from 'isomorphic-fetch';
import { IEvent } from '../models/workEvent';

export function index(): Promise<IEvent[]> {
  return fetch('/api/v1/events')
    .then(res => res.json())
    .then((events: IEvent[]) => events);
}

export function create(body: FormData): Promise<boolean> {
  return fetch('/api/v1/events', {
    method: 'POST',
    body
  }).then(res => res.json())
    .then((events: IEvent[]) => events);
}
