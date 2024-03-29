import React from "react";
import ProfileAPI from "../api/profile.api";
import TagAPI from "../api/tag.api";

export function useTag() {
  const [tagList, setTagList] = React.useState([]);

  return {
    tagList,
  };
}

export function useProfile() {
  const [profileList, setProfileList] = React.useState([]);
  const [anotherProfileList, setAnotherProfileList] = React.useState([]);
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [profileDetail, setProfileDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);
  const onGetProfileDetail = React.useCallback(async (id) => {
    return await ProfileAPI.instance.getProfileByUserId(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setProfileDetail(data);
      }
    });
  }, []);
  const onGetProfileDetailWithSlug = React.useCallback(async (slug) => {
    return await ProfileAPI.instance.getDetail(slug).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setProfileDetail(data);
      }
    });
  }, []);
  const onCreateProfileDetail = React.useCallback(async (body) => {
    return await ProfileAPI.instance.create(body);
  }, []);
  const onGetProfileList = React.useCallback(async (params) => {
    setProfileLoading(true);
    return await ProfileAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setProfileList(data);
      setProfileLoading(false);

      return data;
    });
  }, []);
  const onBatchUpdateProfileList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setProfileLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await ProfileAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetProfileList();
            }
          });
      }
    },
    [onGetProfileList]
  );
  const onSearchProfileList = React.useCallback(async (params) => {
    setProfileLoading(true);
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");

    const query = urlSearch.toString();

    return await ProfileAPI.instance.search(query).then((res) => {
      const { data } = res?.data ?? [];

      setProfileList(data);
      setProfileLoading(false);

      return data;
    });
  }, []);
  const onGetAnotherProfileList = React.useCallback(async (id) => {
    setProfileLoading(true);

    return ProfileAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherProfileList(data?.splice(0, 3));
          setProfileLoading(false);
        }
      });
  }, []);
  const onGetTagList = React.useCallback(async (id) => {
    const response = await TagAPI.instance.getList().then((res) => {
      if (res) {
        const tags = response.data?.data;
        setTagList(tags);
      }
    });
  }, []);
  const onUpdateProfile = React.useCallback(
    async (id, body) => {
      return await ProfileAPI.instance.update(id, body).then((res) => {
        if (res) {
          onGetProfileDetail(res?.data?.data?.id);
        }
      });
    },
    [onGetProfileDetail]
  );
  const onDeleteDataList = React.useCallback(
    async (ids) => {
      setProfileLoading(true);

      return await ProfileAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchProfileList();
          }
        });
    },
    [onSearchProfileList]
  );

  return {
    profileList,
    anotherProfileList,
    profileLoading,
    profileDetail,
    tagList,
    onUpdateProfile,
    onSearchProfileList,
    onGetTagList,
    onGetProfileDetail,
    onGetProfileList,
    onGetAnotherProfileList,
    onCreateProfileDetail,
    onGetProfileDetailWithSlug,
    setProfileDetail,
    onBatchUpdateProfileList,
    onDeleteDataList,
  };
}
