import * as moment from 'moment';

export interface IWorkEvent {
  id?: number;
  eventAt: Date;
  userId?: number;
  startAt: Date;
  endAt?: Date;
}

export interface IWorkEventApi {
  id: number;
  event_at: string;
  user_id: number;
  start_at: string;
  end_at?: string;
}

export default class WorkEvent implements IWorkEvent {
  id?: number;
  eventAt: Date;
  userId?: number;
  startAt: Date;
  endAt?: Date;

  constructor(prev?: IWorkEvent) {
    this.init(prev);
  }

  init(prev?: IWorkEvent): void {
    if (prev) {
      this.id = prev.id;
      this.eventAt = prev.eventAt;
      this.userId = prev.userId;
      this.startAt = prev.startAt;
      this.endAt = prev.endAt;
    } else {
      const today = moment().toDate();
      this.eventAt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      this.startAt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    }
  }

  IsValid(): boolean {
    return (
      this.IsValidId() &&
      this.IsValidUserId() &&
      this.IsValidStartAt() &&
      this.IsValidEndAt()
    );
  }

  IsValidId(): boolean {
    return this.id > 0;
  }

  IsValidUserId(): boolean {
    return this.userId > 0;
  }

  IsValidStartAt(): boolean {
    return this.eventAt.getTime() <= this.startAt.getTime();
  }

  IsValidEndAt(): boolean {
    return this.endAt == null || this.startAt.getTime() < this.endAt.getTime();
  }

  toFormData(): FormData {
    const formData = new FormData();

    formData.append('event_at', this.eventAt);
    formData.append('start_at', this.startAt);

    if (this.IsValidId()) {
      formData.append('id', this.id);
    }

    if (this.IsValidUserId()) {
      formData.append('user_id', this.userId);
    }

    if (this.IsValidEndAt()) {
      formData.append('end_at', this.endAt);
    }

    return formData;
  }

  static parseApiResult({ id, event_at, user_id, start_at, end_at }: IWorkEventApi): WorkEvent {
    const sendData = {
      id,
      eventAt: new Date(event_at),
      userId: user_id,
      startAt: new Date(start_at)
    } as IWorkEvent;

    if (end_at) {
      sendData.endAt = new Date(end_at);
    }

    return new WorkEvent(sendData);
  }

  toJSON(): IWorkEvent {
    const result: IWorkEvent = {
      id: this.id,
      eventAt: this.eventAt,
      userId: this.userId,
      startAt: this.startAt,
      endAt: this.endAt
    };

    return result;
  }
}
