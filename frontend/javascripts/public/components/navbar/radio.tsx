import * as React from 'react';

import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  dispatch: (type: DispatchEvents, params?: string | number) => void;
}

export default class extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleClickStop = this.handleClickStop.bind(this);
  }

  handleClickStop(): void {
    this.props.dispatch('StopRadio');
  }

  render(): JSX.Element {
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          ネットラジオ <span className="caret" />
        </a>
        <ul className="dropdown-menu">
          <li><a href="#">一覧</a></li>
          <li><a href="#">追加</a></li>
          <li><a href="#" onClick={this.handleClickStop}>停止</a></li>
        </ul>
      </li>
    );
  }
}
