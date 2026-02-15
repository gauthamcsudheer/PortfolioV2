import { useState, useEffect } from 'react';
// --- Import the dynamic base URL configuration ---
import { API_BASE_URL } from '@/lib/api';

export function usePortfolioData(endpoint: 'projects' | 'experience') {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      // Use the API_BASE_URL constant instead of the hardcoded localhost string
      const res = await fetch(`${API_BASE_URL}/${endpoint}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  // Re-run the fetch operation whenever the endpoint changes
  useEffect(() => { 
    refresh(); 
  }, [endpoint]);

  return { data, loading, refresh };
}