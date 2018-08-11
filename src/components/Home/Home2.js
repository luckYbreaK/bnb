import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import {
    Button,
    Typography,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    CardActions
} from "@material-ui/core";
import { Info } from '@material-ui/icons';

import { updateSuites } from "../../ducks/reducer";
import SuiteModal from "../Modal/SuiteModal";
// Imports a local file with the images
const context = require.context("../../img/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

class Home2 extends Component {
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

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>

                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                            {/* <Typography component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography> */}
                        </CardContent>
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image="https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                            title="Contemplative Reptile"
                        />
                        <CardActions style={{ justifyContent: "center" }}>
                            {/* <Button size="small" color="primary">
                            Share
                            </Button> */}
                            <div style={{ backgroundColor: 'white', width: "100%", display: "flex", justifyContent: "center", marginTop: "-70px", opacity: "0.7" }}>
                                {/* <IconButton color="primary" style={{ opacity: "1" }} onClick={this.handleOpen}>
                                        <Info />
                                    </IconButton> */}
                                <Button style={{ opacity: "1" }} onClick={this.handleOpen}>View Details</Button>
                            </div>
                        </CardActions>
                    </Card>
                </div>

                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                Specials
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                            {/* <Typography component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                                </Typography> */}
                        </CardContent>
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image="https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                            title="Contemplative Reptile"
                        />
                        <CardActions style={{ justifyContent: "center" }}>
                            <div style={{ backgroundColor: 'white', width: "100%", display: "flex", justifyContent: "center", marginTop: "-70px", opacity: "0.7" }}>
                                <IconButton color="primary" style={{ opacity: "1" }} onClick={this.handleOpen} >
                                    <Info />
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>
                </div>

                <SuiteModal
                    handleClose={this.handleClose}
                    open={this.state.open}
                />

            </div>
        );
    }
}

export default connect(null, { updateSuites })(Home2);
