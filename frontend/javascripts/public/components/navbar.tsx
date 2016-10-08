import * as React from 'react';

import NavbarHeader from './navbar/header';
import UserMenu from './navbar/user';
import CardMenu from './navbar/card';
import RadioMenu from './navbar/radio';

import DispatchEvents from '../types/DispatchEvents';

export interface Props {
  dispatch: (type: DispatchEvents, params?: string | number) => void;
}

export default function({ dispatch }: Props): JSX.Element {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <NavbarHeader />

        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <UserMenu />
            <CardMenu />
            <RadioMenu dispatch={dispatch} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
