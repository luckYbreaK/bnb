import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../Card/Card";
import CarouselSlider from "react-carousel-slider";

class Suites extends Component {
    render() {
        let { suites } = this.props;

        let mappedSuites = suites.map((suite, i) => {
            return (
                {
                    des: suite.title,
                    imgSrc: suite.img
                }
            );
        });

        let manner = {
            circular: false
        };

        let sliderBoxStyle = {
            height: "400px",
            width: "320px",
            background: "transparent"
        };

        let buttonSetting = {
            placeOn: "middle-outside"
            // hoverEvent: true
        }

        return (
            <CarouselSlider
                slideItems={mappedSuites}
                manner={manner}
                sliderBoxStyle={sliderBoxStyle}
                buttonSetting={buttonSetting}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, null)(Suites);