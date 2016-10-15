import * as fetch from 'isomorphic-fetch';
import { IDevice } from '../models/device';

export function create(body: FormData): Promise<boolean> {
  return fetch('/api/v1/devices', {
    method: 'POST',
    body
  }).then(res => res.json())
    .then((devices: IDevice[]) => devices);
}
