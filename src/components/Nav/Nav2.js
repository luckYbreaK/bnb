import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import {
    Button,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from "@material-ui/core";
import { Menu, Hotel, ShoppingCart } from '@material-ui/icons';

import "./Nav2.css";
import { updateLoggedIn } from "../../ducks/reducer";

class Nav2 extends Component {
    constructor() {
        super();

        this.state = {
            drawerOpen: false
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidUpdate() {
        axios.get("/api/userData").then(res => {
            let { data } = res;
            if (data.email) {
                this.props.updateLoggedIn(true);
            }
        });
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    login() {
        let { history } = this.props;
        axios.post("/api/login", { pathname: history.location.pathname }).then(res => {

            let { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;
            let url = `${encodeURIComponent(window.location.origin)}/auth/callback`
            window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;

        });
    }

    logout() {
        axios.get('/api/logout').then(res => {
            this.props.updateLoggedIn(false);
        });
    }

    render() {
        console.log(this.props.loggedIn);
        return (
            <div>

                <AppBar position="static">
                    <Toolbar disableGutters className="flex_row toolbar">

                        <div className="flex_column">
                            <Link to="/">
                                <Button>
                                    <img src="img.1/logo/logo.png" alt="Castle Creek logo" />
                                </Button>
                            </Link>
                            <Typography align="center">
                                801-000-0000
                    </Typography>
                        </div>

                        <IconButton onClick={this.toggleDrawer} style={{ fontSize: '50px' }}>
                            <Menu />
                            <Drawer
                                anchor="right"
                                open={this.state.drawerOpen}
                                onClose={this.toggleDrawer}
                                transitionDuration={{ enter: 400, exit: 400 }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer}
                                    onKeyDown={this.toggleDrawer}
                                >
                                    <List >
                                        <Link to="/suites" style={{ textDecoration: "none" }}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Hotel />
                                                </ListItemIcon>
                                                <ListItemText primary="Suites" />
                                            </ListItem>
                                        </Link>
                                        <Link to="/cart" style={{ textDecoration: "none" }}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <ShoppingCart />
                                                </ListItemIcon>
                                                <ListItemText primary="Shopping Cart" />
                                            </ListItem>
                                        </Link>
                                        <ListItem button>
                                            <ListItemText
                                                primary={this.props.loggedIn ? "Log Out" : "Log In / Sign Up"}
                                                inset
                                                onClick={this.props.loggedIn ? this.logout : this.login}
                                            />
                                        </ListItem>
                                    </List>
                                </div>
                            </Drawer>
                        </IconButton>

                    </Toolbar>
                </AppBar>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}

export default withRouter(connect(mapStateToProps, { updateLoggedIn })(Nav2));
