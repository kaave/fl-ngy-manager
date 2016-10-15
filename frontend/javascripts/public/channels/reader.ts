/// <reference path="../../../../node_modules/@types/rails-actioncable/index.d.ts" />

import * as ActionCable from 'actioncable';

const cable = ActionCable.createConsumer();

export default function(loadCallback: Function): ActionCable.Channel {
  return cable.subscriptions.create({
    channel: 'ReaderChannel',
    room: 'read'
  }, {
    connected(): void {
      console.log('connected');
    },
    disconnected(): void {
      console.log('disconnected');
    },
    received(obj: Object): void {
      loadCallback(obj);
    }
  });
}
