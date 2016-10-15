import { Action } from 'redux-actions';

import * as Actions from '../actions/device';
import DeviceModel from '../models/device';

export function deviceList(state = [], { type, payload }: Action<DeviceModel | DeviceModel[]>): DeviceModel[] {
  switch (type) {
  case Actions.GET_DEVICES_SUCCESS:
    return payload as DeviceModel[];
  // case Actions.CREATE_DEVICE_SUCCESS:
  //   return [
  //     ...state,
  //     payload as DeviceModel
  //   ];
  default:
    return state;
  }
}

export function deviceFormModel(state: DeviceModel = new DeviceModel(), action: Action<string | number | DeviceModel>): DeviceModel {
  switch (action.type) {
  case Actions.CREATE_DEVICE_SUCCESS:
    return new DeviceModel();
  case Actions.DEVICE_READ:
    return action.payload as DeviceModel;
  case Actions.UPDATE_FORM_NAME:
    return new DeviceModel(Object.assign({}, state.toJSON(), { name: action.payload }));
  case Actions.UPDATE_FORM_KEY:
    return new DeviceModel(Object.assign({}, state.toJSON(), { key: action.payload }));
  case Actions.UPDATE_FORM_TYPECODE:
    return new DeviceModel(Object.assign({}, state.toJSON(), { typeCode: action.payload }));
  case Actions.UPDATE_FORM_SOURCE:
    return new DeviceModel(Object.assign({}, state.toJSON(), { source: action.payload }));
  case Actions.ERASE_FORM:
    return new DeviceModel();
  default:
    return state;
  }
}

export default {
  deviceList,
  deviceFormModel
};
