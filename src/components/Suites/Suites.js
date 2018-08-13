import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CarouselSlider from "react-carousel-slider";
import {
    Button,
    Typography,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader
} from "@material-ui/core";

import Modal from "../Modal/Modal";
import { updateSelectedSuite, updateSuites } from "../../ducks/reducer";
import SuiteModal from "../Modal/SuiteModal";
import "../Modal/SuiteModal.css";
// Imports a local file with the images
const context = require.context("../../img/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

class Suites extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

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

    handleOpen(suite) {
        this.props.updateSelectedSuite(suite);
        this.setState({ open: true });
    };

    handleClose(suite) {
        this.props.updateSelectedSuite(suite);
        this.setState({ open: false });
    };

    // constructor() {
    //     super();

    //     this.state = {
    //         // selectedSuite: {},
    //         isOpen: false
    //     }

    //     this.togleModal = this.togleModal.bind(this);
    // }

    // togleModal(openOrClose, suite) {
    //     let { updateSelectedSuite } = this.props;
    //     if (openOrClose === "open") {
    //         updateSelectedSuite(suite)
    //         this.setState({
    //             // selectedSuite: suite,
    //             isOpen: !this.state.isOpen
    //         });
    //     } else if (openOrClose === "close") {
    //         updateSelectedSuite(suite);
    //         this.setState({
    //             // selectedSuite: suite,
    //             isOpen: !this.state.isOpen
    //         });
    //     }

    // }

    render() {
        let { suites, selectedSuite } = this.props;

        let mappedSuites = suites.map((suite, i) =>
            // <div key={i}>
            //     <img src={suite.img} alt="" />
            //     <p>{suite.title}</p>
            //     <button onClick={() => this.togleModal("open", suite)}>
            //         View Description
            //     </button>
            // </div>
            <div key={i}>
                <Card style={{ maxWidth: 400, borderRadius: 0 }}>

                    <CardHeader
                        title={suite.title}
                    />
                    <img src={suite.img} alt="" />
                    <CardActions style={{ justifyContent: "center" }}>
                            <div style={{ backgroundColor: 'rgb(117, 117, 117)', width: "100%", display: "flex", justifyContent: "center", margin: "-70px 20px 0 20px", opacity: "0.6", borderRadius: "5px"}}>
                                {/* <IconButton color="primary" style={{ opacity: "1" }} onClick={this.handleOpen}>
                                        <Info />
                                    </IconButton> */}
                                <Button
                                    style={{color: "white"}}
                                    onClick={() => this.handleOpen(suite)}
                                >
                                    View Details
                                </Button>
                            </div>
                        </CardActions>
                </Card>
            </div>
        );

        let manner = {
            circular: false
        };
        let accEle = {
            flag: true
        }
        let dotsSetting = {
            placeOn: "beneath"
        }

        let buttonSetting = {
            placeOn: "bottom-beneath",
            // hoverEvent: true
        }

        let sliderBoxStyle = {
            height: "100%",
            width: "100%",
            background: "transparent"
        };

        let itemStyle = {
            height: "100%",
            background: "transparent"
        }

        return (
            this.props.suites ?
            <div>

                <CarouselSlider
                    // slideItems={mappedSuites}
                    slideCpnts={mappedSuites}
                    manner={manner}
                    // accEle={accEle}
                    dotsSetting={dotsSetting}
                    buttonSetting={buttonSetting}
                    sliderBoxStyle={sliderBoxStyle}
                    itemStyle={itemStyle}
                />
                <SuiteModal
                    handleClose={this.handleClose}
                    open={this.state.open}
                    selectedSuite={this.props.selectedSuite}
                    style={{zIndex: "3000 !important"}}
                />
                {/* <Modal
                    show={this.state.isOpen}
                    onClose={() => this.togleModal("close", {})}
                >
                    <img src={selectedSuite.img} alt={selectedSuite.title} />
                    <h3>{selectedSuite.title}</h3>
                    <p>{selectedSuite.description}</p>
                    <p>${selectedSuite.weekday_price}</p>
                    <p>${selectedSuite.weekend_price}</p>
                    <p>{selectedSuite.description}</p>
                </Modal> */}
            </div>
            :
            ""
        );
    }
}

function mapStateToProps(state) {
    return {
        suites: state.suites,
        selectedSuite: state.selectedSuite
    }
}

export default connect(mapStateToProps, { updateSelectedSuite, updateSuites })(Suites);