import React from "react";
import BlogAPI from "../api/blog.api";
import TagAPI from "../api/tag.api";

export function useTag() {
  const [tagList, setTagList] = React.useState([]);

  React.useEffect(() => {
    TagAPI.instance.getList().then((res) => {
      const { data } = res;

      setTagList(data?.data);
    });
  }, []);

  return {
    tagList,
  };
}

export function useBlog() {
  const [blogList, setBlogList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);
  const [anotherBlogList, setAnotherBlogList] = React.useState([]);
  const [blogLoading, setBlogLoading] = React.useState(false);
  const [blogDetail, setBlogDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);

  const onGetBlogDetail = React.useCallback(async (id) => {
    return await BlogAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        if (data) {
          let content = data.content;

          if (data?.isZip) {
            content = Buffer.from(data?.data, "base64").toString("utf-8");
          }

          setBlogDetail({ ...data, content });
        }
      }
    });
  }, []);
  const onGetBlogDetailWithSlug = React.useCallback(async (slug) => {
    return await BlogAPI.instance.getDetail(slug).then((res) => {
      if (res) {
        const data = res?.data?.data;

        if (data) {
          let content = data.content;

          if (data?.isZip) {
            content = Buffer.from(data?.data, "base64").toString("utf-8");
          }

          setBlogDetail({ ...data, content });
        }
      }
    });
  }, []);
  const onCreateBlogDetail = React.useCallback(async (body) => {
    return await BlogAPI.instance.create(body);
  }, []);
  const onGetBlogList = React.useCallback(async (params) => {
    setBlogLoading(true);
    const urlSearch = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (key) {
        urlSearch.set(key, value);
      }
    });

    const query = `?${urlSearch.toString()}`;
    return await BlogAPI.instance.getList({ query }).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setBlogList(data?.sort((item) => item?.position));
        setBlogLoading(false);
      }
    });
  }, []);
  const onGetBlogWithTagList = React.useCallback(async (params) => {
    setBlogLoading(true);
    const urlSearch = new URLSearchParams();
    urlSearch.append("name", params?.tags ?? []);

    const query = `?${urlSearch.toString()}`;

    return await BlogAPI.instance.filterWithTag(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setBlogList(data);
        setBlogLoading(false);
      }
    });
  }, []);
  const onBatchUpdateBlogList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setBlogLoading(true);

        const query = new URLSearchParams();
        query.append("ids", ids);
        const search = query.toString();

        return await BlogAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetBlogList();
            }
          });
      }
    },
    [onGetBlogList]
  );
  const onSearchBlogList = React.useCallback(async (params) => {
    setBlogLoading(true);
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    return await BlogAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setSearchList(data);
        setBlogLoading(false);
      }

      return res;
    });
  }, []);
  const onGetAnotherBlogList = React.useCallback(async (id) => {
    setBlogLoading(true);

    return BlogAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherBlogList(data?.splice(0, 3));
          setBlogLoading(false);
        }
      });
  }, []);
  const onGetTagList = React.useCallback(async (id) => {
    const response = await TagAPI.instance.getList().then((res) => {
      if (res) {
        const tags = response?.data?.data;
        setTagList(tags);
      }
    });
  }, []);
  const onUpdateBlog = React.useCallback((id, body) => {
    return BlogAPI.instance.update(id, body).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setBlogDetail(data);
      }
    });
  }, []);
  const onBatchDeleteBlog = React.useCallback(
    (ids) => {
      return BlogAPI.instance.batchDelete({ data: { ids } }).then((res) => {
        if (res) {
          onGetBlogList();
        }
      });
    },
    [onGetBlogList]
  );

  return {
    blogList: blogList?.sort((item, item1) => item1?.position - item?.position),
    anotherBlogList,
    blogLoading,
    blogDetail,
    tagList,
    searchList,
    onGetBlogWithTagList,
    onUpdateBlog,
    onSearchBlogList,
    onGetTagList,
    onGetBlogDetail,
    onGetBlogList,
    onGetAnotherBlogList,
    onCreateBlogDetail,
    onGetBlogDetailWithSlug,
    setBlogDetail,
    onBatchUpdateBlogList,
    onBatchDeleteBlog,
  };
}
