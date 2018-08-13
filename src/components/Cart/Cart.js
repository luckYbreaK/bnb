import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Typography, 
    Button,
    IconButton,
    Icon 
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { refreshCart, deleteItemFromCart } from "../../ducks/reducer";

class Cart extends Component {
    // componentDidUpdate(prevProps) {
    //     if (this.props.cart !== prevProps.cart) {
    //      console.log("componentdidupdate",this.props.cart);


    //     }
    //   }      

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

    getTotal() {
        return (this.props.cart.map(item => item.total).reduce((acc, curr) => acc + curr));
    }

    render() {
        let { deleteItemFromCart } = this.props
        let mappedCart = this.props.cart.map((item, i) => {
            return (
                // <div key={i}>
                //     <button onClick={() => deleteItemFromCart(item.id)}>X</button>
                //     <h1>{item.title}</h1>
                //     <img src={item.img} alt={item.title} />
                //     <p>Total: ${item.total}</p>
                // </div>
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
                            <Typography style={{display: "flex", justifyContent: "space-between"}}>
                                Price: ${item.total}
                                <IconButton 
                                    style={{marginTop: "-16px"}} 
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
            this.props.cart.length === 0 ?
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
                            small
                            style={{ marginTop: "-20px", textDecoration: "none" }}
                            onClick={() => this.handleCheckout()}>Checkout
                        </Button>
                    </div>
                </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { refreshCart, deleteItemFromCart })(Cart);