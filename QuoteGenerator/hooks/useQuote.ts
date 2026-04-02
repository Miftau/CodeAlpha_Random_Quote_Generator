import { useState, useEffect, useCallback } from 'react';
import { fetchRandomQuote } from '@/utils/api';
import { Quote, QuoteFilters } from '@/types/quote';

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuote = useCallback(async (filters?: QuoteFilters) => {
    try {
      setLoading(true);
      setError(null);
      const queryParams: Record<string, string> = {};
      if (filters?.maxLength !== undefined) queryParams.maxLength = filters.maxLength.toString();
      if (filters?.tags !== undefined) queryParams.tags = filters.tags;
      const data = await fetchRandomQuote(queryParams);
      setQuote({
        ...data,
        category: data.tags[0] || 'General',
      });
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError(err instanceof Error ? err.message : 'Failed to load quote');
      
      // Fallback quote
      setQuote({
        _id: 'fallback',
        content: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        tags: ['inspiration'],
        length: 68,
        category: 'Inspiration',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  return {
    quote,
    loading,
    error,
    refresh: () => loadQuote(),
    loadFiltered: loadQuote,
  };
};