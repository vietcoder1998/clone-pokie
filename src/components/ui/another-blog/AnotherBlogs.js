import { Typography, Box } from "@mui/material";
import ListUI from "../../ListUI";
import { AnotherBlogItem } from "../AnotherBlogItem";

export default function AnotherBlog() {
  const blogList = [
    {
      title: "blog1",
      view: 1,
      id: 12,
      comment: 12,
      avatarUrl: "",
      link: "http://localhost:3001/blog/1",
    },
    {
      title: "blog2",
      view: 2,
      id: 12,
      comment: 12,
      avatarUrl: "",
      link: "http://localhost:3001/blog/2",
    },
    {
      title: "blog3",
      view: 3,
      id: 12,
      comment: 12,
      avatarUrl: "",
      link: "http://localhost:3001/blog/3",
    },
    {
      title: "blog4",
      view: 4,
      id: 12,
      comment: 12,
      avatarUrl: "",
      link: "http://localhost:3001/blog/4",
    },
  ];

  return (
    <Box sx={{ position: "sticky", top: "30vh", right: "0px" }}>
      <Box>
        <Typography component={"p"}>
          <b>{t('common.ui.anotherBlog1')}</b>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <ListUI hide={!blogList.length}>
            {blogList?.map((item) => (
              <AnotherBlogItem {...item} />
            ))}
          </ListUI>
        </Box>
      </Box>
    </Box>
  );
}
