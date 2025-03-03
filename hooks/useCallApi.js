import { useState, useEffect } from "react";

function useApiCall(apiFunction, payload, isAuthenticated) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiFunction(payload);
        setData(res.data);
      } catch (err) {
        setError(err);
        setData([]); // Set data to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchData();
    }
  }, [apiFunction, payload, isAuthenticated]);


  return { data, error, loading };
}

export default useApiCall;
