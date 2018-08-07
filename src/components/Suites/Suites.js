import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CarouselSlider from "react-carousel-slider";

import Modal from "../Modal/Modal";
import { updateSelectedSuite } from "../../ducks/reducer";

class Suites extends Component {
    constructor() {
        super();

        this.state = {
            // selectedSuite: {},
            isOpen: false
        }

        this.togleModal = this.togleModal.bind(this);
    }

    togleModal(openOrClose, suite) {
        let { updateSelectedSuite } = this.props;
        if (openOrClose === "open") {
            updateSelectedSuite(suite)
            this.setState({
                // selectedSuite: suite,
                isOpen: !this.state.isOpen
            });
        } else if (openOrClose === "close") {
            updateSelectedSuite(suite);
            this.setState({
                // selectedSuite: suite,
                isOpen: !this.state.isOpen
            });
        }

    }

    render() {
        console.log(this.props.selectedSuite);

        let { suites, selectedSuite } = this.props;

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
                    <img src={selectedSuite.img} alt={selectedSuite.title} />
                    <h3>{selectedSuite.title}</h3>
                    <p>{selectedSuite.description}</p>
                    <p>${selectedSuite.weekday_price}</p>
                    <p>${selectedSuite.weekend_price}</p>
                    <p>{selectedSuite.description}</p>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites,
        selectedSuite: state.selectedSuite
    }
}

export default connect(mapStateToProps, { updateSelectedSuite })(Suites);