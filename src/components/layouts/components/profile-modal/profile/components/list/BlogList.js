import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import * as React from "react";
import BaseList from "../BaseList";

export default function BlogList({ blogs }) {
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
      return blogs;
    }

    return blogs?.filter((comment) => {
      const content = String(comment?.title).toLocaleLowerCase();
      const searchText = String(searchContent).toLocaleLowerCase();

      return content.includes(searchText);
    });
  }, [blogs, searchContent]);

  return (
    <BaseList title="Danh sách bài đăng" onSearch={onSearch}>
      <List>
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
                <ListItemAvatar>
                  <Link href={`/blog/${item?.slug}`}>
                    <Image
                      src={item?.coverUrl}
                      style={{border: 'solid gray 1px'}}
                      width={100}
                      height={50}
                      alt={item?.title}
                    />
                  </Link>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ pl: 1 }}>
                      <Link href={`/blog/${item?.slug}`}>{item?.title}</Link>
                      <Box sx={{ fontSize: "0.8rem" }}>
                        {item?.shortContent}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            )
        )}
      </List>
    </BaseList>
  );
}
