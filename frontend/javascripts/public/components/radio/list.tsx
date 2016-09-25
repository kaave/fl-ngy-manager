import * as React from 'react';

import Radio from '../../models/radio';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  radios: Radio[];
  dispatch: (type: DispatchEvents, params: string) => void;
}

interface RadioRawProps {
  radio: Radio;
  dispatch: (type: DispatchEvents, params: string) => void;
}

class RadioRow extends React.Component<RadioRawProps, {}> {
  constructor(props: RadioRawProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(_e: React.MouseEvent): void {
    this.props.dispatch('StartRadio', this.props.radio.url);
  }

  render(): JSX.Element {
    const { radio: { url, name, memo } } = this.props;

    return (
      <li className="list-group-item" style={{ cursor: 'pointer' }} onClick={this.handleClick}>
        <span href={url}>
          {name} <small>{memo}</small>
        </span>
      </li>
    );
  }
}

export default function({ radios, dispatch }: Props): JSX.Element {
  return (
    <div className="col-md-12">
      <h3>一覧</h3>
      <ul className="list-group">
        {radios.map((radio, i) => (<RadioRow key={i} radio={radio} dispatch={dispatch} />))}
      </ul>
    </div>
  );
}
