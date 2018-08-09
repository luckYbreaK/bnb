import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { deleteItemFromCart } from "../../ducks/reducer";

class Cart extends Component {
    handleCheckout() {
        axios.get("/api/userData").then(res => {
            let email = null;
            let { data } = res;
            if (typeof data === "string") {
                alert(data)
            } else {
                email = data.email;
                window.location = "http://localhost:3000/#/checkout";
            }
        })
    }

    render() {
        console.log(this.props);
        let { numOfWeekdays, numOfWeekendDays, deleteItemFromCart } = this.props

        let mappedCart = this.props.cart.map((item, i) => {
            return (
                <div key={i}>
                    <button onClick={() => {
                        console.log("selected");
                        return deleteItemFromCart(item.id)
                    }}>X</button>
                    <h1>{item.title}</h1>
                    <img src={item.img} alt={item.title} />
                    <p>Total: ${item.total}</p>
                </div>
            );
        });

        return (
            <div>
                {this.props.cart.length === 0 ?
                    null
                    :
                    <div>
                        {mappedCart}
                        <button onClick={() => this.handleCheckout()}>Checkout</button>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { deleteItemFromCart })(Cart);