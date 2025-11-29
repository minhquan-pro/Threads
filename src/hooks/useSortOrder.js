import { useSearchParams } from "react-router";

export const useSortOrder = (defaultValue = "recent") => {
  const [params, setParams] = useSearchParams();
  const sortOrder = params.get("sort_order") || defaultValue;

  const setSortOrder = (value) => {
    const newParams = new URLSearchParams(params);
    newParams.set("sort_order", value);
    setParams(newParams);
  };

  return { sortOrder, setSortOrder };
};
