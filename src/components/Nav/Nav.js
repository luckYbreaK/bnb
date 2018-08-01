import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../../img/logo/logo.png";

import "./Nav.css";

export default class Nav extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false
        }

        
    }

    // showMenu() {
    //     this.setState({
    //         showMenu: 
    //     });
    // }

    render() {
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
                                        <li>Sign In</li>
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