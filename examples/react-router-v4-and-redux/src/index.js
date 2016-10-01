import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Router from 'react-router/BrowserRouter';

import { RouterToUrlQuery } from 'react-url-query';

import rootReducer from './state/rootReducer';
import App from './App';

// create the Redux store
const store = createStore(rootReducer);

// instead of using configureUrlQuery to set the history, we use <RouterToUrlQuery>
// as a child of <Router>. We can still use configureUrlQuery to set other options.

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RouterToUrlQuery>
        <App />
      </RouterToUrlQuery>
    </Router>
  </Provider>,
  document.getElementById('root')
);
