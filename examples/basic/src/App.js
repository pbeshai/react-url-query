import React, { Component } from 'react';
import MainPage from './MainPage';
import history from './history';

class App extends Component {
  componentDidMount() {
    // force an update if the URL changes
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <div>
        <h3>react-url-query example: basic</h3>
        <MainPage />
      </div>
    );
  }
}

export default App;
