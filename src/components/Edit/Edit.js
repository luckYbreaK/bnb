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
import { withStyles } from '@material-ui/core/styles';

import AlertDialog from "../AlertDialog/AlertDialog";
import { updateCart } from "../../ducks/reducer";

const styles = {
    title: {
        fontFamily: 'Niconne, cursive',
        fontSize: '2.0rem'
    }
};

class Reservations2 extends Component {
    constructor() {
        super();
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            open: false
        };

        this.editSuiteInCart = this.editSuiteInCart.bind(this);
        this.calcTotal = this.calcTotal.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    editSuiteInCart() {
        if (this.state.startDate && this.state.endDate) {
            let editsToSuite = this.props.suiteToEdit;
            editsToSuite.startDate = this.state.startDate;
            editsToSuite.endDate = this.state.endDate;
            editsToSuite.total = this.calcTotal(this.state.startDate, this.state.endDate, this.props.suiteToEdit);
            axios.put(`/api/updateItemInCart/${editsToSuite.id}`, {suite: editsToSuite}).then(res => {
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
        let { classes } = this.props
        const RESERVATIONS = [moment(), moment().add(10, 'days')];
        const isDayBlocked = day => RESERVATIONS.filter(moment => moment.isSame(day, 'day')).length > 0;
        // let day = moment("2018-08-10").add(5, 'd');
        // const isDayBlocked = d => d.isSame(day, 'day'); 
        return (
            <div>

                <div>
                    <Card style={{ maxWidth: 400, borderRadius: 0 }}>
                        <CardHeader
                            title="Edit Suite: "
                            subheader={this.props.suiteToEdit.title}
                            classes={{title: classes.title}}
                        />
                        <CardHeader
                            subheader={`Current Dates: ${moment(this.props.suiteToEdit.startDate).format("MM/DD/YYYY")}-${moment(this.props.suiteToEdit.endDate).format("MM/DD/YYYY")}`}
                        />
                        <CardMedia
                            style={{ height: 0, paddingTop: '56.25%' }}
                            image={this.props.suiteToEdit.img}
                            title={this.props.suiteToEdit.title}
                        />
                    </Card>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            onClick={this.editSuiteInCart}
                            color="primary"
                            variant="contained"
                            size="small"
                            style={{ marginTop: "-20px", textDecoration: "none" }}
                        >
                            Change Dates
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
        suiteToEdit: state.suiteToEdit
    }
}

export default withStyles(styles)(connect(mapStateToProps, { updateCart })(Reservations2));