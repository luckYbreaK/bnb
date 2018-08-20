import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import {
    Card,
    CardHeader,
    CardMedia
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const context = require.context("../../img/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

const styles = {
    title: {
        fontFamily: 'Niconne, cursive',
        fontSize: '2.0rem'
    }
};

class AccountReservations extends Component {
    constructor() {
        super();

        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        axios.get("/api/userData").then(res => {
            let { id } = res.data;
            axios.get(`/api/reservations/${id}`).then(res => {
                let addImgToSuites = res.data.map(suite => {
                    let updatedSuite = {};
    
                    context.keys().forEach(key => {
                        if (suite.title.includes(key.match(regex)[0])) {
                            updatedSuite = Object.assign({}, suite, { img: context(key) });
                        }
                    });
    
                    return updatedSuite;
                })
    
                this.setState({
                    reservations: addImgToSuites
                });
            });
        });
        
    }

    render() {
        let { classes } = this.props
        let reservations = this.state.reservations.map((reservation, i) => {
            return (
                <div key={i}>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title={reservation.title}
                            subheader={`${moment(reservation.arrival_date).format("MM/DD/YYYY")}-${moment(reservation.departure_date).format("MM/DD/YYYY")}`}
                            classes={{title: classes.title}}
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image={reservation.img}
                            title={reservation.title}
                        />
                    </Card>
                </div>
            );
        });


        return (
            this.state.reservations.length === 0 ?
                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="You Don't Have Any Reservations :("
                            classes={{title: classes.title}}
                        />
                    </Card>
                </div>
                :
                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Reservations"
                            classes={{title: classes.title}}
                        />
                    </Card>
                    <div>
                        {reservations}
                    </div>
                </div>
        );
    }
}

export default withStyles(styles)(AccountReservations);