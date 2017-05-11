import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureUrlQuery } from 'react-url-query';

import rootReducer from './state/rootReducer';
import App from './App';
import MainPage from './MainPage';

// create the Redux store
const store = createStore(rootReducer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// link the history used in our app to url-query so it can update the URL with it.
configureUrlQuery({ history });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path=":word" component={MainPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
