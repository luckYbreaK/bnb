import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Modal, Button } from '@material-ui/core';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '300px',
        height: '300px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        overflowY: "auto"
    },
    title: {
        fontFamily: 'Niconne, cursive',
        fontSize: '2.0rem'
    }
});

class SuiteModal extends Component {
    render() {
        const { classes, handleClose, open, selectedSuite } = this.props;
        let truthyKeys = [];
        for (let key in selectedSuite) {
            if (typeof selectedSuite[key] === "string" && key !== "title" && key !== "description" && key !== "img" && key !== "weekday_price" && key !== "weekend_price" && selectedSuite[key] !== "") {
                switch (key) {
                    case "bed_size":
                        truthyKeys.push(`${selectedSuite[key]} Bed`);
                        break;
                    case "tub_type":
                        truthyKeys.push(`${selectedSuite[key]} Tub`);
                        break;
                    case "shower_type":
                        truthyKeys.push(`${selectedSuite[key]} Shower`);
                        break;
                    default:
                        truthyKeys.push(selectedSuite[key]);
                        break;
                }

            } else if (typeof selectedSuite[key] === "boolean" && selectedSuite[key]) {
                let letterArr = key.split('');
                letterArr[0] = letterArr[0].toUpperCase();
                truthyKeys.push(letterArr.join(''));
            }
        }

        return (
            <div>
                <Modal
                    open={open}
                    onClose={() => handleClose({})}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title" align="center" gutterBottom className={classes.title}>
                            {selectedSuite.title}                    
                        </Typography>
                        <div>
                            <img
                                src={selectedSuite.img}
                                alt={selectedSuite.title}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Link to="/reservations" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    size="small"
                                    style={{ marginTop: "-25px", textDecoration: "none" }}
                                >
                                    Reserve Suite
                                </Button>
                            </Link>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subheading" id="modal-weekday" color="secondary" style={{fontWeight: 'bold'}}>
                                Mon - Thur: ${selectedSuite.weekday_price}
                            </Typography>
                            <Typography variant="subheading" id="modal-weekend" color="secondary" style={{fontWeight: 'bold'}}>
                                Fri - Sat: ${selectedSuite.weekend_price}
                            </Typography>
                        </div>
                        <Typography variant="body2" id="modal-description" gutterBottom>
                            {selectedSuite.description}
                        </Typography>
                        <Typography variant="subheading" id="modal-features" color="secondary" style={{fontWeight: 'bold'}}>
                            {selectedSuite.title} features:
                        </Typography>
                        {truthyKeys.map((key, i) => (
                            <Typography variant="body2" key={i}>
                                *{key}
                            </Typography>
                        ))}
                        <Typography variant="body2" id="modal-price">
                            *All guest room prices are subject to change.
                        </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

SuiteModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuiteModal);