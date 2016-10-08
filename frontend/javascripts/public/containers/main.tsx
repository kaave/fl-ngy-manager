import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as fetch from 'isomorphic-fetch';

import * as RadioActions from '../actions/radio';

import RadioModel from '../models/radio';
import DispatchEvents from '../types/DispatchEvents';

import Navbar from '../components/navbar';
import RadioList from '../components/radio/list';
import RadioForm from '../components/radio/form';

export interface Props {
  dispatch: Dispatch<{}>;
  formModel: RadioModel;
  radios: RadioModel[];
}

export interface State {
}

export class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.dispatch = this.dispatch.bind(this);

    this.props.dispatch(RadioActions.getRadios());
  }

  dispatch(type: DispatchEvents, params?: any): void {
    switch (type) {
      case 'StartRadio':
        this.startRadio(params);
        break;
      case 'StopRadio':
        this.stopRadio();
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
        this.props.dispatch(RadioActions.createRadio(this.props.formModel));
        break;
      case 'ClickEraseRadioForm':
        this.props.dispatch(RadioActions.eraseForm(params));
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
    const { formModel } = this.props;

    return (
      <main className="main">
        <Navbar />
        <div className="container" style={{ marginTop: '48px' }}>
          <div className="row">
            <RadioList radios={[]} dispatch={this.dispatch} />
            <RadioForm dispatch={this.dispatch} radio={formModel} />
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state: Object) => (state);

export default connect(mapStateToProps)(Main);
