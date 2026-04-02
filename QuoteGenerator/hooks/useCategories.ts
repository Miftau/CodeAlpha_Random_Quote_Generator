import { useState, useEffect } from 'react';
import { fetchRandomQuote } from '@/utils/api';

export const useCategories = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialTags = async () => {
      try {
        setIsLoading(true);
        // Fetch multiple quotes to get a variety of tags
        const promises = Array.from({ length: 5 }).map(() => fetchRandomQuote());
        const quotes = await Promise.all(promises);
        const allTags = quotes.flatMap(q => q.tags).filter(Boolean);
        setTags(Array.from(new Set(allTags as string[])).slice(0, 20)); // Limit to 20 unique tags
      } catch (error) {
        console.warn('Failed to preload tags:', error);
        // Fallback tags
        setTags([
          'inspiration', 'life', 'success', 'love', 'wisdom', 'motivation',
          'happiness', 'knowledge', 'change', 'time', 'truth', 'friendship'
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTags();
  }, []);

  return { tags, isLoading };
};