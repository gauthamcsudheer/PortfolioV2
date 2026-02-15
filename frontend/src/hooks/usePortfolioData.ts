import { useState, useEffect } from 'react';

export function usePortfolioData(endpoint: 'projects' | 'experience') {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, [endpoint]);

  return { data, loading, refresh };
}