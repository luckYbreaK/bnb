import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import CarouselSlider from "react-carousel-slider";
import {
    Button,
    Card,
    CardActions,
    CardHeader
} from "@material-ui/core";

import { updateSelectedSuite, updateSuites } from "../../ducks/reducer";
import SuiteModal from "../SuiteModal/SuiteModal";
import "./Suite.css";
// Imports a local file with the images
const context = require.context("../../../public/img.1/card", true, /\.(jpg)$/);
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

    render() {
        let { suites } = this.props;

        let mappedSuites = suites.map((suite, i) =>
            <div key={i}>
                <Card style={{ maxWidth: 420, borderRadius: 0 }}>

                    <CardHeader
                        title={suite.title}
                    />
                    <img src={suite.img} alt="" />
                    <CardActions style={{ justifyContent: "center" }}>
                            <div style={{ backgroundColor: 'rgb(117, 117, 117)', width: "100%", display: "flex", justifyContent: "center", margin: "-70px 20px 0 20px", opacity: "0.6", borderRadius: "5px"}}>
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
            width: "100%",
            background: "transparent"
        }

        return (
            this.props.suites ?
            <div>

                <CarouselSlider
                    slideCpnts={mappedSuites}
                    manner={manner}
                    dotsSetting={dotsSetting}
                    buttonSetting={buttonSetting}
                    sliderBoxStyle={sliderBoxStyle}
                    itemStyle={itemStyle}
                />

                <SuiteModal
                    handleClose={this.handleClose}
                    open={this.state.open}
                    selectedSuite={this.props.selectedSuite}
                />

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