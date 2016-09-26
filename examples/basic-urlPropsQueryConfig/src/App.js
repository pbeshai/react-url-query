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
        <h1>react-url-query example: basic-urlPropsQueryConfig</h1>
        <MainPage />
      </div>
    );
  }
}

export default App;
