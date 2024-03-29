import React from "react";
import TagAPI from "../api/tag.api";

export default function useTag() {
  const [tagList, setTagList] = React.useState([]);
  const [anotherTagList, setAnotherTagList] = React.useState([]);
  const [tagLoading, setTagLoading] = React.useState(false);
  const [tagDetail, setTagDetail] = React.useState({});
  const onGetTagDetail = React.useCallback(async (id) => {
    return await TagAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setTagDetail(data);
      }
    });
  }, []);
  const onGetTagList = React.useCallback(async (params) => {
    setTagLoading(true);
    return await TagAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setTagList(data);
      setTagLoading(false);

      return data;
    });
  }, []);
  const onCreateTagDetail = React.useCallback(
    async (body) => {
      return await TagAPI.instance.create(body).then((data) => {
        onGetTagList();
      });
    },
    [onGetTagList]
  );
  const onBatchUpdateTagList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setTagLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await TagAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetTagList();
            }
          });
      }
    },
    [onGetTagList]
  );
  const onSearchTagList = React.useCallback(async (params) => {
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    setTagLoading(true);

    return await TagAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];
        setTagList(data);
        setTagLoading(false);
      }
    });
  }, []);
  const onDeleteTagList = React.useCallback(
    async (ids) => {
      setTagLoading(true);

      return await TagAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchTagList();
          }
        });
    },
    [onSearchTagList]
  );
  const onGetAnotherTagList = React.useCallback(async (id) => {
    setTagLoading(true);

    return TagAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherTagList(data?.splice(0, 3));
          setTagLoading(false);
        }
      });
  }, []);

  const onUpdateTag = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setTagLoading(true);

        return await TagAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetTagList();
            }
          })
          .finally(() => {
            setTagLoading(false);
          });
      }
    },
    [onGetTagList]
  );

  return {
    tagList,
    anotherTagList,
    tagLoading,
    tagDetail,
    onDeleteTagList,
    onSearchTagList,
    onGetTagList,
    onGetTagDetail,
    onGetAnotherTagList,
    onCreateTagDetail,
    setTagDetail,
    onBatchUpdateTagList,
    onUpdateTag,
  };
}
