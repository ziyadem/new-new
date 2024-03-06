/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { main } from "../../store";
import $axios from "../../services";
import { ERROR } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useFetch = (url: string, reload: number) => {
  const dispatch = useDispatch();

  const [state, setState] = useState<any>({
    res: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    const handleFetch = async () => {
      try {
        setState((prev: any) => ({ ...prev, loading: true }));
        const res: any = await $axios.get(url, { signal: controller.signal });

        if (res?.error) {
          dispatch(main({ alert: { message: res?.message, type: ERROR } }));
        }

        setState((prev: any) => ({ ...prev, res: res?.data }));

        if (res?.data?.success) {
          setState((prev: any) => ({ ...prev, res: res?.data }));
        }

        //!
      } catch (err: any) {
        dispatch(
          main({
            alert: { message: err?.response?.data?.message, type: ERROR },
          })
        );
      } finally {
        setState((prev: any) => ({ ...prev, loading: false }));
      }
    };

    handleFetch();

    return () => controller.abort();
  }, [url, reload]);

  return { ...state };
};
