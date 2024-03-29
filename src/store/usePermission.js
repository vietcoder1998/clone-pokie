import React from "react";
import PermissionAPI from "../api/permission.api";
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

export function usePermission() {
  const [permissionList, setPermissionList] = React.useState([]);
  const [anotherPermissionList, setAnotherPermissionList] = React.useState([]);
  const [permissionLoading, setPermissionLoading] = React.useState(false);
  const [permissionDetail, setPermissionDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);
  const onGetPermissionDetail = React.useCallback(async (id) => {
    return await PermissionAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setPermissionDetail(data);
      }
    });
  }, []);
  const onGetPermissionList = React.useCallback(async (params) => {
    setPermissionLoading(true);
    return await PermissionAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setPermissionList(data);
      setPermissionLoading(false);

      return data;
    });
  }, []);
  const onCreatePermissionDetail = React.useCallback(
    async (body) => {
      return await PermissionAPI.instance.create(body).then((data) => {
        onGetPermissionList();
      });
    },
    [onGetPermissionList]
  );
  const onBatchUpdatePermissionList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setPermissionLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await PermissionAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetPermissionList();
            }
          });
      }
    },
    [onGetPermissionList]
  );
  const onSearchPermissionList = React.useCallback(async (params) => {
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    setPermissionLoading(true);

    return await PermissionAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];
        setPermissionList(data);
        setPermissionLoading(false);
      }
    });
  }, []);
  const onDeletePermissionList = React.useCallback(
    async (ids) => {
      setPermissionLoading(true);

      return await PermissionAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchPermissionList();
          }
        });
    },
    [onSearchPermissionList]
  );
  const onGetAnotherPermissionList = React.useCallback(async (id) => {
    setPermissionLoading(true);

    return PermissionAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherPermissionList(data?.splice(0, 3));
          setPermissionLoading(false);
        }
      });
  }, []);

  const onGetTagList = React.useCallback(async (id) => {
    return await TagAPI.instance.getList().then((res) => {
      if (res) {
        const tags = res?.data?.data;

        setTagList(tags);
      }
    });
  }, []);
  const onUpdatePermission = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setPermissionLoading(true);
        body.role = Number(body.role);

        return await PermissionAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetPermissionList();
            }
          })
          .finally(() => {
            setPermissionLoading(false);
          });
      }
    },
    [onGetPermissionList]
  );

  return {
    permissionList,
    anotherPermissionList,
    permissionLoading,
    permissionDetail,
    tagList,
    onDeletePermissionList,
    onSearchPermissionList,
    onGetTagList,
    onGetPermissionDetail,
    onGetPermissionList,
    onGetAnotherPermissionList,
    onCreatePermissionDetail,
    setPermissionDetail,
    onBatchUpdatePermissionList,
    onUpdatePermission,
  };
}
