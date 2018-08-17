import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from "react-redux";
import moment from 'moment';
import axios from "axios";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {
    Button,
    Card,
    CardMedia,
    CardHeader
} from "@material-ui/core";

import AlertDialog from "../AlertDialog/AlertDialog";
import { updateCart } from "../../ducks/reducer";

class Reservations2 extends Component {
    constructor() {
        super();
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            open: false,
            reservedDates: []
        };

        this.addSuiteToCart = this.addSuiteToCart.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        let {id} = this.props.selectedSuite
        axios.get(`/api/reservedDatesForSuite/${id}`).then(res => {
            this.setState({
                reservedDates: res.data
            });
        });
    }

    calcTotal(startDate, endDate, suite) {
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
        if (this.state.startDate && this.state.endDate) {
            let addPropsToSelectedSuite = this.props.selectedSuite;
            addPropsToSelectedSuite.startDate = this.state.startDate;
            addPropsToSelectedSuite.endDate = this.state.endDate;
            addPropsToSelectedSuite.total = this.calcTotal(this.state.startDate, this.state.endDate, this.props.selectedSuite);
            // this.props.updateCart(addPropsToSelectedSuite)
            axios.post("/api/addToCart", {suite: addPropsToSelectedSuite}).then(res => {
                this.props.history.push("/cart");
            });
            
        } else {
            this.handleClickOpen();
        }
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    render() {
        // const RESERVATIONS = [moment(), moment().add(10, 'days')];
        const RESERVATIONS = [];
        this.state.reservedDates.forEach(dateRange => {
            let nightsReserved = moment(dateRange.departure_date).format("DDD") - moment(dateRange.arrival_date).format("DDD");

            for (let i = 0; i < nightsReserved; i++) {
                RESERVATIONS.push(moment(dateRange.arrival_date).add(i, 'd'));
            }
        });
        
        const isDayBlocked = day => RESERVATIONS.filter(date => moment(date).isSame(day, 'day')).length > 0;
        // let day = moment("2018-08-10").add(5, 'd');
        // const isDayBlocked = d => d.isSame(day, 'day'); 
        return (
            <div>

                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title={this.props.selectedSuite.title}
                            subheader="Selected Suite: "
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image={this.props.selectedSuite.img}
                            title={this.props.selectedSuite.title}
                        />
                    </Card>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={this.addSuiteToCart}
                            color="primary"
                            variant="contained"
                            size="small"
                            style={{ marginTop: "-20px", textDecoration: "none" }}
                        >
                            Book Dates
                        </Button>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <DateRangePicker
                        startDateId="startDate"
                        endDateId="endDate"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        startDatePlaceholderText="Arrive"
                        endDatePlaceholderText="Depart"
                        showClearDates
                        reopenPickerOnClearDates
                        showDefaultInputIcon
                        small
                        numberOfMonths={1}
                        keepOpenOnDateSelect
                        withPortal
                        isDayBlocked={isDayBlocked}
                        onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={(focusedInput) => { this.setState({ focusedInput }) }}
                    />
                </div>

                <AlertDialog
                    open={this.state.open}
                    handleClose={this.handleClose}
                    message="Please Select Dates"
                />

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

export default connect(mapStateToProps, { updateCart })(Reservations2);