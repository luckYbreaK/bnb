import React from "react";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

export default function AlertDialog(props) {
    const { open, handleClose, message } = props
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogContent>
                <DialogContentText color="primary">
                    {message}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}