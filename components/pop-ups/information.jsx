import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";

export default function AutohideSnackbar({ open, onClose, message }) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert         
          severity="error"
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
