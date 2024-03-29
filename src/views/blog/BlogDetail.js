import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Avatar, Box, Divider, Grid } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import BlogLink from "../../components/BLogLink";
import SharingList from "../../components/SocialShare";
import ImageModal from "../../components/modal/ImageModal";
import NoContent from "../../components/ui/NoContentMatch";
import { CommentContainer } from "../../components/ui/comments/Container";
import CookieHelper from "../../helpers/cookie/cookie.helpers";
import i18n from "../../i18n/index";
import TableContent from "../../lib/TableContent";
import { useBlog } from "../../store/useBlog";
import CommonHeader from "../common/Header";
import SameBlog from "./../../components/ui/same-blog/SameBlog";
import { CommonColor, UserRole } from "./../../config/const";
import TagDisplay from "./components/TagDisplay";

const BackToIconP = styled("div")(() => ({
  marginTop: 20,
  display: "flex",
  fontSize: "0.8rem",
  marginBottom: 10,
  gap: 10,
}));
const DisplayCoverUrl = ({ coverUrl }) => {
  return coverUrl ? (
    <Box
      sx={{
        width: "100%",
        minHeight: "25vh",
        borderRadius: 2,
        overflow: "hidden",
        border: `solid ${CommonColor.border} 1px`,
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
        }}
        src={coverUrl}
        alt="cover-url"
      />
    </Box>
  ) : (
    ""
  );
};

export default function BlogDetail(props) {
  const { t } = i18n;
  const params = useParams();
  const slug = props?.slug ?? params?.slug;
  const {
    onGetBlogDetailWithSlug,
    blogDetail,
    anotherBlogList,
    onGetAnotherBlogList,
  } = useBlog();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (slug) {
      onGetBlogDetailWithSlug(slug);
      onGetAnotherBlogList(slug);
    }
  }, [slug, onGetBlogDetailWithSlug, onGetAnotherBlogList]);

  const userInfo = CookieHelper.instance.getUserInfoCookie();
  const { role } = userInfo;
  const HeaderUI = React.useMemo(() => {
    if (String(role) === UserRole.admin) {
      return (
        <Box sx={{ mb: 4 }}>
          <BlogLink href={`/blog/edit/${blogDetail?.slug}`} size="large">
            {blogDetail?.title}
          </BlogLink>
          <Box
            sx={{
              color: "gray",
              fontSize: "0.9rem",
              display: "flex",
              gap: 2,
              mt: 2,
            }}
          >
            <Box>
              <Avatar src={blogDetail?.author?.avatarUrl} />
            </Box>
            <Box>
              <Box>{blogDetail?.author?.fullName} </Box>
              <Box>{moment(blogDetail?.createdAt).format("YYYY-MM-DD")}</Box>
            </Box>
          </Box>
        </Box>
      );
    }

    return blogDetail.title;
  }, [blogDetail, role]);
  const [tagBlogList, setTagBlogList] = React.useState([]);

  // update list of tag with blog detail
  React.useEffect(() => {
    setTagBlogList(blogDetail?.tags ?? []);
  }, [blogDetail?.tags]);

  const TitleUI = React.useMemo(
    () => (
      <Box
        component={"div"}
        className="mt-10"
        sx={{
          background: CommonColor.white,
          display: "flex",
          py: 2,
          top: 0,
          mb: 2,
          fontStyle: "bold",
        }}
      >
        <Box
          sx={{
            fontStyle: "bold",
            fontSize: "1.4rem",
            backgroundColor: "white",
          }}
        >
          {HeaderUI}
        </Box>
      </Box>
    ),
    [HeaderUI]
  );

  const BackToHomeButton = () => (
    <BackToIconP>
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          textDecoration: "none",
          height: 20,
          fontSize: "0.8rem",
          color: "gray",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "1rem" }}></ArrowBackIosIcon>
        {t("pages.blog.backToHome")}
      </Link>
    </BackToIconP>
  );

  if (props?.disablePadding) {
    return blogDetail?.content ? (
      <Box
        id={"blog-view"}
        component="div"
        sx={{ minHeight: "50vh", mb: 2 }}
        dangerouslySetInnerHTML={{
          __html: blogDetail?.content,
        }}
      ></Box>
    ) : (
      <NoContent />
    );
  }
  return (
    <>
      <CommonHeader
        {...{
          title: blogDetail?.title,
          coverImageUrl: blogDetail?.coverUrl,
          type: blogDetail?.type,
          description: blogDetail?.shortContent,
          itemLink: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogDetail?.slug}`,
          seo: blogDetail?.seo,
        }}
      />
      <Box sx={{}}>
        <ImageModal blogDetail={blogDetail} viewId="blog-view"></ImageModal>
        <Grid container>
          <Grid md={9} xs={12} item id={"blog-view"}>
            <BackToHomeButton />
            {TitleUI}
            <DisplayCoverUrl coverUrl={blogDetail?.coverUrl} />
            <Box
              id={"blog-view"}
              component="div"
              sx={{
                mb: 2,
                minHeight: "50vh",
                maxWidth: "calc(100vw - 32px)",
                overflow: "auto",
              }}
              dangerouslySetInnerHTML={{
                __html: blogDetail?.content ?? "No content",
              }}
            ></Box>
          </Grid>
          {!props?.isMobile ? (
            <Grid md={3} xs={12} item>
              <TableContent {...{ blogDetail }} {...props}></TableContent>
            </Grid>
          ) : (
            ""
          )}

          <Grid md={12}>
            <Box sx={{ mt: 2 }}>
              <Divider></Divider>
              <Box sx={{ mt: 2 }}>
                <TagDisplay
                  {...{
                    tagList: [],
                    tagBlogList,
                    setTagBlogList,
                    disableShowAllTag: true,
                    t,
                  }}
                />
              </Box>
            </Box>
            <SharingList
              {...{
                link: window.location.href,
                quote: "test",
                description: "Kiem tra lai blog",
                t,
              }}
            ></SharingList>
            <SameBlog anotherBlogList={anotherBlogList} t={t}></SameBlog>
            <CommentContainer
              blog={blogDetail}
              {...props}
              t={t}
            ></CommentContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
