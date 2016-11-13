import Radio from './radio';
import User from './user';
import Device from './device';
import WorkEvent from './workEvent';

export default function* () {
  yield [
    ...Radio,
    ...User,
    ...Device,
    ...WorkEvent
  ];
}
