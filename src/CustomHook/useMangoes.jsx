import { useState, useEffect } from 'react';

const useMangoes = () => {
  const [mangoes, setMangoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangoes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_baseUrl}/api/marketplaces/mangoes/`);
        if (!response.ok) {
          throw new Error('Failed to fetch mangoes');
        }
        const data = await response.json();
           setMangoes(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangoes();
  }, []);

  return { mangoes, loading, error };
};

export default useMangoes;