import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { connect } from "react-redux";
import { resetCart } from "../../ducks/reducer";




class Checkout extends Component {
    constructor() {
        super();

        this.state = {
            cart: []
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
        axios.post('/api/payment', { token, amount: this.getTotal() }).then(response => {
            alert('we are in business')
        });
        // this.props.resetCart();
        this.props.history.push("/");
    }

    render() {

        let { REACT_APP_PUB_KEY } = process.env;
        let total = this.state.cart.length !== 0 ? this.getTotal() : null
        return (
            total ?
            <div>
                <StripeCheckout
                    token={this.onToken}
                    stripeKey={REACT_APP_PUB_KEY}
                    amount={total}
                />
            </div>
            :
            null
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { resetCart })(Checkout);