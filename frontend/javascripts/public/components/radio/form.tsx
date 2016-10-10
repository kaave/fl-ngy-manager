import * as React from 'react';
import * as classNames from 'classnames';

import RadioModel from '../../models/radio';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  dispatch: (type: DispatchEvents, params?: any) => void;
  radio: RadioModel;
}

export default class extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeMemo = this.handleChangeMemo.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickErase = this.handleClickErase.bind(this);
  }

  handleChangeName(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateRadioFormName', target.value);
  }

  handleChangeUrl(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateRadioFormUrl', target.value);
  }

  handleChangeMemo(e: React.FormEvent<HTMLTextAreaElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateRadioFormMemo', target.value);
  }

  handleClickSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.dispatch('ClickSubmitRadioForm');
  }

  handleClickErase(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.dispatch('ClickEraseRadioForm');
  }

  render(): JSX.Element {
    const { radio } = this.props;

    return (
      <div className="col-md-12">
        <div className="form-group">
          <label>名称</label>
          <input type="text" className="form-control" placeholder="名称" value={radio.name} onChange={this.handleChangeName} />
          <small className="form-text text-muted">自由な名前をつけてください。</small>
        </div>
        <div className="form-group">
          <label>URL</label>
          <input type="text" className="form-control" placeholder="URL" value={radio.url} onChange={this.handleChangeUrl} />
          <small className="form-text text-muted">URLを入力してください。</small>
        </div>
        <div className="form-group">
          <label>メモ</label>
          <textarea className="form-control" rows={5} placeholder="メモ" value={radio.memo} onChange={this.handleChangeMemo} />
          <small className="form-text text-muted">メモを入力してください。</small>
        </div>

        <button className="btn btn-primary" onClick={this.handleClickSubmit} disabled={!radio.IsValid()}>
          <span className={classNames('fa', 'fa-paper-plane')} /> 送信
        </button>

        <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={this.handleClickErase}>
          <span className={classNames('fa', 'fa-eraser')} /> 消去
        </button>
      </div>
    );
  }
}
