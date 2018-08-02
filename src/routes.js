import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Suites from "./components/Suites/Suites";
import Reservations from "./components/Reservations/Reservations";

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/suites" component={Suites} />
        <Route path="/reservations" component={Reservations} />
    </Switch>
);

export default routes;
    
