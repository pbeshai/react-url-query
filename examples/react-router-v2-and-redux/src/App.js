import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h3>react-url-query example: react-router-v2-and-redux</h3>
        {this.props.children}
      </div>
    );
  }
}

export default App;
