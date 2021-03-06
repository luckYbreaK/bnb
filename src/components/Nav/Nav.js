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
import { Menu, Hotel, ShoppingCart, AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import "./Nav.css";
import { updateLoggedIn } from "../../ducks/reducer";

const styles = {
    paper: {
        background: "#EDE7F6"
    }
};

class Nav extends Component {
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
        let { updateLoggedIn, history } = this.props;
        axios.get('/api/logout').then(res => {
            updateLoggedIn(false);
            history.push("/");
        });
    }

    render() {
        let { classes } = this.props
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
                            <Typography align="center" style={{ color: "white" }}>
                                (801) 567-9437
                    </Typography>
                        </div>

                        <IconButton onClick={this.toggleDrawer} style={{ color: "white" }}>
                            <Menu style={{ fontSize: '40px' }} />
                            <Drawer
                                anchor="right"
                                open={this.state.drawerOpen}
                                onClose={this.toggleDrawer}
                                transitionDuration={{ enter: 400, exit: 400 }}
                                classes={{paper: classes.paper}}
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
                                        {
                                            this.props.loggedIn ?
                                                <Link to="/myreservations" style={{ textDecoration: "none" }}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <AccountCircle />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={this.props.loggedIn ? "My Reservations" : ""}
                                                        />
                                                    </ListItem>
                                                </Link>
                                                :
                                                null
                                        }
                                        <ListItem button>
                                            <ListItemText
                                                primary={this.props.loggedIn ? "Log Out" : "Log In / Sign Up"}
                                                inset
                                                onClick={this.props.loggedIn ? this.logout : this.login}
                                            />
                                        </ListItem>
                                        <Link to="/contactus" style={{ textDecoration: "none" }}>
                                            <ListItem button>
                                                <ListItemText
                                                    primary="Contact Us"
                                                    inset
                                                />
                                            </ListItem>
                                        </Link>
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

export default withStyles(styles)(withRouter(connect(mapStateToProps, { updateLoggedIn })(Nav)));
