import React from "react";
import {Switch, Route} from "react-router-dom";
import Home2 from "./components/Home/Home2";
import Suites from "./components/Suites/Suites";
import Reservations from "./components/Reservations/Reservations";
import Checkout from "./components/Checkout/Checkout";

const routes = (
    <Switch>
        <Route exact path="/" component={Home2} />
        <Route path="/suites" component={Suites} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/checkout" component={Checkout} />
    </Switch>
);

export default routes;
    
