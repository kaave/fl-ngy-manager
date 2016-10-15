import Radio from './radio';
import User from './user';
import Device from './device';

export default function* () {
  yield [
    ...Radio,
    ...User,
    ...Device
  ];
}
