import * as React from 'react';

export interface Props {
}

export default class extends React.Component<Props, {}> {
  render(): JSX.Element {
    return (
      <div className="col-md-12">
        <div className="form-group">
          <label>名称</label>
          <input type="text" className="form-control" placeholder="名称" />
          <small className="form-text text-muted">自由な名前をつけてください。</small>
        </div>
        <div className="form-group">
          <label>URL</label>
          <input type="text" className="form-control" placeholder="URL" />
          <small className="form-text text-muted">URLを入力してください。</small>
        </div>
        <div className="form-group">
          <label>メモ</label>
          <textarea className="form-control" rows={5} placeholder="メモ" />
          <small className="form-text text-muted">メモを入力してください。</small>
        </div>
      </div>
    );
  }
}