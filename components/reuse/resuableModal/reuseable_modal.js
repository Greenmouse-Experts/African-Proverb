import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function ReusableModal({
  children,
  open,
  setOpen,
  header,
  showCloseIcon = true,
  padding = 3,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      handleOpen();
    }
    // handleOpen()
  }, [open]);
  const style = {
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: padding,
  };

  const MODAL_STYLES = {
    outline: "none",
    border: "none",
    borderRadius: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    maxWidth: "100%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh", // Set the maximum height for the modal content
    overflowY: "auto",
  };

  const buttonStyles = {
    width: "100%",
    backgroundColor: "#BB5906",
    border: "none",
    color: "#FFFFFF",
    padding: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const styles = {
    position: "absolute",
    maxWidth: "100%",
    overflow: "hidden",
    display: "block",
  };

  return (
    // <div style={{}}>
    <Modal
      style={styles}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={MODAL_STYLES}>
        {showCloseIcon && (
          <CloseIcon
            style={{ alignSelf: "flex-end", cursor: "pointer" }}
            onClick={handleClose}
          />
        )}
        {children}
      </Box>
    </Modal>
    // </div>
  );
}
