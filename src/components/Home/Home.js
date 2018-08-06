import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { updateSuites } from "../../ducks/reducer";
import Card from "../Card/Card";


import "./Home.css";

// Imports a local file with the images
const context = require.context("../../img/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

class Home extends Component {

    componentDidMount() {
        let { updateSuites } = this.props;
        axios.get("/api/suites").then(res => {
            let addImgToSuites = res.data.map(suite => {
                let updatedSuite = {};

                context.keys().forEach(key => {
                    if (suite.title.includes(key.match(regex)[0])) {
                        updatedSuite = Object.assign({}, suite, { img: context(key) });
                    }
                });

                return updatedSuite;
            })

            updateSuites(addImgToSuites);
        });
    }

    render() {
        return (
            <div className="home_container">
                <div className="card_container">
                    <Card />
                </div>
                <div className="specials_container">
                    Specials
                </div>
                <div className="card_container">
                    Castle Creek Img
                </div>
                <div>
                    Castle Creek Info
                </div>
            </div>
        );
    }
}

export default connect(null, { updateSuites })(Home);