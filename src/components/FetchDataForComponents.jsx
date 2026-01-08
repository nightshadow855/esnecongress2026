import React from "react";
import { useState, useEffect } from "react";

function FetchDataForComponents(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          // Don't update state if fetch is aborted
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to abort fetch on component unmount
    return () => {
      abortController.abort();
    };
  }, [url]); // Added url to dependency array

  return { data, loading, error };
}

export default FetchDataForComponents;
