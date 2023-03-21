import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetchData: ()=>Promise<void>;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Options {
  method?: Method;
  headers?: { [key: string]: string };
  body?: BodyInit | null;
}

const useFetch = <T>(url: string, options: Options = {}): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const jsonData: T = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url, options]);

  return { data, error, loading,fetchData };
};

export default useFetch;
