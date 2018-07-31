import React from "react";
import "./Nav.css";
import logo from "../../img/logo/logo.png";

export default function Nav() {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="" />
                <h2>801-000-0000</h2>
            </div>
            <div className="menu">
                <img src="https://cdn4.iconfinder.com/data/icons/flat-black/512/menu.png" alt="" />
            </div>
        </div>
    );
}