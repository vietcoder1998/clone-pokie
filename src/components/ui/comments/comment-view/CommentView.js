import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { CommonColor } from "../../../../config/const";
import { formatDateTime } from "../../../../helpers/date";
import { useComment } from "../../../../store//useComment";
import ListUI from "../../../ListUI";
import ReplyComment from "../ReplyComment";
import BlogAuthorUI from "./components/BlogAuthorUI";
import CommentAction from "./components/CommentAction";
import ContentDisplayAuthorName from "./components/ContentDisplayAuthorName";
import UserInfoMenu from "./components/UserInfoMenu";

const LineThrow = () => (
  <Box
    style={{
      borderRight: `solid ${CommonColor.border} 2px`,
      position: "absolute",
      left: "50%",
      top: 50,
      height: "calc(100% - 80px)",
    }}
  ></Box>
);

function CommentContentUI({ commentDetail }) {
  return (
    <Box>
      <Typography component={"span"} fontSize={12}>
        {formatDateTime(commentDetail?.createdAt)}
      </Typography>
      <Box
        sx={{
          fontSize: "1rem",
          fontWeight: 300,
        }}
        dangerouslySetInnerHTML={{ __html: commentDetail?.content }}
      ></Box>
    </Box>
  );
}

function ReplyListUI({
  children,
  id,
  commentDetail,
  onUpvoteComment,
  onDownvoteComment,
}) {
  return (
    <ListUI hide={!children?.length} noneComponent={<></>}>
      {children?.length &&
        children.map((child, index) => (
          <CommentView
            isVisibleReply={true}
            isNextComment={false}
            isChild={true}
            key={`comment-${child.id}-${index}`}
            {...child}
            id={child.id}
            replyId={id}
            blogId={commentDetail?.blogId}
            onUpvoteComment={onUpvoteComment}
            onDownvoteComment={onDownvoteComment}
          ></CommentView>
        ))}
    </ListUI>
  );
}

const CommentMessageContainer = styled("div")(() => ({}));
const CommentViewContainer = styled("div")(() => ({
  listStyleType: "none",
  mb: 1,
  display: "flex",
  gap: 2,
  mt: 1,
  width: "-webkit-fill-available",
}));

const CommentAvatarContainer = styled("div")(() => ({
  position: "relative",
}));
const CommentContentContainer = styled("div")(() => ({
  width: "-webkit-fill-available",
}));

export default function CommentView(props) {
  const { onGetCommentList, isChild } = props;
  const [commentDetail, setCommentDetail] = React.useState(
    props ?? {
      id: "",
      children: [],
    }
  );
  const { onUpvoteComment, onDownvoteComment } = useComment();
  const [isVisibleReply] = React.useState(false);
  const commentId = commentDetail?.id;
  const onUpvoteCommentDetail = React.useCallback(
    async (commentId) => {
      const data = await onUpvoteComment(commentId);

      setCommentDetail({ ...data, replies: props?.replies });
    },
    [onUpvoteComment, props?.replies]
  );
  const onDownvoteCommentDetail = React.useCallback(
    async (commentId) => {
      const data = await onDownvoteComment(commentId);

      setCommentDetail({ ...data, replies: props?.replies });
    },
    [onDownvoteComment, props?.replies]
  );
  const actions = React.useMemo(
    () => [
      {
        color: "#1976d2",
        icon: <ThumbUp sx={{ color: "#1976d2" }} />,
        quantity: commentDetail?.upvote?.length,
        onClick: () => onUpvoteCommentDetail(commentId),
      },
      {
        color: "red",
        icon: <ThumbDown sx={{ color: "red" }} />,
        quantity: commentDetail?.downvote?.length,
        onClick: () => onDownvoteCommentDetail(commentId),
      },
    ],
    [commentDetail, commentId, onUpvoteCommentDetail, onDownvoteCommentDetail]
  );

  return (
    <CommentViewContainer id={commentDetail?.id}>
      <CommentAvatarContainer>
        <UserInfoMenu
          {...{
            avatarUrl: commentDetail?.author?.avatarUrl,
            fullName: commentDetail?.author?.fullName,
            profileId: commentDetail?.author?._id,
            email: commentDetail?.author?.email,
          }}
        >
          <BlogAuthorUI {...{ commentDetail }} />
        </UserInfoMenu>
        <LineThrow />
      </CommentAvatarContainer>
      <CommentContentContainer className={"messageContent"}>
        <CommentMessageContainer>
          <ContentDisplayAuthorName {...{ commentDetail }} />
          <CommentContentUI {...{ commentDetail }} />
          <CommentAction {...{ actions }} />
        </CommentMessageContainer>
        <ReplyListUI
          {...{
            onUpvoteComment,
            onDownvoteComment,
            id: props?.id,
            children: props?.children,
            commentDetail,
          }}
        />
        <ReplyComment
          {...props}
          replyId={props?.id}
          blogId={commentDetail?.blogId}
          isNextComment={!isChild}
          isVisibleReply={isVisibleReply}
          onGetCommentList={onGetCommentList}
        />
      </CommentContentContainer>
    </CommentViewContainer>
  );
}
