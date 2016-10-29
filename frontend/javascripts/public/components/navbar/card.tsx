import * as React from 'react';
import { Link } from 'react-router';

export default function(): JSX.Element {
  return (
    <li className="dropdown">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        カード <span className="caret" />
      </a>
      <ul className="dropdown-menu">
        <li><Link to="/card">一覧</Link></li>
        <li><Link to="/card/add">追加</Link></li>
      </ul>
    </li>
  );
}