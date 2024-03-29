/**
 * Table content will render into page
 *
 *
 * 1. Trigger to id of content
 * 2. When scroll in h1 is scroll > 50% board
 * 3. Detect on screen 30 < screenHeight < 50
 */

import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import i18n from "./../i18n";

const defaultRange = 200;
const defaultTargetHeight = 60;
const isInScroll = (
  clientHeight,
  scrollTop,
  targetHeight,
  range,
  isStart,
  isEnd
) => {
  const minScrollHeight = scrollTop - range;
  const maxScrollHeight = scrollTop + range;
  const absoluteTargetHeight = clientHeight - targetHeight;

  return (
    minScrollHeight < absoluteTargetHeight &&
    absoluteTargetHeight < maxScrollHeight
  );
};
const detectScrollFromItems = (items, scrollTop, targetHeight, range) => {
  const detectTo = items?.find((item, index) =>
    isInScroll(
      item?.clientHeight,
      scrollTop,
      targetHeight ?? defaultTargetHeight,
      range,
      index === 0,
      index === items?.length - 1
    )
  );

  return detectTo;
};
const preDefaultScrollId = "scroll-blog-";
const scrollId = (id) => {
  return `${preDefaultScrollId}-${id}`;
};
const defaultColor = "#83c6d2";

export default function TableContent(props) {
  const { t } = i18n;
  const { detail } = props;
  const [detectId, setDetectId] = React.useState("");
  const [itemList, setItemList] = React.useState([]);
  const onDetectHeaderList = React.useCallback(() => {
    const h1List = document.querySelectorAll("h1");
    const h2List = document.querySelectorAll("h2");
    const h3List = document.querySelectorAll("h3");
    const h4List = document.querySelectorAll("h4");
    const h5List = document.querySelectorAll("h5");
    const h6List = document.querySelectorAll("h6");

    const headerList = [
      ...Object.values(h1List),
      ...Object.values(h2List),
      ...Object.values(h3List),
      ...Object.values(h4List),
      ...Object.values(h5List),
      ...Object.values(h6List),
    ];

    if (headerList?.length) {
      const newItemList = Object.values(headerList)?.map((item, id) => {
        const itemBoundary = item.getBoundingClientRect();
        const { top } = itemBoundary;
        const sid = scrollId(id);
        const tag = item.tagName;
        const tagSize = Number(tag?.replace("H", ""));

        if (!item?.id) {
          item.id = sid;
        }

        return {
          clientHeight: top,
          id: item?.id ?? sid,
          content: item?.innerText,
          paddingLeft: tagSize * 2,
        };
      });

      setItemList(newItemList);
    }
  }, []);

  const onDetectScrollItem = React.useCallback(() => {
    const { scrollTop } = document.documentElement;
    const scrollItem = detectScrollFromItems(
      itemList,
      scrollTop,
      defaultTargetHeight,
      defaultRange
    );

    setDetectId(scrollItem?.id);
  }, [itemList]);

  React.useEffect(() => {
    onDetectHeaderList();
    document.documentElement.scroll({ top: 0 });
  }, [detail?.id, onDetectHeaderList]);

  React.useEffect(() => {
    window.addEventListener("scroll", (e) => {
      onDetectScrollItem();
    });

    return window.removeEventListener("scroll", () => {
      console.log("remove is called");
    });
  }, [onDetectScrollItem, detail]);
  const getSelectedStyle = React.useCallback(
    (id) => {
      const defaultStyle = {
        fontStyle: "0.7rem",
        padding: 0.5,
        paddingLeft: 2,
      };

      if (id === detectId) {
        return {
          ...defaultStyle,
          color: "#83c6d2",
          cursor: "pointer",
          borderLeft: `solid ${defaultColor} 2px`,
        };
      }

      return {
        ...defaultStyle,
        cursor: "pointer",
      };
    },
    [detectId]
  );
  const onNavigateToHeader = React.useCallback((e) => {
    const sid = e?.target?.id;
    const elementId = "#" + sid;
    const scrollElement = document.querySelector(elementId);

    if (scrollElement) {
      const top = scrollElement.offsetTop - defaultTargetHeight;

      document.documentElement.scrollTo({ top });
      setDetectId(sid);
    }
  }, []);
  return (
    <Box
      sx={{
        top: 100,
        maxWidth: 250,
        overflow: "auto",
        height: "80vh",
        marginLeft: 3,
        position: "fixed",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {t("pages.blog.tableContent")}
      </Typography>
      <List
        sx={{
          bgcolor: "background.paper",
          fontSize: "0.9rem",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {itemList.map(
          (item) =>
            item && (
              <ListItem
                id={item?.id}
                key={`item--${item?.id}`}
                sx={{
                  ...getSelectedStyle(item?.id),
                }}
                onClick={() => onNavigateToHeader({ target: { id: item?.id } })}
              >
                <ListItemText
                  sx={{ pl: item?.paddingLeft, fonWeight: "0.6rem" }}
                  primary={item?.content}
                />
              </ListItem>
            )
        )}
      </List>
    </Box>
  );
}
