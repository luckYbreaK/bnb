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
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteItemFromCart } from "../../ducks/reducer";
import AlertDialog from "../AlertDialog/AlertDialog"

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            cart: []
        }

        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
            let email = null;
            let { data } = res;
            if (!data.email) {
                this.handleClickOpen();
            } else {
                email = data.email;
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

    render() {
        // let { deleteItemFromCart } = this.props
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
                                <IconButton
                                    style={{ marginTop: "-16px" }}
                                    onClick={() => deleteItemFromCart(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
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
                </div>
        );
    }
}

export default Cart;