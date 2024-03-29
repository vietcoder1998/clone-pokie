import styled from "@emotion/styled";
import ReplyIcon from "@mui/icons-material/Reply";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CommentAPI from "../../../api/comment.api";
import i18n from "../../../i18n";
import RichText from "../../../lib/rich-text";
import BaseModal from "../../BaseModal";
import ButtonGoogleLogin from "../../layouts/authenticate/components/ButtonGoogleLogin";
import { useRouter } from "next/router";

const CommentSubmitButtonContainer = styled("div")(() => ({
  fontSize: "0.6rem",
  marginTop: 4,
}));

export default function ReplyComment({
  blogId,
  replyId,
  onGetCommentList,
  isVisibleReply,
  isNextComment = false,
  userInfo,
  onRefreshUserInfo,
}) {
  const [content, setContent] = React.useState("");
  const onSubmitResponse = React.useCallback(() => {
    return CommentAPI.instance
      .create({
        content,
        blogId,
        replyId,
      })
      .then(() => onGetCommentList({ params: { blogId } }))
      .finally(() => {
        setContent("");
        setIsShowComment(false);
      });
  }, [content, blogId, replyId, onGetCommentList]);
  const [isShowComment, setIsShowComment] = React.useState(false);

  React.useEffect(() => {
    setIsShowComment(isVisibleReply);
  }, [isVisibleReply]);

  const onChangeContent = (content) => {
    setContent(content);
  };

  const { t } = i18n;
  const EditView = React.useMemo(() => {
    if (!userInfo) {
      return (
        <BaseModal
          visible={true}
          action={
            <Box sx={{ gap: 1 }}>
              <Button>{t("common.ui.cancel")}</Button>
              <ButtonGoogleLogin {...{ onRefreshUserInfo }} />
            </Box>
          }
        ></BaseModal>
      );
    }

    return (
      <Box className={"mt-1"} sx={{ width: "100%" }}>
        <Box
          id="filled-multiline-static"
          label="Reply"
          rows={4}
          value={content}
          onChange={onChangeContent}
          variant="outlined"
          sx={{
            width: "-webkit-fill-available",
            height: "25vh",
            mb: 2,
          }}
        >
          <RichText onEditorChange={onChangeContent}></RichText>
        </Box>
        <Box className={"flex justify-end mt-2"} sx={{ display: "flex" }}>
          <Button onClick={() => setIsShowComment(false)}>Cancel</Button>
          <Button
            color="primary"
            variant="contained"
            className={"mt-10"}
            onClick={onSubmitResponse}
          >
            {t("common.ui.sendMessage")}
          </Button>
        </Box>
      </Box>
    );
  }, [content, onRefreshUserInfo, onSubmitResponse, userInfo]);
  const onUpdateIsViewComment = React.useCallback(() => {
    const newState = !isShowComment;

    setIsShowComment(newState);
  }, [isShowComment]);
  const router = useRouter();
  const navigateToLogin = () => {
    router.push("/login");
  };
  const ClickToView = React.useMemo(
    () =>
      !userInfo?.id ? (
        <Button onClick={navigateToLogin}>{t("common.ui.clickToLogin")}</Button>
      ) : (
        <Button onClick={onUpdateIsViewComment}>
          <ReplyIcon sx={{ mb: 1, mr: 1 }} />
          {t("common.ui.replyTo")}
        </Button>
      ),
    [onUpdateIsViewComment, userInfo?.id]
  );

  if (!isNextComment) {
    return "";
  }

  return (
    <CommentSubmitButtonContainer>
      {isShowComment ? EditView : ClickToView}
    </CommentSubmitButtonContainer>
  );
}
