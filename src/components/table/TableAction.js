import {
  Add,
  Cached,
  Delete,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { SAMPLE_MODEL } from "../../data/model";
import i18n from "../../i18n";
import EditModal from "../modal/EditModal";
import styled from "@emotion/styled";

const LabelInput = styled("p")({
  fontWeight: 600,
  marginBottom: 2,
  marginTop: 4,
});

const TableActionContainer = styled("div")(() => ({
  position: "sticky",
  top: 60,
  backgroundColor: "white",
  lineHeight: 3,
  zIndex: 1,
}));

export default function TableAction({
  onHide,
  onShow,
  modelName,
  onCreate,
  onDelete,
  onSync,
}) {
  const [visibleModal, setVisibleModal] = React.useState(0);
  const [modelValue, setModelValue] = React.useState(SAMPLE_MODEL[modelName]);
  const { t } = i18n;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onShowModal = () => setVisibleModal(1);
  const onHideModal = () => setVisibleModal(0);
  const onAddModal = React.useCallback(
    (data) => {
      onCreate(data).finally(() => {
        onHideModal();
      });
    },
    [modelValue, onCreate]
  );
  const onSubmitModal = React.useCallback((e) => {
    onAddModal(e);
  }, []);
  const actionList = React.useMemo(
    () => [
      {
        type: "delete",
        icon: <Delete sx={{ color: "red" }} />,
        onClick: onDelete,
      },
      {
        type: "hide",
        icon: <VisibilityOff color="primary" sx={{ color: "orange" }} />,
        onClick: onHide,
      },
      {
        type: "show",
        icon: <Visibility color="primary" />,
        onClick: onShow,
      },
      {
        type: "sync",
        icon: <Cached />,
        onClick: () => onSync(),
      },
      {
        type: "add",
        icon: <Add />,
        onClick: onShowModal,
      },
    ],
    [onHide, onShow, onShowModal, onDelete, onSync]
  );

  const { handleSubmit, register } = useForm();
  const defaultModel = SAMPLE_MODEL[modelName];
  const fieldName = Object.keys(defaultModel);

  return (
    <>
      <EditModal
        {...{
          onCancel: onHideModal,
          visible: visibleModal,
          title: `${t("common.ui.addModal")} ${t(`common.ui.${modelName}`)}`,
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmitModal)}>
          {fieldName.map((name) => (
            <FormControl key={name} sx={{ padding: 1 }}>
              <LabelInput>{t(`common.ui.${name}`)}</LabelInput>
              <TextField
                multiline
                {...register(name)}
                defaultValue={defaultModel[name]}
                placeholder={`Enter ${name}...`}
                fullWidth
              ></TextField>
            </FormControl>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <Button>{t("common.ui.cancel")}</Button>
            <Button variant="contained" type="submit" color="primary">
              {t("common.ui.submit")}
            </Button>
          </Box>
        </Box>
      </EditModal>
      <TableActionContainer>
        {actionList?.map((item) => (
          <Tooltip title={item?.type}>
            <IconButton key={item?.type} onClick={item?.onClick}>
              {item?.icon}
            </IconButton>
          </Tooltip>
        ))}
      </TableActionContainer>
    </>
  );
}
