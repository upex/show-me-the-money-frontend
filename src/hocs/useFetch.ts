import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: { message: string } | undefined;
}

const useFetch = <T,>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json: T = await response.json();
        setData(json);
      } catch (err) {
        setError({ message: (err as Error).message });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
