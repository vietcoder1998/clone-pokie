import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useParams } from "next/navigation";
import BlogAPI from "../../api/blog.api";
import UploadImage from "../../components/ui/UploadImage";
import RickText from "../../lib/rich-text/index";
import { useBlog, useTag } from "../../store/useBlog";
import TagDisplay from "./components/TagDisplay";
import { useRouter } from "next/router";
import RichTextData from "../../lib/rich-text/actions/richtext";
import i18n from "../../i18n";

export default function BlogEdit(props) {
  const {
    blogList,
    blogDetail,
    onGetBlogList,
    onGetTagList,
    onGetBlogDetailWithSlug,
    setBlogDetail,
    onCreateBlogDetail,
  } = useBlog();
  const { tagList } = useTag({});
  const params = useParams();
  const { slug } = params;
  const [tagBlogList, setTagBlogList] = React.useState([]);
  const [content, setContent] = React.useState("");
  const { t } = i18n;

  React.useEffect(() => {
    if (slug) {
      onGetBlogDetailWithSlug(slug);
    }

    onGetTagList();
  }, [onGetBlogDetailWithSlug, onGetBlogList, onGetTagList, slug]);

  React.useEffect(() => {
    if (blogDetail) {
      setContent(blogDetail?.content);
      setTagBlogList(blogDetail?.tags ?? []);
    }
  }, [blogDetail, blogDetail?.content, blogList]);

  // update list of tag with blog detail
  const navigate = useRouter();
  const onUpdateBlog = React.useCallback(() => {
    const content = new RichTextData("editor").getData();
    console.log('test', content)
    if (slug) {
      console.log(content, new RichTextData('editor'))
      const body = { ...blogDetail, tags: tagBlogList, content };

      return BlogAPI.instance.update(blogDetail?.id, body).finally(() => {
        window.history.back();
      });
    } else {
      const body = { ...blogDetail, tags: tagBlogList, content };

      return onCreateBlogDetail(body).then((response) => {
        if (response?.data?.data) {
          navigate.push(`/blog/${response?.data?.data?.slug}`);
        }
      });
    }
  }, [slug, blogDetail, tagBlogList, content, onCreateBlogDetail, navigate]);
  const onChangeBlogTitle = React.useCallback(
    (e) => {
      const title = e?.target?.value;

      setBlogDetail({ ...blogDetail, title });
    },
    [blogDetail, setBlogDetail]
  );

  const onChangeBlogShortContent = React.useCallback(
    (e) => {
      const shortContent = e?.target?.value;

      setBlogDetail({ ...blogDetail, shortContent });
    },
    [blogDetail, setBlogDetail]
  );

  const onChangeBlogSlug = React.useCallback(
    (e) => {
      const slug = e?.target?.value;

      setBlogDetail({ ...blogDetail, slug });
    },
    [blogDetail, setBlogDetail]
  );

  const onChangeBlogSeo = React.useCallback(
    (e) => {
      const seo = e?.target?.value;

      setBlogDetail({ ...blogDetail, seo: seo.split(",") });
    },
    [blogDetail, setBlogDetail]
  );

  const onSetCoverUrl = React.useCallback(
    ({ url }) => {
      setBlogDetail({ ...blogDetail, coverUrl: url });
    },
    [blogDetail, setBlogDetail]
  );

  return (
    <Box>
      <TextField
        id="standard-textarea"
        label="Title"
        focused
        multiline
        variant="standard"
        value={blogDetail?.title}
        onChange={onChangeBlogTitle}
        placeholder="Blog title"
        fullWidth
        sx={{ mb: 4 }}
      />
      <TextField
        id="standard-textarea"
        label="Short Content"
        fullWidth
        variant="outlined"
        value={blogDetail?.shortContent}
        rows={3}
        onChange={onChangeBlogShortContent}
        placeholder="Short content..."
        sx={{ mb: 4 }}
        focused
      />
      <TextField
        id="standard-textarea"
        fullWidth
        label="Slug"
        multiline
        variant="outlined"
        value={blogDetail?.slug}
        rows={1}
        onChange={onChangeBlogSlug}
        placeholder="Short content..."
        sx={{ mb: 4 }}
        focused
      />
      <TextField
        id="standard-textarea"
        fullWidth
        label="seo"
        multiline
        variant="outlined"
        value={blogDetail?.seo?.join(",")}
        rows={1}
        onChange={onChangeBlogSeo}
        placeholder="Add SEO tag..."
        sx={{ mb: 4 }}
        focused
      />
      <TagDisplay {...{ tagList, tagBlogList, setTagBlogList, t }} />
      <Box sx={{ py: 2 }}>
        <RickText
          data={blogDetail?.content}
          onEditorChange={(newContent) => setContent(newContent)}
        ></RickText>
      </Box>
      <Box sx={{}}>
        <Typography component="b">
          <b>Cập nhật ảnh bìa</b>
        </Typography>
        <UploadImage
          onUploadImage={onSetCoverUrl}
          defaultUrl={blogDetail?.coverUrl}
        />
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={onUpdateBlog}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
