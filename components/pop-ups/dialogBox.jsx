import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function AlertDialog({ open, onClose }) {
  const handleClose = (agreed) => {
    onClose(agreed); 
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="font-[lato] "
    >
      <DialogContent className="bg-gray-300">
        Add Song to Your Favorite Playlist ?
      </DialogContent>
      <DialogActions className="bg-gray-300">
        <Button className="text-red-500" onClick={() => handleClose(false)}>
          CLOSE
        </Button>
        <Button
          className="text-green-500"
          onClick={() => handleClose(true)}
          autoFocus
        >
          ADD
        </Button>
      </DialogActions>
    </Dialog>
  );
}
