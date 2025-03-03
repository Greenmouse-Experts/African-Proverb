import React from "react";
import Loader from "./loader";

const Button = ({
  textInput,
  type,
  onClick,
  disabled,
  isLoading,
  variant = "primary",
}) => {
  const containerStyle = {
    display: "flex",
    width: "100%",
  };
  const buttonStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.2rem",
    width: "100%",
    backgroundColor: disabled
      ? "#858585"
      : variant === "primary"
      ? "#BB5906"
      : variant === "secondary"
      ? "#fff"
      : "",
    border: "none",
    color: variant === "primary" ? "#FFFFFF" : "#000",
    padding: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <button
        disabled={disabled || isLoading}
        onClick={onClick}
        type={type}
        style={buttonStyles}
      >
        {!isLoading && textInput}
        {isLoading && <Loader />}
      </button>
    </div>
  );
};

export default Button;
