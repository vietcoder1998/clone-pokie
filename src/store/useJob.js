import React from "react";
import JobAPI from "../api/job.api";

export default function useJob() {
  const [jobList, setJobList] = React.useState([]);
  const [anotherJobList, setAnotherJobList] = React.useState([]);
  const [jobLoading, setJobLoading] = React.useState(false);
  const [jobDetail, setJobDetail] = React.useState({});
  const onGetJobDetail = React.useCallback(async (id) => {
    return await JobAPI.instance.getDetail(id).then((res) => {
      if (res) {
        const data = res?.data?.data;

        setJobDetail(data);
      }
    });
  }, []);
  const onGetJobList = React.useCallback(async (params) => {
    setJobLoading(true);
    return await JobAPI.instance.getList({ params }).then((res) => {
      const { data } = res?.data ?? [];
      console.log(data)

      setJobList(data);
      setJobLoading(false);

      return data;
    });
  }, []);
  const onCreateJobDetail = React.useCallback(
    async (body) => {
      return await JobAPI.instance.create(body).then((data) => {
        onGetJobList();
      });
    },
    [onGetJobList]
  );
  const onBatchUpdateJobList = React.useCallback(
    async ({ ids, state }) => {
      if (ids.length) {
        setJobLoading(true);

        const query = new URLSearchParams();

        query.append("ids", ids);
        const search = query.toString();

        return await JobAPI.instance
          .batchUpdate(search, { state })
          .then((res) => {
            if (res) {
              onGetJobList();
            }
          });
      }
    },
    [onGetJobList]
  );
  const onSearchJobList = React.useCallback(async (params) => {
    const urlSearch = new URLSearchParams();
    urlSearch.append("title", params?.title ?? "");
    const query = urlSearch.toString();

    setJobLoading(true);

    return await JobAPI.instance.search(query).then((res) => {
      if (res) {
        const { data } = res?.data ?? [];
        setJobList(data);
        setJobLoading(false);
      }
    });
  }, []);
  const onDeleteJobList = React.useCallback(
    async (ids) => {
      setJobLoading(true);

      return await JobAPI.instance
        .batchDelete({ data: { ids } })
        .then((res) => {
          if (res) {
            onSearchJobList();
          }
        });
    },
    [onSearchJobList]
  );
  const onGetAnotherJobList = React.useCallback(async (id) => {
    setJobLoading(true);

    return JobAPI.instance
      .getList({ params: { skip: 0, take: 3, type: "mix", relatedId: id } })
      .then((res) => {
        if (res) {
          const data = res?.data?.data;

          setAnotherJobList(data?.splice(0, 3));
          setJobLoading(false);
        }
      });
  }, []);

  const onUpdateJob = React.useCallback(
    async (id, body) => {
      if (id && body) {
        setJobLoading(true);

        return await JobAPI.instance
          .update(id, body)
          .then((res) => {
            if (res) {
              onGetJobList();
            }
          })
          .finally(() => {
            setJobLoading(false);
          });
      }
    },
    [onGetJobList]
  );

  return {
    jobList,
    anotherJobList,
    jobLoading,
    jobDetail,
    onDeleteJobList,
    onSearchJobList,
    onGetJobList,
    onGetJobDetail,
    onGetAnotherJobList,
    onCreateJobDetail,
    setJobDetail,
    onBatchUpdateJobList,
    onUpdateJob,
  };
}
