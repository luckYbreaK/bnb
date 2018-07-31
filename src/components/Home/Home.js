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
        let { updateSuites, updateImages } = this.props;
        axios.get("/api/suites").then(res => {
            updateSuites(res.data);
        });

        updateImages(context.keys());
    }

    render() {
        let { suites, images } = this.props

        let results = suites.map(suite => {
            // console.log(suite.title);

            let newObj = {};
            for (let i = 0; i < context.keys().length; i++) {
                let arr = context.keys()[i].match(regex)
                if (suite.title.includes(arr[0]))
                    newObj = Object.assign({}, suite, { img: context(context.keys()[i]) });
            }
            return newObj;
        })
        // console.log(context.keys());

        console.log(results);

        let random = suites ? Math.floor(Math.random() * suites.length) : 0;
        let image = results[3] ? results[3].img : "";
        // let image = images[2] ? images[2] : "";
        

        return (
            <div className="home_container">
                <div className="card_container">
                    <Card />
                    <img src={image}/>
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