import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { bool } from "sharp";

const confirmCard  : React.FC<{open : boolean, desc : string , button: string, onClose : any }> = ({ open , onClose , desc , button   }) =>  {
  const handleClose = (agreed : boolean ) => {
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
      <DialogContent className="bg-gray-100">{desc}</DialogContent>
      <DialogActions className="bg-gray-100">
        <Button className="text-red-500" onClick={() => handleClose(false)}>
          CLOSE
        </Button>
        <Button
          className="text-green-500"
          onClick={() => handleClose(true)}
          autoFocus
        >
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
 export default confirmCard;