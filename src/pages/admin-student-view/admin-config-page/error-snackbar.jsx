import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

const ErrorSnackbar = (props) => {
  const { error, errorMessage } = props;
  const [open, setOpen] = useState(error);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
