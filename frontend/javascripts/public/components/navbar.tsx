import * as React from 'react';

import NavbarHeader from './navbar/header';
import UserMenu from './navbar/user';
import CardMenu from './navbar/card';
import RadioMenu from './navbar/radio';

export default function(): JSX.Element {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <NavbarHeader />

        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <UserMenu />
            <CardMenu />
            <RadioMenu />
          </ul>
        </div>
      </div>
    </nav>
  );
}