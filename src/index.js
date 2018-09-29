import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import store from "./ducks/store";
import App from './App';

import "./reset.css";
import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgba(69, 39, 160, 1.0)",
        },
        secondary: {
            main: "rgba(18, 88, 47, 1.0)",
        }
    }
});

ReactDOM.render(<Provider store={store}><HashRouter><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></HashRouter></Provider>, document.getElementById('root'));