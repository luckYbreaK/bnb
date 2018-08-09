import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {connect} from "react-redux";



class Checkout extends Component {
    getTotal() {
        return (this.props.cart.map(item => item.total).reduce((acc, curr) => acc + curr) * 100);
    }

    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('/api/payment', { token, amount: this.getTotal() }).then(response => {
            alert('we are in business')
        });
    }

    render() {
        console.log(this.props.cart ? this.props.cart[0].total : "loading");
        
        let {REACT_APP_PUB_KEY} = process.env;
        return (
            <div>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={REACT_APP_PUB_KEY}
                    amount={this.getTotal()}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Checkout);