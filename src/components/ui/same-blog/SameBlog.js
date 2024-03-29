import { Box, Grid, Typography } from "@mui/material";
import ListUI from "../../ListUI";
import SameBlogItem from "./SameBlogItem";

export default function SameBlog(props) {
  const { anotherBlogList, t } = props;

  return (
    <Box sx={{ my: 4 }}>
      <Box>
        <Typography component={"p"} sx={{fontSize: '1.1rem'}}>
          <b>{t("pages.blog.anotherBlog")}</b>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <ListUI hide={!anotherBlogList?.length}>
            <Grid container columnSpacing={2}>
              {anotherBlogList?.map((item, index) => (
                <Grid item md={12} key={['same_item', index].join('_')}>
                  <SameBlogItem {...item} />
                </Grid>
              ))}
            </Grid>
          </ListUI>
        </Box>
      </Box>
    </Box>
  );
}
