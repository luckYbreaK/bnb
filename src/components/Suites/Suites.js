import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CarouselSlider from "react-carousel-slider";

import Modal from "../Modal/Modal";

class Suites extends Component {
    constructor() {
        super();

        this.state = {
            selectedSuite: {},
            isOpen: false
        }

        this.togleModal = this.togleModal.bind(this);
    }

    togleModal(openOrClose, suite) {
        if(openOrClose === "open") {
            this.setState({
                selectedSuite: suite,
                isOpen: !this.state.isOpen
            });
        } else if(openOrClose === "close") {
            this.setState({
                selectedSuite: suite,
                isOpen: !this.state.isOpen
            });
        }
        
    }

    render() {
        console.log(this.state.selectedSuite);
        
        let { suites } = this.props;

        let mappedSuites = suites.map((suite, i) =>
            // return (
            //     {
            //         des: suite.title,
            //         imgSrc: suite.img
            //     }
            // );

            <div key={i}>
                <img src={suite.img} alt="" />
                <p>{suite.title}</p>
                <button onClick={() => this.togleModal("open", suite)}>
                    View Description
                </button>
            </div>

        );

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
                    // slideItems={mappedSuites}
                    slideCpnts={mappedSuites}
                    manner={manner}
                    sliderBoxStyle={sliderBoxStyle}
                    buttonSetting={buttonSetting}
                />
                 <Modal
                    show={this.state.isOpen}
                    onClose={() => this.togleModal("close", {})}
                >
                    <img src={this.state.selectedSuite.img} alt={this.state.selectedSuite.title} />
                    <h3>{this.state.selectedSuite.title}</h3>
                    <p>{this.state.selectedSuite.description}</p>
                    <p>${this.state.selectedSuite.weekday_price}</p>
                    <p>${this.state.selectedSuite.weekend_price}</p>
                    <p>{this.state.selectedSuite.description}</p>
                </Modal>
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