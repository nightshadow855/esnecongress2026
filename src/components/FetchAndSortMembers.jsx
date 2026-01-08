import { useState, useEffect } from "react";

const FetchAndSortMembers = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        // Check if data.committees is defined and is an array
        if (Array.isArray(data.committees)) {
          // Sort members alphabetically within each committeeData
          const sortedCommittees = data.committees.map((committee) => {
            const sortedCommitteeData = committee.committeeData.map((item) => {
              if (Array.isArray(item.members)) {
                return {
                  ...item,
                  members: sortMembersAlphabetically(item.members),
                };
              }
              return item;
            });
            return {
              ...committee,
              committeeData: sortedCommitteeData,
            };
          });
          setData({ ...data, committees: sortedCommittees });
        } else {
          setData(data);
        }
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
  }, [url]);

  // Sorting function
  const sortMembersAlphabetically = (members) => {
    return members.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  };

  return { data, loading, error };
};

export default FetchAndSortMembers;
