import React, { Component } from 'react';
import routes from "./routes";
import Nav2 from "./components/Nav/Nav2";

import "./reset.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main_container">
        <Nav2 />
        {routes}
      </div>
    );
  }
}

export default App;
