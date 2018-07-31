import React, { Component } from 'react';
import routes from "./routes";
import Nav from "./components/Nav/Nav";

import "./reset.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main_container">
        <Nav />
        {routes}
      </div>
    );
  }
}

export default App;
