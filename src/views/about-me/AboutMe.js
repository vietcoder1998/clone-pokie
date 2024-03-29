import { Box, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import LazyLoad from "react-lazyload";
import { CommentContainer } from "../../components/ui/comments/Container";
import SameBlog from "../../components/ui/same-blog/SameBlog";
import { CommonColor, UserRole } from "../../config/const";
import CookieHelper from "../../helpers/cookie/cookie.helpers";
import TableContent from "../../lib/TableContent";
import { useBlog } from "../../store/useBlog";
import i18n from "../../i18n";

export default function AboutMe(props) {
  const { slug } = { slug: "about-me" };
  const {
    onGetBlogDetailWithSlug,
    blogDetail,
    anotherBlogList,
    onGetAnotherBlogList,
  } = useBlog();
  const { t } = i18n;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    onGetBlogDetailWithSlug(slug);
    onGetAnotherBlogList(slug);
  }, [slug, onGetBlogDetailWithSlug, onGetAnotherBlogList]);

  const userInfo = CookieHelper.instance.getUserInfoCookie();
  const { role } = userInfo;
  const HeaderUI = React.useMemo(() => {
    if (role === UserRole.admin) {
      return (
        <Link href={`/blog/${blogDetail?.slug}/edit`}>{blogDetail?.title}</Link>
      );
    }

    return blogDetail.title;
  }, [blogDetail, role]);

  const TitleUI = (
    <Box
      component={"h2"}
      className="mt-10"
      sx={{
        background: CommonColor.white,
        display: "flex",
        py: 2,
        top: 0,
        fontStyle: "bold",
        borderBottom: `solid ${CommonColor.border} 1px`,
        borderTop: `solid ${CommonColor.border} 1px`,
        mb: 2,
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontStyle: "bold",
          fontSize: "1.4rem",
          backgroundColor: "white",
        }}
      >
        {HeaderUI}
      </Typography>
    </Box>
  );

  const NoContentMatch = () => {
    return <>{t("common.ui.noContentMatch")}</>;
  };

  return (
    <Grid container>
      <Grid md={9} item>
        <LazyLoad>
          {blogDetail?.content ? (
            <Box
              component="div"
              sx={{ minHeight: "50vh", mb: 2 }}
              dangerouslySetInnerHTML={{
                __html: blogDetail?.content
              }}
            ></Box>
          ) : (
            <NoContentMatch />
          )}
        </LazyLoad>
        <Divider></Divider>
        <SameBlog anotherBlogList={anotherBlogList}></SameBlog>
        <CommentContainer blog={blogDetail} {...props}></CommentContainer>
      </Grid>
      <Grid md={3} item>
        <TableContent {...{ blogDetail }} {...props}></TableContent>
      </Grid>
    </Grid>
  );
}
