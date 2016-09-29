import React, { Component } from 'react';
import Match from 'react-router/Match';
import MainPage from './MainPage';

class App extends Component {
  render() {
    return (
      <div>
        <h3>react-url-query example: react-router-v4-and-redux</h3>

        <Match exactly pattern="/" component={MainPage} />
        <Match pattern="/:word" component={MainPage} />
      </div>
    );
  }
}

export default App;
