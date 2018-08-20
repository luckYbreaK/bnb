import React, { Component } from "react";
import axios from "axios";
import { TextField, Card, CardHeader, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import AlertDialog from "../AlertDialog/AlertDialog";

const styles = {
    title: {
        fontFamily: 'Niconne, cursive',
        fontSize: '2.0rem'
    }
};

class ContactUs extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            phone: "",
            message: "",
            open: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name, val) {
        this.setState({
            [name]: val
        });
    };

    handleSubmit() {
        let { name, email, phone, message } = this.state;
        axios.post("/api/sendEmail", {name, email, phone, message, to: "gskhrvat@yahoo.com"}).then(res => {
            // alert(res.data);
            this.setState({
                name: "",
                email: "",
                phone: "",
                message: ""
            });
            this.handleClickOpen();
        });
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader title="Get in touch with us" classes={{title: classes.title}}/>        
                    </Card>
                    <div style={{ display: "flex", flexDirection: "column", padding: "0 30px", marginBottom: "50px" }}>
                        <TextField
                            id="name"
                            label="Name"
                            margin="normal"
                            required
                            onChange={(e) => this.handleChange("name", e.target.value)}
                            value={this.state.name}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            margin="normal"
                            required
                            type="text"
                            onChange={(e) => this.handleChange("email", e.target.value)}
                            value={this.state.email}
                        />
                        <TextField
                            id="phone number"
                            label="Phone Number"
                            margin="normal"
                            type="tel"
                            onChange={(e) => this.handleChange("phone", e.target.value)}
                            value={this.state.phone}
                        />
                        <TextField
                            id="message"
                            label="Message"
                            margin="normal"
                            multiline
                            required
                            onChange={(e) => this.handleChange("message", e.target.value)}
                            value={this.state.message}
                        />
                    </div>
                </Card>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="raised"
                        color="primary"
                        size="small"
                        style={{ marginTop: "-20px", textDecoration: "none" }}
                        onClick={this.handleSubmit}
                    >
                        Send
                    </Button>
                </div>
                <AlertDialog
                        open={this.state.open}
                        handleClose={this.handleClose}
                        message="Email Sent!"
                    />
            </div>
        );
    }
}

export default withStyles(styles)(ContactUs);