import React, { useState, useContext, useEffect } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import { EthnicContext } from "@/context/ethnicContext";
import MultiStepContext from "@/context/StepContext";
import { extractIds } from "@/utils";

export default function MultipleSelect({ preferredLanguage, maxSelections }) {
  const fixedOptions = [preferredLanguage];
  const { ethnicsList } = useContext(EthnicContext);
  const ethnicOptions = [{ id: "all", name: "Select All" }, ...ethnicsList];



  const [value, setValue] = React.useState(
    preferredLanguage ? [preferredLanguage] : []
  );

  const { setSelectedLanguage, setSelectedLanguages } =
    useContext(MultiStepContext);

  useEffect(() => {
    if (value) {
      setSelectedLanguage(extractIds(value));
      setSelectedLanguages(value);
    }
  }, [value]);

  function handleChange(event, newValue) {
    if (newValue.length <= maxSelections) {
      // If "Select All" is selected, set all options except "Select All"
      if (newValue.find((option) => option.id === "all")) {
        setValue(ethnicOptions.filter((option) => option.id !== "all"));
      } else {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }
    }
  }

  useEffect(() => {
    setValue(preferredLanguage ? [preferredLanguage] : []);
  }, [preferredLanguage, maxSelections]);

  return (
    <div>
      <InputLabel sx={{ mb: 1 }} id="demo-multiple-checkbox-label">
        Your Selected Languages
      </InputLabel>

      <Autocomplete
        sx={{ mb: "1rem", width: "100%" }}
        multiple
        id="fixed-tags-demo"
        value={value}

        onChange={handleChange}
        options={ethnicOptions}
        getOptionLabel={(option) => option.name}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              key={index}
              label={option?.name}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
}
