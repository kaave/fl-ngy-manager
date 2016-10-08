import { IRadio } from '../models/radio';

export function index(): Promise<IRadio[]> {
  return fetch('/api/v1/radios/all')
    .then(res => res.json())
    .then((radios: IRadio[]) => radios);
}
