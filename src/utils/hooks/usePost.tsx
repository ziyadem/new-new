/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface PostState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  sendPost: (postData: T) => Promise<void>;
}

function usePost<T>(url: string): PostState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendPost = async (postData: T) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonResponse = await response.json();
      setData(jsonResponse);
      setLoading(false);
    } catch (error) {
      setError(error as any);
      setLoading(false);
    }
  };

  return { data, loading, error, sendPost };
}

export default usePost;
