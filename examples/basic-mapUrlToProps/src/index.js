import React from 'react';
import ReactDOM from 'react-dom';
import { configureUrlQuery } from 'react-url-query';

import App from './App';
import history from './history';

// set the default history in url-query - this is a convenience that makes it
// so we don't have to pass history to it all the time.
configureUrlQuery({ history });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
