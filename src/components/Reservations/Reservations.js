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
      numOfWeekdays: 0,
      numOfWeekendDays: 0
    };

    this.addSuiteToCart = this.addSuiteToCart.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
  }

  calcTotal(startDate, endDate, suite) {
    // console.log(moment(date).format("ddd"));
    let weekdays = 0;
    let weekends = 0;
    let total = 0;
    let nightsReserved = moment(endDate).format("DDD") - moment(startDate).format("DDD");
    for (let i = 0; i < nightsReserved; i++) {
      let dayOfWeek = moment(moment(startDate).add(i, 'd')).format("ddd");
      if (dayOfWeek === "Fri" || dayOfWeek === "Sat") {
        weekends++;
      } else {
        weekdays++
      }
    }
    total = (suite.weekday_price * weekdays) + (suite.weekend_price * weekends)
    return total;
  }

  addSuiteToCart() {
    // let suite = this.props.suites[0]
    // axios.post("/api/cart", { suite }).then(res => {
    //   this.props.updateCart(res.data);

    // })
    if (this.state.startDate && this.state.endDate) {
      let addPropsToSelectedSuite = this.props.selectedSuite;
      addPropsToSelectedSuite.startDate = this.state.startDate;
      addPropsToSelectedSuite.endDate = this.state.endDate;
      addPropsToSelectedSuite.total = this.calcTotal(this.state.startDate, this.state.endDate, this.props.selectedSuite);
      this.props.updateCart(addPropsToSelectedSuite)
    } else {
      alert("Please select dates");
    }

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
        <div>
          <button onClick={this.addSuiteToCart}>Book Dates</button>
        </div>
        {/* <div>
          <button onClick={() => this.isWeekend(this.state.startDate, this.state.endDate)}>Weekend</button>
        </div> */}
        <div>
          <Cart
            numOfWeekdays={this.state.numOfWeekdays}
            numOfWeekendDays={this.state.numOfWeekendDays}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suites: state.suites,
    selectedSuite: state.selectedSuite
  }
}

export default connect(mapStateToProps, { updateCart })(Reservations);