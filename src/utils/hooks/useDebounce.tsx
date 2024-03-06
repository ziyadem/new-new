import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value?.length === 0 || value?.trim()?.length > 2) {
        setDebouncedSearch(value?.trim());
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedSearch;
};
