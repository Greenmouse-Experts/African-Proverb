import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PasswordValidation = () => {
  const VALIDATION_STYLES = {
    backgroundColor: "#EDF9F0",
    width: "100%",
    borderRadius: "5px",
    padding: "1rem",
    marginBottom: "1rem"

  };

  const ICON_STYLES ={
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    color: "#007665",
    marginBottom:"0.3rem",
    fontSize: "12px"
  }

  return (
    <div style={VALIDATION_STYLES}>
      <div style={ICON_STYLES}> 
        <ErrorIcon  />
        <p>Password must contain 8 characters</p>
      </div>
      <div style={ICON_STYLES}> 
        <ErrorIcon  />
        <p>Password must contain 8 characters</p>
      </div>
      <div style={ICON_STYLES}> 
        <ErrorIcon fontSize="medium"  />
        <p>Password must contain 8 characters</p>
      </div>
      <div style={ICON_STYLES}> 
        <CheckCircleIcon fontSize="medium"  />
        <p>Password mast contain 8 characters</p>
      </div>
    </div>
  );
};

export default PasswordValidation;
