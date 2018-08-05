import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";



class Checkout extends Component {
    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('/api/payment', { token, amount: 5.00 }).then(response => {
            alert('we are in business')
        });
    }

    render() {
        let {REACT_APP_PUB_KEY} = process.env;
        return (
            <div>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={REACT_APP_PUB_KEY}
                    amount={1000}
                />
            </div>
        );
    }
}

export default Checkout;