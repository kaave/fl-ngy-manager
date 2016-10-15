import * as React from 'react';
import * as classNames from 'classnames';
import { range } from 'lodash';

import DeviceModel from '../../models/device';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  dispatch: (type: DispatchEvents, params?: any) => void;
  device: DeviceModel;
}

export default class extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeKey = this.handleChangeKey.bind(this);
    this.handleChangeTypeCode = this.handleChangeTypeCode.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickErase = this.handleClickErase.bind(this);
  }

  handleChangeName(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateDeviceFormName', target.value);
  }

  handleChangeKey(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateDeviceFormKey', target.value);
  }

  handleChangeTypeCode(e: React.FormEvent<HTMLSelectElement>): void {
    const target = e.target as HTMLSelectElement;
    this.props.dispatch('UpdateDeviceFormTypeCode', parseInt(target.value, 10));
  }

  handleChangeSource(e: React.FormEvent<HTMLInputElement>): void {
    const target = e.target as HTMLInputElement;
    this.props.dispatch('UpdateDeviceFormSource', target.value);
  }

  handleClickSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.dispatch('ClickSubmitDeviceForm');
  }

  handleClickErase(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.dispatch('ClickEraseDeviceForm');
  }

  render(): JSX.Element {
    const { device } = this.props;

    return (
      <div className="col-md-12">
        <h3>FeliCaデバイス登録</h3>
        <div className="form-group">
          <label>名前</label>
          <input type="text" className="form-control" placeholder="名前" value={device.name} onChange={this.handleChangeName} />
          <small className="form-text text-muted">自由な名前をつけてください。</small>
        </div>
        <div className="form-group">
          <label>タイプ</label>
          <select className="form-control" value={device.typeCode} onChange={this.handleChangeTypeCode}>
            {range(1, 7 + 1).map(num => <option key={num} value={num}>{num}</option>)}
          </select>
          <small className="form-text text-muted">タイプを選択してください。</small>
        </div>
        <div className="form-group">
          <label>キー</label>
          <input type="text" className="form-control" placeholder="キー" value={device.key} onChange={this.handleChangeKey} />
          <small className="form-text text-muted">キーを入力してください。</small>
        </div>
        <div className="form-group">
          <label>ソース</label>
          <input type="text" className="form-control" placeholder="ソース" value={device.source || ''} onChange={this.handleChangeSource} />
          <small className="form-text text-muted">ソースを入力してください(空白可)。</small>
        </div>

        <button className="btn btn-primary" onClick={this.handleClickSubmit} disabled={!device.IsValid()}>
          <span className={classNames('fa', 'fa-paint-brush')} /> 更新
        </button>

        <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={this.handleClickErase}>
          <span className={classNames('fa', 'fa-ban')} /> キャンセル
        </button>
      </div>
    );
  }
}
