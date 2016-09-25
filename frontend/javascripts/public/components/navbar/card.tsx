import * as React from 'react';

export default function(): JSX.Element {
  return (
    <li className="dropdown">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        カード <span className="caret" />
      </a>
      <ul className="dropdown-menu">
        <li><a href="#">一覧</a></li>
        <li><a href="#">追加</a></li>
      </ul>
    </li>
  );
}