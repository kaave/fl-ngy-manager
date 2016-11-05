import * as React from 'react';
import { Link } from 'react-router';

export interface Props {
  googleOauthPath: string;
}

export default function ({ googleOauthPath }: Props): JSX.Element {
  return (
    <li className="dropdown">
      <a
        href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
        aria-expanded="false"
      >
        ユーザ <span className="caret" />
      </a>
      <ul className="dropdown-menu">
        <li><Link to="/user">一覧</Link></li>
        <li><a href={googleOauthPath}>追加</a></li>
        <li><Link to="/event">出退勤一覧</Link></li>
      </ul>
    </li>
  );
}
