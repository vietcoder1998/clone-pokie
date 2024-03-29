import { useRouter } from "next/router";
import React from "react";
import { CommonColor } from "../../../../../config/const";
import styled from "@emotion/styled";

const BlogItemHeaderContainer = styled("div")(() => ({
  height: 60,
  alignItems: "center",
  fontWeight: `200!important`,
  padding: `0 20px`,
  width: "100%",
  cursor: "pointer",
  overflow: "hidden",
  textOverFlow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#111111",
  display: "flex",
  justifyContent: "center",
  fontSize: "0.8rem",
  "&:hover": {
    color: CommonColor.linkColor,
    borderBottom: `1px solid ${CommonColor.linkColor}`
  },
  fontWeight: 600,
  textTransform: "capitalize",
}));

export default React.memo(function BlogItemHeader({
  item = {
    disableClick: false,
    style: {},
    link: "",
    onClick: () => {
      return;
    },
  },
  index = 0,
}) {
  const navigate = useRouter();
  const onClickItem = item?.onClick ?? undefined;
  const onClickHeaderItem = React.useCallback(
    (e) => {
      if (item?.link) {
        navigate.push(item?.link);
      }

      if (onClickItem) {
        onClickItem(e);
      }
    },
    [item?.link, onClickItem]
  );

  const ViewRender = React.useMemo(() => {
    if (item?.render) {
      return item.render;
    }

    return item.content;
  }, [item?.render, item?.content]);

  return (
    <BlogItemHeaderContainer
      id={[index, "link", item?.style ? "menu_item" : "container_item"].join(
        "_"
      )}
      key={[index, "link"].join("")}
      style={{
        ...item?.style,
      }}
      color="inherit"
      onClick={onClickHeaderItem}
    >
      {ViewRender}
    </BlogItemHeaderContainer>
  );
});
