import * as React from 'react';

import Radio from '../models/radio';
import DispatchEvents from '../types/DispatchEvents';

import Navbar from '../components/navbar';
import RadioList from '../components/radio/list';
import RadioForm from '../components/radio/form';

export interface Props {
}

export interface State {
  radios: Radio[];
}

export default class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.dispatch = this.dispatch.bind(this);

    this.state = {
      radios: []
    };

    this.getAllRadios();
  }

  getAllRadios(): void {
    fetch('/api/v1/radios/all')
      .then(res => res.json())
      .then(radios => this.setState(Object.assign({}, this.state, { radios })));
  }

  dispatch(type: DispatchEvents, params: any): void {
    switch (type) {
      case 'StartRadio':
        this.startRadio(params);
        break;
      case 'StopRadio':
        this.stopRadio();
        break;
      default:
        break;
    }
  }

  startRadio(url: string): void {
    console.log(url);
    // fetch(`/api/v1/radios/start/${encodeURIComponent(url)}`)
    //   .then(res => {
    //     if (res.ok) {
    //       console.log('startRadio Success');
    //     } else {
    //       console.log('startRadio Fail');
    //     }
    //   });
  }

  stopRadio(): void {
    fetch('/api/v1/radios/stop')
      .then(res => {
        if (res.ok) {
          console.log('stopRadio Success');
        } else {
          console.log('stopRadio Fail');
        }
      });
  }

  render(): JSX.Element {
    const { radios } = this.state;

    return (
      <main className="main">
        <Navbar />
        <div className="container" style={{ marginTop: '48px' }}>
          <div className="row">
            <RadioList radios={radios} dispatch={this.dispatch} />
            <RadioForm />
          </div>
        </div>
      </main>
    );
  }
}
