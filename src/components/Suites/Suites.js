import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
            <div>
                <Link to="/reservations"><button>Reserve Suite</button></Link>
                <CarouselSlider
                    slideItems={mappedSuites}
                    manner={manner}
                    sliderBoxStyle={sliderBoxStyle}
                    buttonSetting={buttonSetting}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, null)(Suites);