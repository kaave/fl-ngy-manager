import * as fetch from 'isomorphic-fetch';
import { IRadio } from '../models/radio';

export function index(): Promise<IRadio[]> {
  return fetch('/api/v1/radios')
    .then(res => res.json())
    .then((radios: IRadio[]) => radios);
}

export function create(body: FormData): Promise<boolean> {
  return fetch('/api/v1/radios', {
    method: 'POST',
    body
  }).then(res => res.json())
    .then((radios: IRadio[]) => radios);
}

export function start(id: number): Promise<string> {
  const body = new FormData();
  body.append('id', id);

  return fetch('/api/v1/radios/start', {
    method: 'POST',
    body
  }).then(res => res.text())
    .then(message => message);
}

export function stop(): Promise<string> {
  return fetch('/api/v1/radios/stop')
    .then(res => res.text())
    .then(message => message);
}
