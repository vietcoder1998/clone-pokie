import React from "react";
import RoleAPI from "../api/role.api";
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

export function useRole() {
  const [roleList, setRoleList] = React.useState([]);
  const [anotherRoleList, setAnotherRoleList] = React.useState([]);
  const [roleLoading, setRoleLoading] = React.useState(false);
  const [roleDetail, setRoleDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);
  const onGetRoleDetail = React.useCallback(async (id) => {
    return await RoleAPI.instance.getDetail(id).then((res) => {
      const data = res?.data?.data;

      setRoleDetail(data);
    });
  }, []);
  const onGetRoleList = React.useCallback(async (params) => {
    setRoleLoading(true);
    return await RoleAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setRoleList(data);
      setRoleLoading(false);

      return data;
    });
  }, []);
  const onCreateRoleDetail = React.useCallback(
    async (body) => {
      return await RoleAPI.instance.create(body).then((data) => {
        onGetRoleList();
      });
    },
    [onGetRoleList]
  );
  const onBatchUpdateRoleList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setRoleLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await RoleAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetRoleList();
            }
          });
      }
    },
    [onGetRoleList]
  );
  const onSearchRoleList = React.useCallback(async (params) => {
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    setRoleLoading(true);

    return await RoleAPI.instance.search(query).then((res) => {
      const { data } = res?.data ?? [];

      setRoleList(data);
      setRoleLoading(false);

      return data;
    });
  }, []);
  const onDeleteRoleList = React.useCallback(
    async (ids) => {
      setRoleLoading(true);

      return await RoleAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchRoleList();
          }
        });
    },
    [onSearchRoleList]
  );
  const onGetAnotherRoleList = React.useCallback(async (id) => {
    setRoleLoading(true);

    return RoleAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        const data = res?.data?.data;

        setAnotherRoleList(data?.splice(0, 3));
        setRoleLoading(false);
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
  const onUpdateRole = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setRoleLoading(true);
        body.role = Number(body.role);

        return await RoleAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetRoleList();
            }
          })
          .finally(() => {
            setRoleLoading(false);
          });
      }
    },
    [onGetRoleList]
  );

  return {
    roleList,
    anotherRoleList,
    roleLoading,
    roleDetail,
    tagList,
    onDeleteRoleList,
    onSearchRoleList,
    onGetTagList,
    onGetRoleDetail,
    onGetRoleList,
    onGetAnotherRoleList,
    onCreateRoleDetail,
    setRoleDetail,
    onBatchUpdateRoleList,
    onUpdateRole,
  };
}
