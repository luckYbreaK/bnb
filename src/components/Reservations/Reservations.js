import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Reservations.css"

moment.locale("en");
Calendar.momentLocalizer(moment)

class Reservations extends Component {
    constructor() {
        super();

        this.state = {
            reservations: [
                { start: new Date(), end: new Date(moment().add(1, "d")) },
                { start: new Date("08/23/2018"), end: new Date(moment("08/25/2018").add(1, "d")) }
            ],
            style: {
                backgroundColor: "purple"
            },
            days: [],
            reserveDays: []
        }

        this.showUnavailable = this.showUnavailable.bind(this);
    }

    showUnavailable(event, start, end, isSelected) {
        let newStyle = {
            height: "20px",
            backgroundColor: "black",
            // color: 'black',
            // borderRadius: "0px",
            // border: "none"
        };

        return {
            // className: "unavailable",
            style: newStyle
        };
    }

    customDayPropGetter = date => {
        const { style, days } = this.state;
        const newStyles = {
            className: 'selected-day',
            style
        };
        return days.includes(date.getDate()) ? newStyles : {};
    }

    updateSlotStyle = slotInfo => {
        const { days } = this.state;
        const day = slotInfo.start.getDate();
        // const end = slotInfo.end.getDate();
        
        if (this.state.days.includes(day)) {
            // remove the selected days from this.state.days
            let updatedDays = [...days];
            updatedDays.splice(updatedDays.indexOf(day), 1);
            this.setState({ style: { backgroundColor: "green" }, days: updatedDays });
        } else {
            this.setState({ style: { backgroundColor: "green" }, days: [...days, day] });
            
            
        }
    }

    render() {
        console.log(this.state.days);
        return (
            <div className="calendar_container">
                <Calendar
                    selectable
                    events={this.state.reservations}
                    views={["month"]}
                    eventPropGetter={this.showUnavailable}
                    dayPropGetter={this.customDayPropGetter}
                    onSelectSlot={this.updateSlotStyle}
                />
            </div>
        );
    }
}

export default Reservations;