import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from "react-redux";
import moment from 'moment';
import axios from "axios";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Cart from "../Cart/Cart";
import { updateCart } from "../../ducks/reducer";

class Reservations extends Component {
    constructor() {
      super();
      this.state = {
        startDate: null,
        endDate: null,
        focusedInput: null,
      };

      this.addSuiteToCart = this.addSuiteToCart.bind(this);
    }

    addSuiteToCart() {
      // let suite = this.props.suites[0]
      // axios.post("/api/cart", { suite }).then(res => {
      //   this.props.updateCart(res.data);

      // })
      this.props.updateCart(this.props.suites[0])
    }

    render() {

      const RESERVATIONS = [moment(), moment().add(10, 'days')];
      const isDayBlocked = day => RESERVATIONS.filter(moment => moment.isSame(day, 'day')).length > 0;
      // let day = moment("2018-08-10").add(5, 'd');
      // const isDayBlocked = d => d.isSame(day, 'day'); 
      return (
        <div>
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            numberOfMonths={1}
            isDayBlocked={isDayBlocked}
            onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
          />
          <button onClick={this.addSuiteToCart}>Book</button>
          <Cart />
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    suites: state.suites
  }
}

export default connect(mapStateToProps, { updateCart })(Reservations);