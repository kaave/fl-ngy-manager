import * as fetch from 'isomorphic-fetch';
import { IUser } from '../models/user';

export function index(): Promise<IUser[]> {
  return fetch('/api/v1/users')
    .then(res => res.json())
    .then((users: IUser[]) => users);
}

export function update(id: number, body: FormData): Promise<IUser[]> {
  return fetch(`/api/v1/users/${id}`, {
    method: 'PUT',
    body
  }).then(res => res.json())
    .then((user: IUser) => user);
}
