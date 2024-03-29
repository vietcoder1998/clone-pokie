import { Search } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import BaseModal from "../../BaseModal";
import { MMNalData } from "../../../helpers/3th/mm.nal";
import { SideBarHandler } from "../../../helpers/sidebar";
import { useBlog } from "../../../store/useBlog";
import FormHandler from "../../../helpers/form";
import InputWithTitle from "./page-activity/InputWithTitle";
import PageSearchResult from "./page-search-result/PageSearch";
import { CommonColor } from "../../../config/const";
import i18n from "../../../i18n";

const sidebarHandler = new SideBarHandler();

export default function SearchPage(props) {
  const { t } = i18n;
  const { searchList, onSearchBlogList, blogLoading } = useBlog();
  const [visible, setVisible] = React.useState("");
  const SettingUI = React.useMemo(() => {
    return [
      {
        title: "UserID",
        gridProps: {
          marginBottom: 2,
        },
        inputProps: {
          id: "key",
          name: "user_id",
          placeholder: "user_id",
        },
        onChange: (e) => {
          MMNalData.set(e.target.name, e.target.value);
        },
      },
      {
        title: "Channel",
        gridProps: {
          marginBottom: 2,
        },
        inputProps: {
          id: "key",
          name: "channel_id",
          placeholder: "channel_id",
        },
        onChange: (e) => {
          MMNalData.set(e.target.name, e.target.value);
        },
      },
      {
        title: "Token",
        gridProps: {
          marginBottom: 2,
        },
        inputProps: {
          id: "key",
          name: "token",
          placeholder: "token",
        },
        onChange: (e) => {
          MMNalData.set(e.target.name, e.target.value);
        },
      },
    ].map((item, key) => <InputWithTitle key={key} {...item}></InputWithTitle>);
  }, []);
  const SideBarUI = () => {
    return [
      {
        title: "Name",
        gridProps: {
          marginBottom: 2,
        },
        inputProps: {
          id: "key",
          name: "name",
          defaultValue: "",
          type: "text",
        },
      },
    ].map((item, key) => <InputWithTitle key={key} {...item}></InputWithTitle>);
  };
  const ModalViewUI = React.useMemo(() => {
    switch (visible) {
      case "setting":
        return SettingUI;

      case "sidebar":
      default:
        return SideBarUI();
    }
  }, [visible, SettingUI]);
  const [textSearch, setTextSearch] = React.useState();
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      const formHandler = new FormHandler(e.target);

      sidebarHandler.add(formHandler.values.name);
      setVisible(null);
      props.onAddSideBar();
    },
    [props]
  );
  const onChangeTextSearch = React.useCallback(
    (e) => {
      const text = String(e?.target?.value);

      setTextSearch(text);
    },
    [setTextSearch]
  );

  React.useEffect(() => {
    if (textSearch) {
      onSearchBlogList({ title: textSearch });
    }
  }, [textSearch]);
  const AnotherUI = (
    <Box sx={{ display: "sticky", top: 10 }}>
      <BaseModal visible={visible} onClose={() => setVisible(null)}>
        <Box component={"h4"} sx={{ my: 2 }}>
          Setting
        </Box>
        <Box component="form" onSubmit={onSubmit}>
          {ModalViewUI}
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <Button>Cancel</Button>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </BaseModal>
    </Box>
  );

  const [isShowSearchModal, setIsShowSearchModal] = React.useState(false);
  const onCloseModal = () => {
    setIsShowSearchModal(false);
    setTextSearch("");
  };
  const onOpenModal = () => {
    setIsShowSearchModal(true);
  };

  const SearchUI = (
    <Box
      onClick={onOpenModal}
      sx={{
        textTransform: "capitalize",
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "left",
        borderRadius: 30,
        "&:hover": {
          backgroundColor: CommonColor.linkColor,
        },
        py: 1,
      }}
    >
      <Search sx={{ mr: 1, textTransform: "uppercase" }} />
      <Typography
        component="span"
        sx={{ mr: 1, textTransform: "uppercase", fontSize: "0.8rem" }}
      >
        <b>{t("common.header.search")}</b>
      </Typography>
    </Box>
  );

  return (
    <Box>
      <PageSearchResult
        {...{
          searchList: searchList ?? [],
          onCloseModal,
          onChangeTextSearch,
          isShowSearchModal,
          blogLoading,
        }}
      />
      {AnotherUI}
    </Box>
  );
}
