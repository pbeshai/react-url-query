import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { configureUrlQuery } from 'react-url-query';

import rootReducer from './state/rootReducer';
import App from './App';
import history from './history';

// link the history used in our app to url-query so it can update the URL with it.
configureUrlQuery({ history });

// create the Redux store
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
