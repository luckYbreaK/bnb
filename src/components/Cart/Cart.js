import React, { Component } from "react";
import axios from "axios";
import {connect} from "react-redux";

class Cart extends Component {
// constructor() {
//     super();

//     this.state = {
//         cart: []
//     }
// }

    // componentDidMount() {
    //     axios.get("/api/userData").then(res => {
    //         this.setState({
    //             cart: res.data.cart
    //         });
    //     })
    // }

    // componentDidUpdate() {

    // }

    render() {
        console.log(this.props.cart);
        
        let mappedCart = this.props.cart.map((item,i) => {
            return(
                <div key={i}>
                    <h1>{item.title}</h1>
                    <img src={item.img} alt={item.title}/>
                </div>
            );
        });
        
        return (
            <div>
                {this.props.cart.length === 0 ?
                null 
                :
                <div>{mappedCart}</div>     
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

export default connect(mapStateToProps, null)(Cart);