import { useState, useEffect } from 'react';

function useFetchFeeds(chapi) {
  const [entries, setEntries] = useState([]);
  const [fetchedUrls, setFetchedUrls] = useState(new Set());  // To track already fetched URLs
  const [loading, setLoading] = useState(true);  // Start loading state as true
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    // Function to handle data when fetched
    const handleData = (json, url) => {
      // If the URL has already been processed, skip it
      if (!fetchedUrls.has(url)) {
        setEntries((prevEntries) => {
          const newEntries = json.feed.entry;

          // Mark this URL as fetched to avoid repeated fetches
          setFetchedUrls((prev) => new Set(prev.add(url)));

          // Get a Set of existing entry IDs to avoid duplicates
          const existingIds = new Set(prevEntries.map((entry) => entry.title.$t));

          // Filter out entries that already exist (using the 'id' as a unique key)
          const filteredNewEntries = newEntries.filter(
            (entry) => !existingIds.has(entry.title.$t)
          );

          // Merge the non-duplicate entries in a structured way
          const mergedEntries = [...prevEntries, ...filteredNewEntries];

          mergedEntries.sort((a, b) => new Date(b.published.$t) - new Date(a.published.$t));

          return mergedEntries;
        });
      }
    };

    // Function to fetch data from a given URL
    const fetchData = async (url, callback) => {
      const script = document.createElement('script');
      // Create a global callback function for the JSONP response
      window.epList = (json) => callback(json, url);

      // Set the script URL to include the Blogger API and the callback function
      script.src = `${url}&callback=epList`;

      // Append the script to the body
      document.body.appendChild(script);

      // Wait until the script is loaded and processed
      try {
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        });
      } catch (err) {
        setError(`Error fetching data from ${url}: ${err.message}`);
      } finally {
        // Clean up the script when done
        document.body.removeChild(script);
        delete window.epList;
      }
    };

    // Function to sequentially fetch all URLs
    const fetchSequentially = async () => {
      setLoading(true);  // Start loading
      setError(null);  // Reset any previous errors

      for (const url of chapi) {
        if (!fetchedUrls.has(url)) {
          await fetchData(url, handleData);  // Wait for the current fetch to complete
        }
      }

      // Ensure loading is set to false after all URLs have been processed
      setLoading(false);
    };

    // Start the sequential fetching process when `chapi` changes
    fetchSequentially();

  }, [chapi, fetchedUrls]); // Runs again if `chapi` or `fetchedUrls` change

  return { entries, loading, error };
}

export default useFetchFeeds;
