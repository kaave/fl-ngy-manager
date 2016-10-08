import * as React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga'
import createLogger = require('redux-logger');

import radioReducers from './public/reducers/radio';
import radioSagas from './public/sagas/radio';
import Main from './public/containers/main';

window.addEventListener('DOMContentLoaded', () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers(radioReducers),
    applyMiddleware(
      sagaMiddleware,
      createLogger()
    )
  );

  sagaMiddleware.run(radioSagas);

  render(
    (
      <Provider store={store}>
        <Main />
      </Provider>
    ),
    document.getElementById('mount-point')
  );
});
