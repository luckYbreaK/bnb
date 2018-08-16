import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    Button,
    IconButton
} from "@material-ui/core";

const context = require.context("../../img/card", true, /\.(jpg)$/);
const regex = /\b[A-Za-z]+/;

export default class AccountReservations extends Component {
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
        let reservations = this.state.reservations.map((reservation, i) => {
            return (
                <div key={i}>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title={reservation.title}
                            subheader={`${moment(reservation.startDate).format("MM/DD/YYYY")}-${moment(reservation.endDate).format("MM/DD/YYYY")}`}
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
                        />
                    </Card>
                </div>
                :
                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Reservations"
                        />
                    </Card>
                    <div>
                        {reservations}
                    </div>
                </div>
        );
    }
}