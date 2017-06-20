import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';

import MainPage from './MainPage';

class App extends Component {
  render() {
    return (
      <div>
        <h3>react-url-query example: react-router-v4-and-redux</h3>

        <Route exact path="/:word" component={MainPage} />
      </div>
    );
  }
}

export default App;
