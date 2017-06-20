import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { configureUrlQuery, urlQueryMiddleware } from 'react-url-query';

import rootReducer from './state/rootReducer';
import urlQueryReducer from './state/urlQueryReducer';
import App from './App';
import history from './history';

// link the history used in our app to url-query so it can update the URL with it.
// do not auto generate change handlers since we won't be using them, we'll use
// those we create in mapDispatchToProps
configureUrlQuery({ history, addChangeHandlers: false });

/**
 * Initialize Redux
 * apply middleware to the store creator then use it to create the store below.
 *
 * Specifying a reducer is optional, the default reducer works for most cases.
 *
 * Note that urlQueryMiddleware shortcircuits the redux middleware chain and does not
 * result in the store notifying changes happened. This is done to prevent multiple renders
 * every time a URL changes since there is typically something else watching URL changes.
 * If you don't want this behavior, pass the option `shortcircuit: false` to urlQueryMiddleware.
 */
const createStoreWithMiddleware = applyMiddleware(urlQueryMiddleware({ reducer: urlQueryReducer }))(createStore);

// create the store
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
