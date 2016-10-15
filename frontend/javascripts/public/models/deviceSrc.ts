import ActionCableEvents from '../types/ActionCableEvents';

interface IDeviceSrc {
  src: string;
  mode: ActionCableEvents;
  datetime: string;
};

export default IDeviceSrc;
