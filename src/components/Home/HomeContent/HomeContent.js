import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader
} from "@material-ui/core";

import { updateSelectedSuite } from "../../../ducks/reducer";
import SuiteModal from "../../Modal/SuiteModal";

class HomeContent extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
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
        let { suites } = this.props
        let suite = suites[5] ? suites[5] : "";

        return (
            <div>

                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title={suite.title}
                            subheader="Featured Suite"
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image={suite.img}
                            title={suite.title}
                        />
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
                        <CardHeader
                            title="The Castle on the Creek"
                            subheader="A Royal Experience"
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%', backgroundPosition: "center top" }}
                            image="/img.1/castlecreekExterior/buildingFrontWithSign.jpeg"
                            title="Castle Creek Inn"
                        />
                        <CardContent>
                            <Typography component="p" gutterBottom>
                                Imagine you travel through time, back to a period of pristine elegance and sophistication, away from the tangled web of distraction and obligation that is modern life. You breathe a sigh of relief; the moment you’ve longed for, even dreamed of, has arrived. At last, you’re able to relax and unwind. Just as you think, “It doesn’t get any better than this!” you look around and realize: though you’ve left the stress of modern life behind, all your favorite modern conveniences somehow survived the space-time continuum unscathed. You blink in disbelief, but it’s true–everything made it safely! Cable, a flat-screen smart TV, high-speed Wi-Fi, online movies, a couples’ tub with jets and a romantic lighting system, they’re all here! In utter delight, you fall back on a remarkably comfortable bed, and sigh.
                            </Typography>
                            <Typography component="p" gutterBottom>
                                This is the experience of a Castle Creek Inn getaway.
                            </Typography>
                            <Typography component="p" gutterBottom>
                                Originally built to be a residence, the Castle is both charming and cozy. You’ll feel right at home as you experience the royal life. Each guest room is unique in design and decor and provides a singular experience to its occupants.
                            </Typography>
                            <Typography component="p" gutterBottom>
                                Enjoy a cozy evening by your private fireplace. Sneak down to the complementary snack bar in the middle of the night to satisfy that sweet tooth, or to pop popcorn for your movie marathon. Wake up to a delicious, full breakfast–the perfect ending to a perfect stay.
                            </Typography>
                            <Typography component="p" gutterBottom>
                                The Castle is just minutes away from fine dining, theaters, hiking trails, ski resorts and other attractions. It’s like Shakespeare said: “Staying at Castle Creek Inn was the best decision I ever made! I penned the famous ‘Romeo & Juliet’ while staying in their luxurious suite of the same name. That led me to ponder, ‘What’s in a name?’ and more inspiring writings were born. I encourage you all to visit the Castle. For all who do are happy.”
                            </Typography>
                            <Typography component="p" gutterBottom>
                                We strive to provide our guests with terrific service and a memorable experience. A beautiful guest room is only the beginning. Included in every stay are the following complimentary amenities and services:
                            </Typography>
                            <Typography component="p" gutterBottom align="center">
                                *2-Person Jetted Tub     *All-Night Snack Bar     *Delicious Breakfast
                            </Typography>
                            <Typography component="p" gutterBottom align="center">
                                *Movie Library     *Wi-Fi     *Mini Fridge
                            </Typography>
                            <Typography component="p" gutterBottom align="center">
                                *Fireplace (Turned on from October 1st – May 1st)
                            </Typography>
                            <Typography component="p" gutterBottom>
                                In addition to these, many of our guest rooms also feature:
                            </Typography>
                            <Typography component="p" gutterBottom align="center">
                                *Balcony or Patio     *Pool Table     *Walk-In Shower     *Dining Area
                            </Typography>
                            <Typography component="p" gutterBottom>
                                Whether you’re looking for a romantic night out, a relaxing escape, or you’re simply in town on business, the Castle is your place. Click the “Rooms” tab for photos and information on each guest room. Thank you for visiting us. We hope to see you soon!
                            </Typography>
                            <Typography component="p" gutterBottom>
                                The Castle is just 15 minutes from the SLC International Airport, and downtown Salt Lake City.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <SuiteModal
                    handleClose={this.handleClose}
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

export default connect(mapStateToProps, { updateSelectedSuite })(HomeContent);
