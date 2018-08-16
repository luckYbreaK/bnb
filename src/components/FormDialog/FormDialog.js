import React, { Component } from "react";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button
} from "@material-ui/core";

export default class FormDialog extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            id: null
        }
    }

    componentDidMount() {
        axios.get("/api/userData").then(res => {
            let { data } = res;
            if(data.firstName) this.setState({firstName: data.firstName});
            if(data.lastName) this.setState({lastName: data.lastName});
            if(data.email) this.setState({email: data.email});
            if(data.phone) this.setState({phone: data.phone});
            if(data.id) this.setState({id: data.id});
        });
    }

    render() {
        const { open, handleClose, handleChange, handleSubmit, title, message } = this.props
        return (
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        id="firstName"
                        label="First Name"
                        defaultValue={this.state.firstName}
                        margin="dense"
                        fullWidth
                        type="text"
                        onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        defaultValue={this.state.lastName}
                        margin="dense"
                        fullWidth
                        type="text"
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        defaultValue={this.state.email}
                        margin="dense"
                        fullWidth
                        type="email"
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <TextField
                        required
                        id="phone number"
                        label="Phone Number"
                        defaultValue={this.state.phone}
                        margin="dense"
                        fullWidth
                        type="tel"
                        onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    />
                </DialogContent>
                <DialogActions style={{display: "flex", justifyContent: "center"}}>
                    <Button 
                        onClick=
                        {
                            () => 
                            handleSubmit(this.state.id, this.state.email, this.state.phone, this.state.firstName, this.state.lastName)
                        } 
                        color="primary"
                        variant="raised"
                        size="small"
                        >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}