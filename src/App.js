import React, { Component } from 'react';

import routes from "./routes";
import Nav from "./components/Nav/Nav";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {routes}
      </div>
    );
  }
}

export default App;
