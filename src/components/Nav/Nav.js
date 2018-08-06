import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import logo from "../../img/logo/logo.png";
import { resetCart } from "../../ducks/reducer";

import "./Nav.css";

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
            loggedIn: false
        }

        // this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    // componentDidMount() {
    //     axios.get("/api/userData").then(res => {
    //         console.log(res);      
    //     })
    // }

    login() {
        let { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`
        window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
    }

    logout() {
        // axios.get('/api/logout').then(() => {
            // this.setState({ user: null });
        // });
        
        this.props.resetCart();
        console.log("logged out!");
    }

    render() {
        console.log(this.props);
        return (
            <div className="navbar">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                    <h2>801-000-0000</h2>
                </div>
                <div className="menu">
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/flat-black/512/menu.png"
                        alt="hamburger menu"
                        onClick={() => this.setState({ showMenu: !this.state.showMenu })}
                    />
                    {
                        this.state.showMenu
                            ? (
                                <div>
                                    <ul>
                                        <Link to="/suites"><li>Suites</li></Link>
                                        <li>Register</li>
                                        <li onClick={this.login}>Sign In</li>
                                        <li onClick={this.logout}>Sign Out</li>
                                    </ul>
                                </div>
                            )
                            : (
                                null
                            )
                    }
                </div>
            </div>
        );
    }
}

export default connect(null, { resetCart })(Nav);