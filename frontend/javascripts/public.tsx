import * as React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './public/containers/main';
import UserList from './public/components/user/list';
import UserForm from './public/components/user/form';
import RadioList from './public/components/radio/list';
import RadioForm from './public/components/radio/form';
import DeviceList from './public/components/device/list';
import DeviceForm from './public/components/device/form';
import EventList from './public/components/event/list';
import reducers from './public/reducers/';
import sagas from './public/sagas/';
import createLogger = require('redux-logger');

window.addEventListener('DOMContentLoaded', () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
      sagaMiddleware,
      createLogger()
    )
  );

  sagaMiddleware.run(sagas);

  const mountPointNode = document.getElementById('mount-point');
  if (mountPointNode) {
    render(
      (
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={Main}>
              <IndexRoute component={RadioList} />
              <Route path="user" component={UserList}/>
              <Route path="user/add" component={UserForm}/>
              <Route path="radio" component={RadioList}/>
              <Route path="radio/add" component={RadioForm}/>
              <Route path="device" component={DeviceList}/>
              <Route path="device/add" component={DeviceForm}/>
              <Route path="event" component={EventList}/>
              <Route path="*" component={RadioList}/>
            </Route>
          </Router>
        </Provider>
      ), mountPointNode
    );
  }
});
