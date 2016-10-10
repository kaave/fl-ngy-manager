import * as React from "react";

export interface Props {
  googleOauthPath: string;
}

export default function ({ googleOauthPath }: Props): JSX.Element {
  return (
    <li className="dropdown">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
         aria-expanded="false">
        ユーザ <span className="caret" />
      </a>
      <ul className="dropdown-menu">
        <li><a href="#">一覧</a></li>
        <li><a href={googleOauthPath}>追加</a></li>
        <li><a href="#">出退勤一覧</a></li>
      </ul>
    </li>
  );
}