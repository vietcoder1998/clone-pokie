import React from "react";
import CompanyAPI from "../api/company.api";
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

export function useCompany() {
  const [companyList, setCompanyList] = React.useState([]);
  const [searchList, setSearchList] = React.useState([]);
  const [anotherCompanyList, setAnotherCompanyList] = React.useState([]);
  const [companyLoading, setCompanyLoading] = React.useState(false);
  const [companyDetail, setCompanyDetail] = React.useState({});
  const [tagList, setTagList] = React.useState([]);

  const onGetCompanyDetail = React.useCallback(async (id) => {
    return await CompanyAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        if (data) {
          let content = data.content;

          if (data?.isZip) {
            content = Buffer.from(data?.data, "base64").toString("utf-8");
          }

          setCompanyDetail({ ...data, content });
        }
      }
    });
  }, []);
  const onGetCompanyDetailWithSlug = React.useCallback(async (slug) => {
    return await CompanyAPI.instance
      .getList({ query: `?slug=${slug}` })
      .then((res) => {
        if (res) {
          const data = res?.data?.data?.at(0);

          if (data) {
            let content = data.content;

            if (data?.isZip) {
              content = Buffer.from(data?.data, "base64").toString("utf-8");
            }

            setCompanyDetail({ ...data, content });
          }
        }
      });
  }, []);
  const onCreateCompanyDetail = React.useCallback(async (body) => {
    return await CompanyAPI.instance.create(body);
  }, []);
  const onGetCompanyList = React.useCallback(async (params) => {
    setCompanyLoading(true);
    const urlSearch = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (key) {
        urlSearch.set(key, value);
      }
    });

    const query = `?${urlSearch.toString()}`;
    return await CompanyAPI.instance.getList({ query }).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setCompanyList(data?.sort((item) => item?.position));
        setCompanyLoading(false);
      }
    });
  }, []);
  const onGetCompanyWithTagList = React.useCallback(async (params) => {
    setCompanyLoading(true);
    const tags = `tag=${params.tags}`;
    const title = `title=${params.title}`;

    return await CompanyAPI.instance
      .search(`?${[tags, title].join("&")}`)
      .then((res) => {
        if (res) {
          const { data } = res?.data ?? [];

          setCompanyList(data);
          setCompanyLoading(false);
        }
      });
  }, []);
  const onBatchUpdateCompanyList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setCompanyLoading(true);

        const query = new URLSearchParams();
        query.append("ids", ids);
        const search = query.toString();

        return await CompanyAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetCompanyList();
            }
          });
      }
    },
    [onGetCompanyList]
  );
  const onSearchCompanyList = React.useCallback(async (params) => {
    setCompanyLoading(true);
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    return await CompanyAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];

        setSearchList(data);
        setCompanyList(data);
        setCompanyLoading(false);
      }

      return res;
    });
  }, []);
  const onGetAnotherCompanyList = React.useCallback(async (id) => {
    setCompanyLoading(true);

    return CompanyAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherCompanyList(data?.splice(0, 3));
          setCompanyLoading(false);
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
  const onUpdateCompany = React.useCallback((id, body) => {
    return CompanyAPI.instance.update(id, body).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setCompanyDetail(data);
      }
    });
  }, []);
  const onBatchDeleteCompany = React.useCallback(
    (ids) => {
      return CompanyAPI.instance.batchDelete({ data: { ids } }).then((res) => {
        if (res) {
          onGetCompanyList();
        }
      });
    },
    [onGetCompanyList]
  );

  return {
    companyList: companyList?.sort(
      (item, item1) => item1?.position - item?.position
    ),
    anotherCompanyList,
    companyLoading,
    companyDetail,
    tagList,
    searchList,
    onGetCompanyWithTagList,
    onUpdateCompany,
    onSearchCompanyList,
    onGetTagList,
    onGetCompanyDetail,
    onGetCompanyList,
    onGetAnotherCompanyList,
    onCreateCompanyDetail,
    onGetCompanyDetailWithSlug,
    setCompanyDetail,
    onBatchUpdateCompanyList,
    onBatchDeleteCompany,
  };
}
