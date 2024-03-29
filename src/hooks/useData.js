import React from "react";
import TagAPI from "../api/tag.api";

export function useData({ instance }) {
  const [dataList, setDataList] = React.useState([]);
  const [anotherDataList, setAnotherDataList] = React.useState([]);
  const [dataLoading, setDataLoading] = React.useState(false);
  const [dataDetail, setDataDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);

  const onGetDataDetail = React.useCallback(
    async (id) => {
      return await instance.getDetail(id).then((res) => {
        if (res) {
          const data = res?.data?.data;

          setDataDetail(data);
        }
      });
    },
    [instance]
  );

  const onGetDataList = React.useCallback(async (params) => {
    setDataLoading(true);
    return await instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setDataList(data);
      setDataLoading(false);

      return data;
    });
  }, []);
  const onCreateDataDetail = React.useCallback(
    async (body) => {
      return await instance.create(body).then((data) => {
        onGetDataList();
      });
    },
    [instance, onGetDataList]
  );
  const onBatchUpdateDataList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setDataLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await instance.batchUpdate(search, { state }).then((res) => {
          if (res) {
            onGetDataList();
          }
        });
      }
    },
    [instance, onGetDataList]
  );
  const onSearchDataList = React.useCallback(
    async (params) => {
      const urlSearch = new URLSearchParams();
      urlSearch.append("title", params?.title ?? "");
      const query = urlSearch.toString();

      setDataLoading(true);

      return await instance.search(query).then((res) => {
        const { data } = res?.data ?? [];

        setDataList(data);
        setDataLoading(false);

        return data;
      });
    },
    [instance]
  );
  const onDeleteDataList = React.useCallback(
    async (ids) => {
      setDataLoading(true);

      return await instance.batchDelete({ data: { ids } }).then((res) => {
        if (res) {
          onSearchDataList();
        }
      });
    },
    [instance, onSearchDataList]
  );
  const onGetAnotherDataList = React.useCallback(
    async (id) => {
      setDataLoading(true);

      return instance
        .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
        .then((res) => {
          if (res) {
            const data = res?.data?.data;

            setAnotherDataList(data?.splice(0, 3));
            setDataLoading(false);
          }
        });
    },
    [instance]
  );

  const onGetTagList = React.useCallback(async (id) => {
    return await TagAPI.instance.getList().then((res) => {
      if (res) {
        const tags = res?.data?.data;

        setTagList(tags);
      }
    });
  }, []);
  const onUpdateDataDetail = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setDataLoading(true);
        body.role = Number(body.role);

        return await instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetDataList();
            }
          })
          .finally(() => {
            setDataLoading(false);
          });
      }
    },
    [instance, onGetDataList]
  );

  return {
    dataList,
    anotherDataList,
    dataLoading,
    dataDetail,
    tagList,
    onDeleteDataList,
    onSearchDataList,
    onGetTagList,
    onGetDataDetail,
    onGetDataList,
    onGetAnotherDataList,
    onCreateDataDetail,
    setDataDetail,
    onBatchUpdateDataList,
    onUpdateDataDetail,
  };
}
