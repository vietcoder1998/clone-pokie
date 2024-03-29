import styled from "@emotion/styled";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import BlogItemHeader from "./BlogItemHeader";

const BlogItemContainer = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: 60,
  display: "flex",
  justifyContent: "center",
}));

export default React.memo(function BlogItemWithOptions({
  item = {
    options: [],
    disable: true,
  },
  index = 0,
}) {
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);
  const { options = [] } = item;
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickListItem = (e) => {
    setAnchorEl(e.target);
  };

  const onResetHeader = () => {
    setAnchorEl(null);
  };

  return (
    <BlogItemContainer>
      <BlogItemHeader
        {...{ item: { ...item, onClick: handleClickListItem }, index }}
      />
      <Menu
        open={open}
        timeout="auto"
        unmountOnExit
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        {options?.map((item, itemIndex) => (
          <MenuItem
            key={["header_options", itemIndex].join("_")}
            sx={{
              border: 0,
              padding: 0,
            }}
          >
            <BlogItemHeader
              {...{
                item: {
                  ...item,
                  onClick: () => {
                    onResetHeader();
                  },
                },
                itemIndex,
                style: { padding: "0 10px" },
              }}
            ></BlogItemHeader>
          </MenuItem>
        ))}
      </Menu>
    </BlogItemContainer>
  );
});
