import React, { Component } from "react";
import { connect } from "react-redux";

import "./Card.css"
import Modal from "../Modal/Modal";
import { updateSelectedSuite } from "../../ducks/reducer";

class Card extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false
        }

        this.togleModal = this.togleModal.bind(this);
    }

    // togleModal() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

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
        let { suites } = this.props

        // let random = suites ? Math.floor(Math.random() * suites.length) : 0;
        // let image = suites[0] ? suites[0].img : "";
        // let suite = suites[0] ? suites[0].title : "";
        let suite2 = suites[0] ? suites[0] : "";

        return (
            <div className="card">
                <div className="card_img">
                    <img src={suite2.img} alt={suite2.title} />
                </div>
                <div className="suite">
                    {suite2.title}
                </div>
                <div>
                    <button onClick={() => this.togleModal("open", suite2)}>
                        View Description
                    </button>
                    <Modal
                        show={this.state.isOpen}
                        onClose={() => this.togleModal("close", {})}
                    >
                        <img src={suite2.img} alt={suite2.title} />
                        <h3>{suite2.title}</h3>
                        <p>{suite2.description}</p>
                        <p>${suite2.weekday_price}</p>
                        <p>${suite2.weekend_price}</p>
                        <p>{suite2.description}</p>
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites
    }
}

export default connect(mapStateToProps, { updateSelectedSuite })(Card);