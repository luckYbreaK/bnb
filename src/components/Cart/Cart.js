import React, { Component, Fragment } from "react";
import axios from "axios";
import moment from "moment";
import {connect} from "react-redux";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    Button,
    IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import AlertDialog from "../AlertDialog/AlertDialog";
import FormDialog from "../FormDialog/FormDialog";
import { selectSuiteToEdit } from "../../ducks/reducer";

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            formOpen: false,
            cart: [],
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: null
        }

        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleFormOpen = this.handleFormOpen.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("/api/getCart").then(res => {
            this.setState({
                cart: [...this.state.cart, ...res.data]
            });
        });
    }

    handleCheckout() {
        axios.get("/api/userData").then(res => {
            let { data } = res;
            if (!data.email) {
                this.handleClickOpen();
            } else if(!data.firstName || !data.lastName || !data.email || !data.phone){
                    this.handleFormOpen();
            } else {
                window.location = "http://localhost:3000/#/checkout";
            }
        })
    }

    getTotal() {
        return (this.state.cart.map(item => item.total).reduce((acc, curr) => acc + curr));
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

    handleFormOpen() {
        this.setState({
            formOpen: true
        });
    }

    handleFormClose() {
        this.setState({
            formOpen: false
        });
    }

    deleteItemFromCart(id) {
        axios.delete(`/api/deleteFromCart/${id}`).then(res => {
            this.setState({
                cart: [...res.data]
            });
        });
    }

    handleEdit(suite) {
        this.props.selectSuiteToEdit(suite);
        this.props.history.push("/edit");
    }

    handleChange(name, val) {
        this.setState({
            [name]: val
        });
    };

    handleSubmit(id, email, phone, firstName, lastName) {
        axios.put(`/api/updateUserInfo/${id}`, {user: 
            {
                firstName: this.state.firstName ? this.state.firstName : firstName,
                lastName: this.state.lastName ? this.state.lastName : lastName,
                email: this.state.email ? this.state.email : email,
                phoneNumber: this.state.phoneNumber ? this.state.phoneNumber : phone
            }
        }).then(res => {
            window.location = "http://localhost:3000/#/checkout";
        });
    }

    render() {
        let mappedCart = this.state.cart.map((item, i) => {
            return (
                <div key={i}>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title={item.title}
                            subheader={`${moment(item.startDate).format("MM/DD/YYYY")}-${moment(item.endDate).format("MM/DD/YYYY")}`}
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image={item.img}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography style={{ display: "flex", justifyContent: "space-between" }}>
                                Price: ${item.total}
                                <Fragment>
                                    <IconButton
                                        style={{ marginTop: "-16px" }}
                                        onClick={() => this.handleEdit(item)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        style={{ marginTop: "-16px" }}
                                        onClick={() => this.deleteItemFromCart(item.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Fragment>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            );
        });

        return (
            this.state.cart.length === 0 ?
                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Your Shopping Cart is empty."
                        />
                    </Card>
                </div>
                :
                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Shopping Cart"
                        />
                    </Card>
                    <div>
                        {mappedCart}
                    </div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Total:"
                            subheader={`$${this.getTotal()}`}
                        />
                    </Card>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="raised"
                            color="primary"
                            size="small"
                            style={{ marginTop: "-20px", textDecoration: "none" }}
                            onClick={() => this.handleCheckout()}>Checkout
                        </Button>
                    </div>

                    <AlertDialog
                        open={this.state.open}
                        handleClose={this.handleClose}
                        message="Please Log In"
                    />

                    <FormDialog
                        open={this.state.formOpen}
                        handleClose={this.handleFormClose}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        firstName
                        lastName
                        email
                        phone
                        title="Personal Info"
                        message="Please verify that the info we have for you is current."
                    />
                </div>
        );
    }
}

export default connect(null, { selectSuiteToEdit })(Cart);