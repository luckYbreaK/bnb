import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store";
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#4527A0",
        },
        secondary: {
            main: "#12582f",
        }
    }
});

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><HashRouter><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></HashRouter></Provider>, document.getElementById('root'));
// registerServiceWorker();
