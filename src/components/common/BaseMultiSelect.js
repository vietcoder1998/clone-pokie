import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import React from "react";

export default function BaseMultiSelect(props) {
  const { options, value, name, loading } = props;
  const autoCompleteValues = React.useMemo(() => {
    const values = value && value?.length > 0 ? value : [];
    const optionsFilter = options ? options : [];

    return optionsFilter?.filter(
      (option) => option && values && values.includes(option?.value)
    );
  }, [value, options]);
  const getValueFromSelectedOptions = (values) =>
    values && values?.length > 0
      ? values.filter((item) => item?.value).map((item) => item?.value)
      : [];
  const onKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && props.onEnterKeyDown) {
        e.preventDefault();
        const newDefaultOptions = [
          ...(options?.length ? options.filter((item) => item.value) : []),
          { label: e?.target?.value, value: e?.target?.value },
        ];

        if (props.onEnterKeyDown && e?.target?.value && options?.length) {
          props.onEnterKeyDown(e, newDefaultOptions);
        }

        if (props.onChange) {
          props.onChange(name, [...value, e?.target?.value]);
        }
      }
    },
    [props, options, name, value]
  );

  return (
    <>
      <input
        id="hidden-multi-select"
        type={"hidden"}
        value={props?.value?.toString()}
      />
      <Autocomplete
        {...{
          multiple: true,
          getOptionLabel: (option) => option?.label,
          filterSelectedOptions: true,
          isOptionEqualToValue: (option, select) =>
            option?.value === select?.value,
          renderOption: (props, option) => (
            <li {...props} key={option?.value}>
              {option?.label}
            </li>
          ),
        }}
        limitTags={3}
        error={props?.error}
        required={props?.required}
        size="small"
        {...props.autoCompleteProps}
        getOptionDisabled={(option) => option?.disabled}
        options={options}
        groupBy={(option) => option?.group}
        filterSelectedOptions
        value={autoCompleteValues}
        fullWidth={true}
        onKeyPress={onKeyDown}
        onChange={(event, values) => {
          if (props?.onChange) {
            props?.onChange(name, getValueFromSelectedOptions(values));
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props?.inputProps}
            placeholder={props?.placeholder ?? ""}
            fullWidth={true}
          />
        )}
      />
      {loading && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
