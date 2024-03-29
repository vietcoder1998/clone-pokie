import { Box, TextField } from "@mui/material";
import React from "react";
import EditContainerModal from "./../../../../../../../components/modal/EditContainerModal";

/**
 * View Field
 *
 * @return  {[type]}  [return description]
 */

export function EditProfileModal({ data, onCancel, onSubmitForm, visible }) {
  const [cloneValue, setCloneValue] = React.useState(
    {
      fullName: "",
      state: 0,
    } ?? []
  );

  React.useEffect(() => {
    setCloneValue({
      fullName: data?.fullName,
      state: data?.state,
    });
  }, [data]);
  const onUpdateCloneData = React.useCallback(
    (e) => {
      const name = e?.target?.name;
      const value = e?.target?.value;

      setCloneValue({ ...cloneValue, [name]: value });
    },
    [cloneValue]
  );
  const onSubmit = (e) => {
    e.preventDefault();

    onSubmitForm(cloneValue);
  };

  return (
    <EditContainerModal {...{ onCancel, onSubmit, visible }}>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          name={"fullName"}
          label={"Full Name"}
          placeholder={`Enter Full Name...`}
          value={cloneValue?.fullName}
          onChange={onUpdateCloneData}
          variant="outlined"
          focused
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          name={"status"}
          label={"Status"}
          placeholder={`Enter name...`}
          value={cloneValue?.state}
          onChange={onUpdateCloneData}
          variant="outlined"
          focused
        />
      </Box>
    </EditContainerModal>
  );
}
