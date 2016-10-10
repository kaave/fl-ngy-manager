import * as React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import radioReducers from "./public/reducers/radio";
import radioSagas from "./public/sagas/radio";
import Main from "./public/containers/main";
import createLogger = require('redux-logger');

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

  const mountPointNode = document.getElementById('mount-point');
  if (mountPointNode) {
    render(
      (
        <Provider store={store}>
          <Main />
        </Provider>
      ), mountPointNode
    );
  }
});
