import React from "react";
import CareerAPI from "../api/career.api";
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

export function useCareer() {
  const [careerList, setCareerList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);
  const [anotherCareerList, setAnotherCareerList] = React.useState([]);
  const [careerLoading, setCareerLoading] = React.useState(false);
  const [careerDetail, setCareerDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);

  const onGetCareerDetail = React.useCallback(async (id) => {
    return await CareerAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        if (data) {
          let content = data.content;

          if (data?.isZip) {
            content = Buffer.from(data?.data, "base64").toString("utf-8");
          }

          setCareerDetail({ ...data, content });
        }
      }
    });
  }, []);
  const onGetCareerDetailWithSlug = React.useCallback(async (slug) => {
    return await CareerAPI.instance
      .getList({ query: `?slug=${slug}` })
      .then((res) => {
        if (res) {
          const data = res?.data?.data?.at(0);

          if (data) {
            let content = data.content;

            if (data?.isZip) {
              content = Buffer.from(data?.data, "base64").toString("utf-8");
            }

            setCareerDetail({ ...data, content });
          }
        }
      });
  }, []);
  const onCreateCareerDetail = React.useCallback(async (body) => {
    return await CareerAPI.instance.create(body);
  }, []);
  const onGetCareerList = React.useCallback(async (params) => {
    setCareerLoading(true);
    const urlSearch = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (key) {
        urlSearch.set(key, value);
      }
    });

    const query = `?${urlSearch.toString()}`;
    return await CareerAPI.instance.getList({ query }).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setCareerList(data?.sort((item) => item?.position));
        setCareerLoading(false);
      }
    });
  }, []);
  const onGetCareerWithTagList = React.useCallback(async (params) => {
    setCareerLoading(true);
    const tags = `tag=${params.tags}`;
    const title = `title=${params.title}`;

    return await CareerAPI.instance
      .search(`${[tags, title].join("&")}`)
      .then((res) => {
        if (res) {
          const { data } = res?.data ?? [];

          setCareerList(data);
          setCareerLoading(false);
        }
      });
  }, []);
  const onBatchUpdateCareerList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setCareerLoading(true);

        const query = new URLSearchParams();
        query.append("ids", ids);
        const search = query.toString();

        return await CareerAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetCareerList();
            }
          });
      }
    },
    [onGetCareerList]
  );
  const onSearchCareerList = React.useCallback(async (params) => {
    setCareerLoading(true);
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    return await CareerAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setSearchList(data);
        setCareerList(data);
        setCareerLoading(false);
      }

      return res;
    });
  }, []);
  const onGetAnotherCareerList = React.useCallback(async (id) => {
    setCareerLoading(true);

    return CareerAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherCareerList(data?.splice(0, 3));
          setCareerLoading(false);
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
  const onUpdateCareer = React.useCallback((id, body) => {
    return CareerAPI.instance.update(id, body).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setCareerDetail(data);
      }
    });
  }, []);
  const onBatchDeleteCareer = React.useCallback(
    (ids) => {
      return CareerAPI.instance.batchDelete({ data: { ids } }).then((res) => {
        if (res) {
          onGetCareerList();
        }
      });
    },
    [onGetCareerList]
  );

  return {
    careerList: careerList?.sort(
      (item, item1) => item1?.position - item?.position
    ),
    anotherCareerList,
    careerLoading,
    careerDetail,
    tagList,
    searchList,
    onGetCareerWithTagList,
    onUpdateCareer,
    onSearchCareerList,
    onGetTagList,
    onGetCareerDetail,
    onGetCareerList,
    onGetAnotherCareerList,
    onCreateCareerDetail,
    onGetCareerDetailWithSlug,
    setCareerDetail,
    onBatchUpdateCareerList,
    onBatchDeleteCareer,
  };
}
