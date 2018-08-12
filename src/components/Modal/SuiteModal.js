import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
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
                {/* <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button> */}
                <Modal
                    open={open}
                    onClose={() => handleClose({})}
                    style={{ overflowY: "auto" }}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title" align="center" gutterBottom>
                            {selectedSuite.title}
                        </Typography>
                        <div>
                            <img
                                src={selectedSuite.img}
                                alt={selectedSuite.title}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                        <Typography variant="body2" id="modal-description" gutterBottom>
                            {selectedSuite.description}
                        </Typography>
                        <Typography variant="body2" id="modal-features">
                            {selectedSuite.title} features:
                        </Typography>
                        {truthyKeys.map((key, i) => (
                            <Typography variant="body2" key={i}>
                                *{key}
                            </Typography>
                        ))}
                        <Typography variant="body2" id="modal-weekday">
                            Mon - Thur: ${selectedSuite.weekday_price}
                        </Typography>
                        <Typography variant="body2" id="modal-weekend">
                            Fri - Sat: ${selectedSuite.weekend_price}
                        </Typography>
                        <Typography variant="body2" id="modal-price">
                            *All guest room prices are subject to change.
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button variant="raised" color="primary">Reserve Suite</Button>
                        </div>
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