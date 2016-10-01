import React from 'react';
import ReactDOM from 'react-dom';
import { configureUrlQuery } from 'react-url-query';

import App from './App';
import history from './history';

// link the history used in our app to url-query so it can update the URL with it.
configureUrlQuery({ history });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
