import * as React from 'react';

import DeviceModel from '../../models/device';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  devices: DeviceModel[];
  dispatch: (type: DispatchEvents, params: DeviceModel) => void;
}

interface DeviceRawProps {
  device: DeviceModel;
  dispatch: (type: DispatchEvents, params: DeviceModel) => void;
}

class DeviceRow extends React.Component<DeviceRawProps, {}> {
  constructor(props: DeviceRawProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(_e: React.MouseEvent<HTMLLIElement>): void {
    if (this.props.device != null) {
      // this.props.dispatch('SetDeviceForm', new DeviceModel(this.props.user.toJSON()));
    }
  }

  render(): JSX.Element {
    const { device: { name, typeCode, key, source } } = this.props;

    return (
      <li className="list-group-item" style={{ cursor: 'pointer' }} onClick={this.handleClick}>
        Key: {key} TypeCode: {typeCode} <small>{source}</small>
      </li>
    );
  }
}

export default function({ devices, dispatch }: Props): JSX.Element {
  return (
    <div className="col-md-12">
      <h3>デバイス一覧</h3>
      <ul className="list-group">
        {devices.map((device, i) => (<DeviceRow key={i} device={device} dispatch={dispatch} />))}
      </ul>
    </div>
  );
}
