import { blue } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const MessagePopup = ({ message, type }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const handleClose = () => {
    setOpen(false);
  };
  const backgroundColor =
    type === "success"
      ? blue[500]
      : type === "error"
      ? "red"
      : type === "warning"
      ? "orange"
      : "lightblue";

  return (
    <Snackbar
      open={open}
      autoHideDuration={type === "success" ? 3000 : null}
      onClose={handleClose}
      anchorOrigin={{ vertical: "center", horizontal: "right" }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={type}
        elevation={6}
        variant="filled"
        sx={{
          backgroundColor,
          width: "400px",
          minWidth: "200px",
          height: "70px",
          textAlign: "center",
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MessagePopup;
