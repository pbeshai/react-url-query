import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { setUrlQueryOptions, urlQueryMiddleware } from 'react-url-query';

import rootReducer from './state/rootReducer';
import urlQueryReducer from './state/urlQueryReducer';
import App from './App';
import history from './history';

// set the default history in url-query - this is a convenience that makes it
// so we don't have to pass history to it all the time.
setUrlQueryOptions({ history });

// Initialize Redux
// apply middleware to the store creator
const createStoreWithMiddleware = applyMiddleware(urlQueryMiddleware(urlQueryReducer))(createStore);

// create the store
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
