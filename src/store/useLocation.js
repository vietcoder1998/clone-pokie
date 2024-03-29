import React from "react";
import LocationAPI from "../api/location.api";

export default function useLocation() {
  const [locationList, setLocationList] = React.useState([]);
  const [anotherLocationList, setAnotherLocationList] = React.useState([]);
  const [locationLoading, setLocationLoading] = React.useState(false);
  const [locationDetail, setLocationDetail] = React.useState({});
  const onGetLocationDetail = React.useCallback(async (id) => {
    return await LocationAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setLocationDetail(data);
      }
    });
  }, []);
  const onGetLocationList = React.useCallback(async (params) => {
    setLocationLoading(true);
    return await LocationAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];

      setLocationList(data);
      setLocationLoading(false);

      return data;
    });
  }, []);
  const onCreateLocationDetail = React.useCallback(
    async (body) => {
      return await LocationAPI.instance.create(body).then((data) => {
        onGetLocationList();
      });
    },
    [onGetLocationList]
  );
  const onBatchUpdateLocationList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setLocationLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await LocationAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetLocationList();
            }
          });
      }
    },
    [onGetLocationList]
  );
  const onSearchLocationList = React.useCallback(async (params) => {
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    setLocationLoading(true);

    return await LocationAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];
        setLocationList(data);
        setLocationLoading(false);
      }
    });
  }, []);
  const onDeleteLocationList = React.useCallback(
    async (ids) => {
      setLocationLoading(true);

      return await LocationAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchLocationList();
          }
        });
    },
    [onSearchLocationList]
  );
  const onGetAnotherLocationList = React.useCallback(async (id) => {
    setLocationLoading(true);

    return LocationAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherLocationList(data?.splice(0, 3));
          setLocationLoading(false);
        }
      });
  }, []);

  const onUpdateLocation = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setLocationLoading(true);

        return await LocationAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetLocationList();
            }
          })
          .finally(() => {
            setLocationLoading(false);
          });
      }
    },
    [onGetLocationList]
  );

  return {
    locationList,
    anotherLocationList,
    locationLoading,
    locationDetail,
    onDeleteLocationList,
    onSearchLocationList,
    onGetLocationList,
    onGetLocationDetail,
    onGetAnotherLocationList,
    onCreateLocationDetail,
    setLocationDetail,
    onBatchUpdateLocationList,
    onUpdateLocation,
  };
}
