import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader,
    Divider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import { updateSelectedSuite } from "../../ducks/reducer";
import SuiteModal from "../SuiteModal/SuiteModal";

import "./HomeContent.css";

const styles = {
    root: {
        borderRadius: 0
    },
    title: {
        fontFamily: 'Niconne, cursive',
        fontSize: '2.0rem'
    },
    subheader: {
        color: "rgba(18, 88, 47, 1.0)"
    },
    paragraph: {
        color: "rgba(51, 51, 51, 1.0)"
    },
    buttonText: {
        color: "rgba(255, 255, 255, 0.6)"
    }
};

class HomeContent extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(suite) {
        this.props.updateSelectedSuite(suite);
        this.setState({ open: !this.state.open });
    }

    render() {
        let { suites, classes } = this.props
        let suite = suites[6] ? suites[6] : "";

        return (
            <div>

                <div>
                    <Card classes={{ root: classes.root }}>
                        <CardHeader
                            title={suite.title}
                            subheader="Featured Suite"
                            color="primary"
                            classes={{ title: classes.title, subheader: classes.subheader }}
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image={suite.img}
                            title={suite.title}
                            onClick={() => this.toggleModal(suite)}
                        />
                        <CardActions>
                            <div id="btn">
                                <Button
                                    classes={{ text: classes.buttonText }}
                                    onClick={() => this.toggleModal(suite)}
                                >
                                    View Details
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </div>
                <Divider style={{ height: ".25em" }} />
                <div>
                    <Card classes={{ root: classes.root }}>
                        <CardContent>
                            <Typography gutterBottom variant="title" component="h2" classes={{ title: classes.title }}>
                                Specials
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <Divider style={{ height: ".25em" }} />
                <div>
                    <Card classes={{ root: classes.root }}>
                        <CardHeader
                            title="The Castle on the Creek"
                            subheader="A Royal Experience"
                            classes={{ title: classes.title, subheader: classes.subheader }}
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%', backgroundPosition: "center top" }}
                            image="/img.1/castlecreekExterior/buildingFrontWithSign.jpeg"
                            title="Castle Creek Inn"
                        />
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography component="h3" color="secondary">
                                    About Us
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography component="p" gutterBottom classes={{paragraph: classes.paragraph}}>
                                    Imagine you travel through time, back to a period of pristine elegance and sophistication, away from the tangled web of distraction and obligation that is modern life. You breathe a sigh of relief; the moment you’ve longed for, even dreamed of, has arrived. At last, you’re able to relax and unwind. Just as you think, “It doesn’t get any better than this!” you look around and realize: though you’ve left the stress of modern life behind, all your favorite modern conveniences somehow survived the space-time continuum unscathed. You blink in disbelief, but it’s true–everything made it safely! Cable, a flat-screen smart TV, high-speed Wi-Fi, online movies, a couples’ tub with jets and a romantic lighting system, they’re all here! In utter delight, you fall back on a remarkably comfortable bed, and sigh.
                            
                                
                                    This is the experience of a Castle Creek Inn getaway.
                            
                                
                                    Originally built to be a residence, the Castle is both charming and cozy. You’ll feel right at home as you experience the royal life. Each guest room is unique in design and decor and provides a singular experience to its occupants.
                            
                                
                                    Enjoy a cozy evening by your private fireplace. Sneak down to the complementary snack bar in the middle of the night to satisfy that sweet tooth, or to pop popcorn for your movie marathon. Wake up to a delicious, full breakfast–the perfect ending to a perfect stay.
                            
                                
                                    The Castle is just minutes away from fine dining, theaters, hiking trails, ski resorts and other attractions. It’s like Shakespeare said: “Staying at Castle Creek Inn was the best decision I ever made! I penned the famous ‘Romeo & Juliet’ while staying in their luxurious suite of the same name. That led me to ponder, ‘What’s in a name?’ and more inspiring writings were born. I encourage you all to visit the Castle. For all who do are happy.”
                            
                                
                                    We strive to provide our guests with terrific service and a memorable experience. A beautiful guest room is only the beginning. Included in every stay are the following complimentary amenities and services:
                            
                                
                                    <span style={{display: "block"}}>*2-Person Jetted Tub     *All-Night Snack Bar     *Delicious Breakfast</span>
                            
                                
                                    <span style={{display: "block"}}>*Movie Library     *Wi-Fi     *Mini Fridge</span>
                            
                                
                                    <span style={{display: "block"}}>*Fireplace (Turned on from October 1st – May 1st)</span>
                            
                                
                                    In addition to these, many of our guest rooms also feature:
                            
                                    <span style={{display: "block"}}>*Balcony or Patio     *Pool Table     *Walk-In Shower     *Dining Area</span>
                            
                                    Whether you’re looking for a romantic night out, a relaxing escape, or you’re simply in town on business, the Castle is your place. Click the “Rooms” tab for photos and information on each guest room. Thank you for visiting us. We hope to see you soon!
                            
                                    The Castle is just 15 minutes from the SLC International Airport, and downtown Salt Lake City.
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Card>
                </div>

                <SuiteModal
                    handleClose={this.toggleModal}
                    open={this.state.open}
                    selectedSuite={this.props.selectedSuite}
                />

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

export default withStyles(styles)(connect(mapStateToProps, { updateSelectedSuite })(HomeContent));
