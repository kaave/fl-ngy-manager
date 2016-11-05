import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as RadioActions from '../actions/radio';
import RadioModel from '../models/radio';

import * as UserActions from '../actions/user';
import UserModel from '../models/user';

import * as DeviceActions from '../actions/device';
import { default as DeviceModel, IDeviceSrc } from '../models/device';

import * as EventActions from '../actions/event';
import { default as EventModel, IEventApi } from '../models/event';

import DispatchEvents from '../types/DispatchEvents';

import Navbar from '../components/navbar/';

import channel from '../channels/reader';

export interface Props {
  /*
   * props
   */
  dispatch: Dispatch<{}>;
  children: JSX.Element;

  /*
   * redux state
   */
  radioFormModel: RadioModel;
  radioList: RadioModel[];
  userFormModel: UserModel;
  userList: UserModel[];
  deviceFormModel: DeviceModel;
  deviceList: DeviceModel[];
  eventList: EventModel[];
}

/*
 * TODO: もう少しスマートにしたい
 */
const mountPointNode = document.getElementById('mount-point');
const paths = {
  googleOauth: mountPointNode ? mountPointNode.getAttribute('data-google-oauth-path') || '#' : '#'
};

export class Main extends React.Component<Props, {}> {
  channel: ActionCable.Channel;

  constructor(props: Props) {
    super(props);

    this.dispatch = this.dispatch.bind(this);
    this.handleDeviceRead = this.handleDeviceRead.bind(this);

    this.props.dispatch(RadioActions.getRadios());
    this.props.dispatch(UserActions.getUsers());
    this.props.dispatch(DeviceActions.getDevices());
    this.props.dispatch(EventActions.getEvents());

    this.channel = channel(this.handleDeviceRead);
  }

  handleDeviceRead({ src, datetime, mode }: IDeviceSrc): void {
    switch (mode) {
      case 'DeviceRead':
        const parseModel = DeviceModel.parse(src);
        const newModel = new DeviceModel(Object.assign({}, parseModel.toJSON(), {
          name: this.props.deviceFormModel.toJSON().name
        }));
        this.props.dispatch(DeviceActions.deviceRead(newModel));
        break;
      default:
        break;
    }
  }

  dispatch(type: DispatchEvents, params?: any): void {
    switch (type) {
      case 'StartRadio':
        this.props.dispatch(RadioActions.startRadio(params));
        break;
      case 'StopRadio':
        this.props.dispatch(RadioActions.stopRadio());
        break;
      case 'UpdateRadioFormName':
        this.props.dispatch(RadioActions.updateFormName(params));
        break;
      case 'UpdateRadioFormUrl':
        this.props.dispatch(RadioActions.updateFormUrl(params));
        break;
      case 'UpdateRadioFormMemo':
        this.props.dispatch(RadioActions.updateFormMemo(params));
        break;
      case 'ClickSubmitRadioForm':
        this.props.dispatch(RadioActions.createRadio(this.props.radioFormModel));
        break;
      case 'ClickEraseRadioForm':
        this.props.dispatch(RadioActions.eraseForm());
        break;
      case 'SetUserForm':
        this.props.dispatch(UserActions.setUserForm(params));
        break;
      case 'UpdateUserFormName':
        this.props.dispatch(UserActions.updateFormName(params));
        break;
      case 'UpdateUserFormEmail':
        this.props.dispatch(UserActions.updateFormEmail(params));
        break;
      case 'UpdateUserFormDevices':
        this.props.dispatch(UserActions.updateFormDevices(params));
        break;
      case 'ClickSubmitUserForm':
        this.props.dispatch(UserActions.updateUser(this.props.userFormModel));
        break;
      case 'ClickEraseUserForm':
        this.props.dispatch(UserActions.eraseForm());
        break;
      case 'UpdateDeviceFormName':
        this.props.dispatch(DeviceActions.updateFormName(params));
        break;
      case 'UpdateDeviceFormKey':
        this.props.dispatch(DeviceActions.updateFormKey(params));
        break;
      case 'UpdateDeviceFormTypeCode':
        this.props.dispatch(DeviceActions.updateFormTypeCode(params));
        break;
      case 'UpdateDeviceFormSource':
        this.props.dispatch(DeviceActions.updateFormSource(params));
        break;
      case 'ClickSubmitDeviceForm':
        this.props.dispatch(DeviceActions.createDevice(this.props.deviceFormModel));
        break;
      case 'ClickEraseDeviceForm':
        this.props.dispatch(DeviceActions.eraseForm());
        break;
      default:
        break;
    }
  }

  render(): JSX.Element {
    const { radioFormModel, radioList, userFormModel, userList, deviceFormModel, deviceList, eventList } = this.props;
    const props = {
      dispatch: this.dispatch,
      user: userFormModel,
      users: userList,
      device: deviceFormModel,
      devices: deviceList,
      radio: radioFormModel,
      radios: radioList,
      events: eventList
    };

    return (
      <main className="main">
        <Navbar dispatch={this.dispatch} googleOauthPath={paths.googleOauth} />
        <div className="container" style={{ marginTop: '60px' }}>
          <div className="row">
            {this.props.children && React.cloneElement(this.props.children, props)}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state: Object) => state;

export default connect(mapStateToProps)(Main);
