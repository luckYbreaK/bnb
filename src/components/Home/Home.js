import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateSuites, updateImages } from "../../ducks/reducer";
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
        let { suites } = this.props

        console.log(suites);

        let random = suites ? Math.floor(Math.random() * suites.length) : 0;
        let image = suites[random] ? suites[random].img : "";

        return (
            <div className="home_container">
                <div className="card_container">
                    <Card />
                    <img src={image} />
                    {/* displays a random suite */}
                    {suites[random] ? suites[random].title : ""}
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

function mapStateToProps(state) {
    return {
        suites: state.suites,
        images: state.images
    }
}

export default connect(mapStateToProps, { updateSuites, updateImages })(Home);