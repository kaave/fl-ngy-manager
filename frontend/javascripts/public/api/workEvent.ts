import * as fetch from 'isomorphic-fetch';
import { IWorkEvent } from '../models/workEvent';

export function index(): Promise<IWorkEvent[]> {
  return fetch('/api/v1/work_events')
    .then(res => res.json())
    .then((events: IWorkEvent[]) => events);
}

export function create(body: FormData): Promise<boolean> {
  return fetch('/api/v1/work_events', {
    method: 'POST',
    body
  }).then(res => res.json())
    .then((events: IWorkEvent[]) => events);
}
