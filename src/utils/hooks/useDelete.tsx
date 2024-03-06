/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface DeleteState {
  loading: boolean;
  error: Error | null;
  deleteItem: () => Promise<void>;
}

function useDelete(url: string): DeleteState {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteItem = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setLoading(false);
    } catch (error) {
      setError(error as any);
      setLoading(false);
    }
  };

  return { loading, error, deleteItem };
}

export default useDelete;
