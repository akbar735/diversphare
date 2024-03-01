import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export default function AlertMessage({
  isAlertOpen,
  isErrorAlert,
  handleCloseAlert,
}) {
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleCloseAlert}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={3000}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        onClose={handleCloseAlert}
        message="Note archived"
        action={action}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={isErrorAlert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isErrorAlert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
