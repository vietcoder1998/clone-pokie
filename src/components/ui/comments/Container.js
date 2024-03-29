import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import CookieHelper from "../../../helpers/cookie/cookie.helpers";
import { useComment } from "../../../store//useComment";
import ListUI from "../../ListUI";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";

export function CommentContainer(props) {
  const { blog, t } = props;
  const { commentList, onGetCommentList, totalComment } = useComment();
  const blogId = blog.id;
  const userInfo = CookieHelper.instance.getUserInfoCookie();

  React.useEffect(() => {
    if (blogId) {
      onGetCommentList({ params: { blogId } });
    }
  }, [blogId, onGetCommentList]);

  return (
    <Box className={"mt-10"}>
      <Typography sx={{ fontWight: 500, mb: 1, fontSize: "1.2rem" }}>
        <b>
          {t("pages.blog.comment")} (
          {String(totalComment === 0 ? "0" : totalComment)})
        </b>
      </Typography>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "sticky",
          backgroundColor: "white",
          top: 68,
          mb: 2,
        }}
      >
        <AuthenticateButton {...props} />
      </Box> */}
      <Divider sx={{ mb: 2 }}></Divider>
      <ListUI hide={!commentList || !commentList?.length}>
        {commentList?.map((comment) => (
          <Comment
            {...props}
            {...comment}
            blogId={blog?.id}
            id={comment.id}
            replyId={null}
            key={comment?.id}
            onGetCommentList={onGetCommentList}
          ></Comment>
        ))}
      </ListUI>
      <ReplyComment
        {...props}
        userInfo={userInfo}
        isNextComment={true}
        commentId={null}
        blogId={blog?.id}
        onGetCommentList={onGetCommentList}
        treePosition={0}
      ></ReplyComment>
    </Box>
  );
}
