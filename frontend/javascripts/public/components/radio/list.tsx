import * as React from 'react';

import RadioModel from '../../models/radio';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  radios: RadioModel[];
  dispatch: (type: DispatchEvents, params: string | number) => void;
}

interface RadioRawProps {
  radio: RadioModel;
  dispatch: (type: DispatchEvents, params: string | number) => void;
}

class RadioRow extends React.Component<RadioRawProps, {}> {
  constructor(props: RadioRawProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(_e: React.MouseEvent<HTMLLIElement>): void {
    if (this.props.radio.id != null) {
      this.props.dispatch('StartRadio', this.props.radio.id);
    }
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
