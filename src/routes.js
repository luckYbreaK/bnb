import React from "react";
import {Switch, Route} from "react-router-dom";
import Home2 from "./components/Home/Home2";
import Suites from "./components/Suites/Suites";
import Reservations2 from "./components/Reservations/Reservations2";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";

const routes = (
    <Switch>
        <Route exact path="/" component={Home2} />
        <Route path="/suites" component={Suites} />
        <Route path="/reservations" component={Reservations2} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
    </Switch>
);

export default routes;
    
