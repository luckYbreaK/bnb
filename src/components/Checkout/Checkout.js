import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardMedia,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    title: {
        fontFamily: 'Niconne, cursive',
        fontSize: '2.0rem'
    }
};


class Checkout extends Component {
    constructor() {
        super();

        this.state = {
            cart: [],
            transactionComplete: false
        }
    }

    componentDidMount() {
        axios.get("/api/getCart").then(res => {
            this.setState({
                cart: [...this.state.cart, ...res.data]
            });
        });
    }

    getTotal() {
        return (this.state.cart.map(item => item.total).reduce((acc, curr) => acc + curr) * 100);
    }

    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('/api/payment', { token, amount: this.getTotal() }).then(res => {
            axios.post("/api/createOrder").then(res => {
                axios.delete("/api/emptyCart").then(res => {
                    this.setState({
                        cart: res.data,
                        transactionComplete: true
                    });
                });
            });

        });
    }

    render() {
        let { classes } = this.props
        let { REACT_APP_PUB_KEY } = process.env;
        let total = this.state.cart.length !== 0 ? this.getTotal() : null
        return (
            total ?
                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Checkout"
                            classes={{title: classes.title}}
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image="/img.1/castlecreekExterior/buildingFront.jpeg"
                            title="Castle Creek Inn"
                        />
                    </Card>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <StripeCheckout
                            token={this.onToken}
                            stripeKey={REACT_APP_PUB_KEY}
                            amount={total}
                        />
                    </div>
                </div>
                :
                <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                    <CardHeader
                        title="Thank you for your reservation."
                        subheader="We look forward to seeing you!"
                        classes={{title: classes.title}}
                    />
                </Card>
        );
    }
}

export default withStyles(styles)(Checkout);