import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import BaseList from "../BaseList";
import Link from "next/link";
import i18n from "../../../../../../../i18n";

export default function CommentList({ comments }) {
  const [dense] = React.useState(false);
  const onShow = () => {
    console.log("show");
  };
  const onHide = () => {
    console.log("show");
  };

  const [searchContent, setSearchContent] = React.useState("");
  const onSearch = (e) => {
    setSearchContent(e.target.value);
  };

  const displayList = React.useMemo(() => {
    if (!searchContent) {
      return comments;
    }

    return comments?.filter((comment) => {
      const content = String(comment?.content).toLocaleLowerCase();
      const searchText = String(searchContent).toLocaleLowerCase();

      return content.includes(searchText);
    });
  }, [comments, searchContent]);
  const { t } = i18n;
  return (
    <BaseList
      title={t("pages.profile.commentHeader")}
      onSearch={onSearch}
      searchFieldName={"title"}
    >
      <List dense={dense}>
        {(displayList ?? []).map(
          (item) =>
            item && (
              <ListItem
                key={item?.id}
                secondaryAction={
                  <Box>
                    <IconButton
                      id={item?.id}
                      edge="end"
                      aria-label="show"
                      onClick={onShow}
                    >
                      <Visibility color="primary" />
                    </IconButton>
                    <IconButton
                      id={item?.id}
                      edge="end"
                      aria-label="off"
                      onClick={onHide}
                    >
                      <VisibilityOff color="warning" />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Link
                      href={`/blog/${item?.blogId?.slug}#${item?.id}`}
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.content }}
                      ></div>
                    </Link>
                  }
                />
              </ListItem>
            )
        )}
      </List>
    </BaseList>
  );
}
