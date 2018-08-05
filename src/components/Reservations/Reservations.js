import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Cart from "../Cart/Cart";

class Reservations extends Component {
  constructor() {
    super();
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
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
        <button>Book</button>
        <Cart />
      </div>
    );
  }
}

export default Reservations;