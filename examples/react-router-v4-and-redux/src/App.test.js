import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Router from 'react-router/BrowserRouter';
import { RouterToUrlQuery } from 'react-url-query';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <RouterToUrlQuery>
        <App />
      </RouterToUrlQuery>
    </Router>, div);
});
