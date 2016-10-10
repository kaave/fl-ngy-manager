import Radio from './radio';
import User from './user';

export default function* () {
  yield [
    ...Radio,
    ...User
  ];
}
