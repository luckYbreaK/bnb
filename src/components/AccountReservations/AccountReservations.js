import React, { Component } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    Button,
    IconButton
} from "@material-ui/core";

export default class AccountReservations extends Component {
    render() {
        return (
            <div>
                <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                    <CardHeader
                        title="Reservations"
                    />
                </Card>
            </div>
        );
    }
}