interface Quote {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export const fetchRandomQuote = async (params: Record<string, string> = {}): Promise<Quote> => {
  const searchParams = new URLSearchParams({ maxLength: '140', ...params }).toString();
  const res = await fetch(`https://api.quotable.io/random?${searchParams}`);
  if (!res.ok) throw new Error('Failed to fetch quote');
  return res.json();
};