import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

/**
 * Function to create and display a Snackbar dynamically.
 * @param {Object} options - Snackbar options.
 * @param {string} options.message - The message to display.
 * @param {string} options.severity - Alert severity ('success', 'error', 'info', 'warning').
 * @param {number} options.duration - Duration in milliseconds.
 * @param {Object} options.position - Position of the snackbar (vertical, horizontal).
 */
export function showSnackbar({
  message = "Default message",
  severity = "info",
  duration = 3000,
  position = { vertical: "top", horizontal: "right" },
}) {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const handleClose = () => {
    root.unmount();
    div.remove();
  };

  // Create a root and render the Snackbar
  const root = ReactDOM.createRoot(div);
  root.render(
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={position}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
