import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";

import { updateSuites } from "../../ducks/reducer";
import HomeContent from "./HomeContent/HomeContent";
// Imports a local file with the images
const context = require.context("../../img/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

class Home2 extends Component {

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
            this.props.suites ? <HomeContent /> : "" 
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, { updateSuites })(Home2);
