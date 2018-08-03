import React, { Component } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { DateRangePicker } from 'react-dates';
import moment from 'moment';

class Reservations extends Component {
  constructor(props) {
    super(props);
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
        <button>Reserve</button>
      </div>
    );
  }
}

export default Reservations;