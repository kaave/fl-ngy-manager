import * as fetch from 'isomorphic-fetch';
import { IRadio } from '../models/radio';

export function index(): Promise<IRadio[]> {
  return fetch('/api/v1/radios/all')
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
