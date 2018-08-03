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
                backgroundColor: "#e5e5e5",
                color: "#999999"
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

        const { style, days, reservations } = this.state;
        let str = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
        let str2 = `${reservations[1].start.getFullYear()}/${reservations[1].start.getMonth()}/${reservations[1].start.getDate()}`;

        console.log(str2);

        let newStyle = {
            
            style,
            selectable: false   
            // borderRadius: "0px",
            // border: "none"
        };
        // return days.includes(date.getDate()) ? newStyles : {};
        return str === str2 ? newStyle : {};
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
                    events={[]}
                    views={["month"]}
                    // eventPropGetter={this.showUnavailable}
                    dayPropGetter={this.customDayPropGetter}
                // onSelectSlot={this.updateSlotStyle}
                />
            </div>
        );
    }
}

export default Reservations;