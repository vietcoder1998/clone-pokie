import React from "react";
import UserAPI from "../api/user.api";
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

export function useUser() {
  const [userList, setUserList] = React.useState([]);
  const [anotherUserList, setAnotherUserList] = React.useState([]);
  const [userLoading, setUserLoading] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);
  const onGetUserDetail = React.useCallback(async (id) => {
    return await UserAPI.instance.getDetail(id).then((res) => {
      if (res?.data?.data) {
        const data = res?.data?.data;

        setUserDetail(data);
      }

    });
  }, []);
  const onCreateUserDetail = React.useCallback(async (body) => {
    return await UserAPI.instance.create(body);
  }, []);
  const onGetUserList = React.useCallback(async (params) => {
    setUserLoading(true);
    return await UserAPI.instance.getList({ params }).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setUserList(data);
        setUserLoading(false);
      }
    });
  }, []);
  const onBatchUpdateUserList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setUserLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await UserAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetUserList();
            }
          });
      }
    },
    [onGetUserList]
  );
  const onSearchUserList = React.useCallback(async (params) => {
    setUserLoading(true);
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");

    const query = urlSearch.toString();
    return await UserAPI.instance.search(query).then((res) => {
      const { data } = res?.data ?? [];

      setUserList(data);
      setUserLoading(false);

      return data;
    });
  }, []);
  const onGetAnotherUserList = React.useCallback(async (id) => {
    setUserLoading(true);

    return UserAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        const data = res?.data?.data;

        setAnotherUserList(data?.splice(0, 3));
        setUserLoading(false);
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
  const onUpdateUser = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setUserLoading(true);
        body.role = Number(body.role);

        return await UserAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetUserList();
            }
          })
          .finally(() => {
            setUserLoading(false);
          });
      }
    },
    [onGetUserList]
  );

  const onDeleteDataList = React.useCallback(
    async (ids) => {
      setUserLoading(true);

      return await UserAPI.instance.batchDelete({ data: { ids } }).then((res) => {
        if (res) {
          onGetUserList();
        }
      });
    },
    [onGetUserList]
  );

  return {
    userList,
    anotherUserList,
    userLoading,
    userDetail,
    tagList,
    onSearchUserList,
    onGetTagList,
    onGetUserDetail,
    onGetUserList,
    onGetAnotherUserList,
    onCreateUserDetail,
    setUserDetail,
    onBatchUpdateUserList,
    onUpdateUser,
    onDeleteDataList,
  };
}
