import React from "react";
import BlogAPI from "../api/blog.api";
import CommentAPI from "../api/comment.api";
import { useLoading } from "./index";

export function useComment() {
  const [commentList, setCommentList] = React.useState([]);
  const [commentDetail, setCommentDetail] = React.useState([]);
  const [blogDetail, setBlogDetail] = React.useState({});
  const [totalComment, setTotalComment] = React.useState(0);
  const { loading, onSetLoading } = useLoading(["comment"]);

  const onUpdateComment = React.useCallback((id, body) => {
    return BlogAPI.instance.update(id, body).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setCommentDetail(data);
      }
    });
  }, []);
  const onCreateCommentDetail = (data) => {
    return CommentAPI.instance.create(data).then((res) => {
      if (res) {
        setCommentDetail(res?.data?.data);
      }
    });
  };

  const setCommentLoading = (state) => {
    onSetLoading("comment", state);
  };
  const onBatchUpdateCommentList = async ({ ids, state }) => {
    if (ids.length) {
      setCommentLoading(true);

      const query = new URLSearchParams();

      query.append("ids", ids);
      const search = query.toString();

      return await CommentAPI.instance
        .batchUpdate(search, { state, ids })
        .then((res) => {
          if (res) {
            onGetCommentList();
          }
        });
    }
  };
  const onGetBlogDetail = React.useCallback(async (id) => {
    return await BlogAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setBlogDetail(data);
      }
    });
  }, []);

  const onCreateBlogDetail = React.useCallback(async (body) => {
    return await BlogAPI.instance.create(body);
  }, []);
  const onGetCommentDetail = React.useCallback(async (id) => {
    return await BlogAPI.instance.get(id).then((res) => {
      const data = res?.data?.data;

      setCommentDetail(data);
    });
  }, []);

  const onGetCommentList = React.useCallback(async (query) => {
    const data = await CommentAPI.instance.getList(query).then((res) => {
      const { data } = res?.data ?? [];

      setCommentList(data ?? []);
      setTotalComment(data?.total ?? 0);

      return data;
    });

    return data;
  }, []);

  const onUpvoteComment = React.useCallback(
    async (commentId, authorId) => {
      const res = await CommentAPI.instance
        .patchUpvoteComment(commentId, authorId)
        .then((res) => {
          const { blogId } = res?.data?.data;

          onGetCommentList({ params: { blogId } });
          return res?.data;
        });

      const { data } = res;
      return data;
    },
    [onGetCommentList]
  );

  const onDownvoteComment = React.useCallback(
    async (commentId, authorId) => {
      const res = await CommentAPI.instance
        .patchDownvoteComment(commentId, authorId)
        .then((res) => {
          const { blogId } = res?.data?.data;

          onGetCommentList({ params: { blogId } });
          return res?.data;
        });
      const { data } = res;

      return data;
    },
    [onGetCommentList]
  );

  const onGetAnotherBlogList = React.useCallback(
    async (query) => {
      onSetLoading("comment");

      const data = BlogAPI.instance.getRandom().then((res) => {
        const { data } = res?.data ?? [];

        setCommentList(data);

        return data;
      });

      return data;
    },
    [onSetLoading]
  );

  const onDeleteCommentList = React.useCallback(
    async (ids) => {
      setCommentLoading(true);

      return await CommentAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onGetCommentList();
          }
        });
    },
    [onGetCommentList]
  );

  return {
    loading,
    commentList,
    totalComment,
    commentDetail,
    onUpdateComment,
    setCommentDetail,
    onGetCommentDetail,
    onGetBlogDetail,
    onGetCommentList,
    onGetAnotherBlogList,
    onCreateBlogDetail,
    onUpvoteComment,
    onDownvoteComment,
    onCreateCommentDetail,
    onBatchUpdateCommentList,
    onDeleteCommentList,
  };
}
