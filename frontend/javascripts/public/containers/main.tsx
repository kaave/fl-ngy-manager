import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import * as RadioActions from "../actions/radio";
import RadioModel from "../models/radio";

import * as UserActions from "../actions/user";
import UserModel from "../models/user";

import DispatchEvents from "../types/DispatchEvents";
import Navbar from "../components/navbar/";
import RadioList from "../components/radio/list";
import RadioForm from "../components/radio/form";

export interface Props {
  /*
   * props
   */
  dispatch: Dispatch<{}>;

  /*
   * redux state
   */
  radioFormModel: RadioModel;
  radioList: RadioModel[];
  userList: UserModel[];
}

export interface State {
}

/*
 * TODO: もう少しスマートにしたい
 */
const mountPointNode = document.getElementById('mount-point');
const paths = {
  googleOauth: mountPointNode ? mountPointNode.getAttribute('data-google-oauth-path') || '#' : '#'
};

export class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.dispatch = this.dispatch.bind(this);

    this.props.dispatch(RadioActions.getRadios());
    this.props.dispatch(UserActions.getUsers());
  }

  dispatch(type: DispatchEvents, params?: any): void {
    switch (type) {
      case 'StartRadio':
        this.props.dispatch(RadioActions.startRadio(params));
        break;
      case 'StopRadio':
        this.props.dispatch(RadioActions.stopRadio());
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
        this.props.dispatch(RadioActions.createRadio(this.props.radioFormModel));
        break;
      case 'ClickEraseRadioForm':
        this.props.dispatch(RadioActions.eraseForm());
        break;
      default:
        break;
    }
  }

  render(): JSX.Element {
    const { radioFormModel, radioList } = this.props;

    return (
      <main className="main">
        <Navbar dispatch={this.dispatch} googleOauthPath={paths.googleOauth} />
        <div className="container" style={{ marginTop: '48px' }}>
          <div className="row">
            {radioList.length > 0 && <RadioList dispatch={this.dispatch} radios={radioList} />}
            <RadioForm dispatch={this.dispatch} radio={radioFormModel} />
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state: Object) => (state);

export default connect(mapStateToProps)(Main);
