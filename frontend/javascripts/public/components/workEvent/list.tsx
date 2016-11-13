import * as React from 'react';
import * as moment from 'moment';
import { range } from 'lodash';

import EventModel from '../../models/workEvent';
import UserModel from '../../models/user';
import DispatchEvents from '../../types/DispatchEvents';

interface IDayInfo {
  key: string;
  jp: string;
  className: string;
}

export interface Props {
  workEventYearMonth: moment.Moment;
  users: UserModel[];
  workEvents: EventModel[];
  dispatch: (type: DispatchEvents) => void;
}

const dayInfo: IDayInfo[] = [
  { key: 'Sun', jp: '日', className: 'text-danger' },
  { key: 'Mon', jp: '月', className: '' },
  { key: 'Tue', jp: '火', className: '' },
  { key: 'Wed', jp: '水', className: '' },
  { key: 'Thu', jp: '木', className: '' },
  { key: 'Fri', jp: '金', className: '' },
  { key: 'Sat', jp: '土', className: 'text-primary' }
];

function EventTable(props: { firstDay: number; lastDate: number; }): JSX.Element {
  return (
    <table className="table table-bordered">
      <thead>
        <tr className="work-event__head">
          <th className="work-event__head--date">&nbsp;</th>
          <th className="work-event__head--day">&nbsp;</th>
          <th className="work-event__head--start">出勤</th>
          <th className="work-event__head--end">退勤</th>
        </tr>
      </thead>
      <tbody>
        {range(1, props.lastDate + 1).map((date, i) => (
          <EventRow key={i} date={date} dayInfo={dayInfo[(props.firstDay + i) % 7]} />
        ))}
      </tbody>
    </table>
  );
}

function EventRow(props: { dayInfo: IDayInfo, date: number, start?: string, end?: string }): JSX.Element {
  return (
    <tr className={`work-event__row day-${props.dayInfo.key.toLowerCase()}`}>
      <td className={`work-event__row--date ${props.dayInfo.className}`}>{props.date}</td>
      <td className={`work-event__row--day ${props.dayInfo.className}`}>{props.dayInfo.jp}</td>
      <td className="work-event__row--start">{props.start || ' '}</td>
      <td className="work-event__row--end">{props.end || ' '}</td>
    </tr>
  );
}

export default class extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handlePrevClick(): void {
    this.props.dispatch('ClickEventPrevMonth');
  }

  handleNextClick(): void {
    this.props.dispatch('ClickEventNextMonth');
  }

  render(): JSX.Element {
    const { users, workEventYearMonth } = this.props;
    const year = workEventYearMonth.year();
    const month = workEventYearMonth.month() + 1;
    const startDate = moment(new Date(year, month - 1, 1));
    const firstDay = startDate.day();
    const lastDate = startDate.clone().add('month', 1).add('day', -1).date();

    return (
      <div className="col-md-12 event__list">
        <h3 className="work-event__header">
          <small className="work-event__prev-month" onClick={this.handlePrevClick}>&lt; {month === 1 ? 12 : month - 1}月</small>
          {year}年 {month}月
          <small className="work-event__next-month" onClick={this.handleNextClick}>{month === 12 ? 1 : month + 1}月 &gt;</small>
        </h3>
        {users.map((user, i) => (
          <div key={i} className="col-md-4">
            <h4>{user.name}</h4>
            <EventTable firstDay={firstDay} lastDate={lastDate} />
          </div>
        ))}
      </div>
    );
  }
}
