import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureUrlQuery, urlQueryMiddleware } from 'react-url-query';

import rootReducer from './state/rootReducer';
import App from './App';
import MainPage from './MainPage';

// Initialize Redux
// apply middleware to the store creator
const createStoreWithMiddleware = applyMiddleware(urlQueryMiddleware())(createStore);

// create the store
const store = createStoreWithMiddleware(rootReducer);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// set the default history in url-query - this is a convenience that makes it
// so we don't have to pass history to it all the time.
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
