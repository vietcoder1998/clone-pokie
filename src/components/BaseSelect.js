import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function BaseSelect({
  value = "",
  defaultValue = "",
  options = [],
  onChange = () => {
    return;
  },
  name = "",
  label = "",
  sx = {}
}) {
  const handleChange = (event) => {
    onChange(event.target.value, event.target.name);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          defaultValue={defaultValue}
          label={label}
          name={name}
          onChange={handleChange}
        >
          <MenuItem key={`${new Date().getTime()}`} value={""}>
            {"All"}
          </MenuItem>
          {options?.map((item) => (
            <MenuItem key={`${new Date().getTime()}`} value={item?.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
