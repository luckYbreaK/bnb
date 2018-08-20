import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Suites from "./components/Suites/Suites";
import Reservations2 from "./components/Reservations/Reservations2";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import Edit from "./components/Edit/Edit"
import AccountReservations from "./components/AccountReservations/AccountReservations";
import ContactUs from "./components/ContactUs/ContactUs";

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/suites" component={Suites} />
        <Route path="/reservations" component={Reservations2} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        <Route path="/edit" component={Edit} />
        <Route path="/myreservations" component={AccountReservations} />
        <Route path="/contactus" component={ContactUs} />
    </Switch>
);

export default routes;
    
