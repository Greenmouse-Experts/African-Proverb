import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectDropdown({
  items,
  label,
  value,
  id,
  size,
  name,
  onChange,
  children,
}) {
  //   const handleChange = (event) => {
  //     setGender(event.target.value);
  //   };

  return (
    <Box sx={{ minWidth: 120, width: "100%", marginBottom: "1.3rem" }}>
      <InputLabel
        id="demo-simple-select-label"
        style={{
          fontSize: "1rem",
          marginBottom: "0.2rem",
          display: "flex",
          gap: "0.3rem",
        }}
      >
        {label}
      </InputLabel>
      <FormControl fullWidth>
        <Select
          placeholder="Choose a character…"
          labelId="demo-simple-select-label"
          id={id}
          name={name}
          value={value}
          size={size}
          onChange={onChange}
          displayEmpty
          sx={{ color: "#A19E9A" }}
          // inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Choose One</em>
          </MenuItem>
          {children}
        </Select>
      </FormControl>
    </Box>
  );
}
