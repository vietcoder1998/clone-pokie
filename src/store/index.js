import React from "react";

export function useLoading(ids) {
  const [loading, setLoading] = React.useState([]);

  React.useEffect(() => {
    ids.forEach((id) => {
      loading[id] = false;
    });
  }, [ids, loading]);

  const onSetLoading = React.useCallback(
    (id, state) => {
      const newLoading = { ...loading };

      if (id) {
        if (state !== !loading) {
          newLoading[id] = state;
        } else {
          newLoading[id] = !loading;
        }

        setLoading(newLoading);
      }
    },
    [loading]
  );

  return {
    loading,
    setLoading,
    onSetLoading,
  };
}
