import * as React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createLogger = require('redux-logger');

import radioReducers from './public/reducers/radio';
import Main from './public/containers/main';

window.addEventListener('DOMContentLoaded', () => {
  const store = createStore(
    combineReducers(radioReducers),
    applyMiddleware(
      createLogger()
    )
  );

  render(
    (
      <Provider store={store}>
        <Main />
      </Provider>
    ),
    document.getElementById('mount-point')
  );
});
