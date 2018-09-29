import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";

import { updateSuites } from "../../ducks/reducer";
import HomeContent from "../HomeContent/HomeContent";
// Imports a local file with the images
const context = require.context("../../../public/img.1/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

class Home extends Component {

    componentDidMount() {
        let { suites, updateSuites } = this.props;
        // If state in Redux store doesn't contain a list of suites
        if (suites.length === 0) {
            // Fetch entire list of suites
            axios.get("/api/suites").then(res => {
                // Add image to each suite object
                let addImgToSuites = res.data.map(suite => {
                    let updatedSuite = {};

                    context.keys().forEach(key => {
                        if (suite.title.includes(key.match(regex)[0])) {
                            updatedSuite = Object.assign({}, suite, { img: context(key) });
                        }
                    });

                    return updatedSuite;
                })

                // Put list of suites on state in Redux store
                updateSuites(addImgToSuites);
            });
        }
    }

    render() {
        return (
            this.props.suites ? <HomeContent /> : null
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, { updateSuites })(Home);
