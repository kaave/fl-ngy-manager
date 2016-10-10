import * as React from 'react';
import * as classNames from 'classnames';

import UserModel from '../../models/user';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  dispatch: (type: DispatchEvents, params?: any) => void;
  user: UserModel;
}

export default class extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEMail = this.handleChangeEMail.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickErase = this.handleClickErase.bind(this);
  }

  handleChangeName(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateUserFormName', target.value);
  }

  handleChangeEMail(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateUserFormEmail', target.value);
  }

  handleClickSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.dispatch('ClickSubmitUserForm');
  }

  handleClickErase(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.dispatch('ClickEraseUserForm');
  }

  render(): JSX.Element {
    const { user } = this.props;

    return (
      <div className="col-md-12">
        <div className="form-group">
          <label>名前</label>
          <input type="text" className="form-control" placeholder="名前" value={user.name} onChange={this.handleChangeName} />
          <small className="form-text text-muted">自由な名前をつけてください。</small>
        </div>
        <div className="form-group">
          <label>メアド</label>
          <input type="text" className="form-control" placeholder="○○○@framelunch.jp" value={user.email} onChange={this.handleChangeEMail} />
          <small className="form-text text-muted">メールアドレスを入力してください。</small>
        </div>

        <button className="btn btn-primary" onClick={this.handleClickSubmit} disabled={!user.IsValid()}>
          <span className={classNames('fa', 'fa-paint-brush')} /> 更新
        </button>

        <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={this.handleClickErase}>
          <span className={classNames('fa', 'fa-ban')} /> キャンセル
        </button>
      </div>
    );
  }
}
