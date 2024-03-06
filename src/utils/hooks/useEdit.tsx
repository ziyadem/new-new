/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface EditState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  editItem: (editedData: T) => Promise<void>;
}

function useEdit<T>(url: string): EditState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const editItem = async (editedData: T) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
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

  return { data, loading, error, editItem };
}

export default useEdit;
