export interface IEvent {
  id?: number;
  eventAt: Date;
  userId?: number;
}

export interface IEventApi {
  id: number;
  event_at: Date;
  user_id?: number;
}

export default class Event implements IEvent {
  id?: number;
  eventAt: Date;
  userId?: number;

  constructor(prev?: IEvent) {
    this.init(prev);
  }

  init(prev?: IEvent): void {
    if (prev) {
      this.id = prev.id;
      this.eventAt = prev.eventAt;
      this.userId = prev.userId;
    } else {
      this.eventAt = new Date(2001, 0, 1, 0, 0, 0);
    }
  }

  static parse({ id, event_at, user_id }: IEventApi): Event {
    return new Event({
      id,
      eventAt: event_at,
      userId: user_id
    });
  }

  IsValid(): boolean {
    return (
      this.IsValidId() &&
      this.IsValidUserId()
    );
  }

  IsValidId(): boolean {
    return this.id > 0;
  }

  IsValidUserId(): boolean {
    return this.userId > 0;
  }

  toFormData(): FormData {
    const formData = new FormData();

    formData.append('eventAt', this.eventAt);

    if (this.IsValidId()) {
      formData.append('id', this.id);
    }

    if (this.IsValidUserId()) {
      formData.append('user_id', this.userId);
    }

    return formData;
  }

  static parseApiResult(data: IEventApi): Event {
    return new Event({
      id: data.id,
      eventAt: new Date(data.event_at),
      userId: data.user_id,
    });
  }

  toJSON(): IEvent {
    const result: IEvent = {
      id: this.id,
      eventAt: this.eventAt,
      userId: this.userId
    };

    return result;
  }
}
