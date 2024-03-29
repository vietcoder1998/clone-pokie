import React from "react";
import ApplyAPI from "../api/apply.api";

export default function useApply() {
  const [applyList, setApplyList] = React.useState([]);
  const [anotherApplyList, setAnotherApplyList] = React.useState([]);
  const [applyLoading, setApplyLoading] = React.useState(false);
  const [applyDetail, setApplyDetail] = React.useState({});
  const onGetApplyDetail = React.useCallback(async (id) => {
    return await ApplyAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setApplyDetail(data);
      }
    });
  }, []);
  const onGetApplyList = React.useCallback(async (params) => {
    setApplyLoading(true);
    return await ApplyAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setApplyList(data);
      setApplyLoading(false);

      return data;
    });
  }, []);
  const onCreateApplyDetail = React.useCallback(
    async (body) => {
      return await ApplyAPI.instance.create(body).then((data) => {
        onGetApplyList();

        return data;
      });
    },
    [onGetApplyList]
  );
  const onBatchUpdateApplyList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setApplyLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await ApplyAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetApplyList();
            }
          });
      }
    },
    [onGetApplyList]
  );
  const onSearchApplyList = React.useCallback(async (query) => {
    setApplyLoading(true);

    return await ApplyAPI.instance.search("", { body: query }).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];
        setApplyList(data);
        setApplyLoading(false);
      }
    });
  }, []);
  const onDeleteApplyList = React.useCallback(
    async (ids) => {
      setApplyLoading(true);

      return await ApplyAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchApplyList();
          }
        });
    },
    [onSearchApplyList]
  );
  const onGetAnotherApplyList = React.useCallback(async (id) => {
    setApplyLoading(true);

    return ApplyAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherApplyList(data?.splice(0, 3));
          setApplyLoading(false);
        }
      });
  }, []);

  const onUpdateApply = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setApplyLoading(true);

        return await ApplyAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetApplyList();
            }
          })
          .finally(() => {
            setApplyLoading(false);
          });
      }
    },
    [onGetApplyList]
  );

  return {
    applyList,
    anotherApplyList,
    applyLoading,
    applyDetail,
    onDeleteApplyList,
    onSearchApplyList,
    onGetApplyList,
    onGetApplyDetail,
    onGetAnotherApplyList,
    onCreateApplyDetail,
    setApplyDetail,
    onBatchUpdateApplyList,
    onUpdateApply,
  };
}
