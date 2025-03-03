import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdCall } from "react-icons/md";

const ReusableTextField = ({
  label,
  type,
  icon,
  name,
  onSubmit,
  onChange,
  onBlur,
  error,
  disabled,
  id,
  value,
  helperText,
  setPasswordVisible,
  passwordVisible,
  required,
  minRows,
  multiline,
  InputProps,
  ...props
}) => {
  const getIcon = () => {
    switch (icon) {
      case "email":
        return <MdEmail style={{ fontSize: "1.2rem" }} />;
      case "lock":
        return <BiSolidLockAlt style={{ fontSize: "1.2rem" }} />;
      case "user":
        return <FaUser style={{ fontSize: "1.2rem" }} />;
      case "call":
        return <MdCall style={{ fontSize: "1.2rem" }} />;
      case "pen":
        return <BsPencil style={{ fontSize: "1.2rem" }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", marginBottom: "0.6rem" }}>
      <InputLabel
        style={{
          fontSize: "1rem",
          marginBottom: "0.2rem",
          display: "flex",
          gap: "0.3rem",
        }}
      >
        {label}
        {required && <p style={{ color: "red" }}>*</p>}
      </InputLabel>
      <TextField
        name={name}
        disabled={disabled}
        id={id}
        onSubmit={onSubmit}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        error={error}
        multiline={multiline}
        minRows={minRows}
        type={type}
        size="big"
        // error
        helperText={helperText}
        fullWidth
        {...props}
        InputProps={InputProps}
      />
    </div>
  );
};

export default ReusableTextField;
