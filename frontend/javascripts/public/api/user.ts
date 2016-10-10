import * as fetch from 'isomorphic-fetch';
import { IUser } from '../models/user';

export function index(): Promise<IUser[]> {
  return fetch('/api/v1/users/all')
    .then(res => res.json())
    .then((users: IUser[]) => users);
}
