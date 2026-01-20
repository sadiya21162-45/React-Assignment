import { useState, useEffect } from 'react';
import type { ApiResponse, Artwork } from '../types';


const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const useArtworkData = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
  });

  const fetchArtworks = async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}&limit=12`);
      const result: ApiResponse = await response.json();

      setData(result.data);
      setPagination({
        currentPage: result.pagination.current_page,
        totalPages: result.pagination.total_pages,
        totalItems: result.pagination.total,
      });
    } catch (err) {
      setError('Failed to fetch artworks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(1);
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    fetchArtworks,
  };
};
