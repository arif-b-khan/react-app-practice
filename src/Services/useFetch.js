import { useState, useEffect } from "react";
const baseUrl = "http://localhost:3001/";

export default function useFetch(path) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        let r = await fetch(baseUrl+path);
        if (r.ok) {
          const json = await r.json();
          setData(json);
        } else {
          throw r;
        }
      } catch (err) {
        // console.log(err);
        setError(err.statusText);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [path]);
  return { data, error, loading };
}
