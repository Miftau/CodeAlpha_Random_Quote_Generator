interface Quote {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

export const fetchRandomQuote = async (params: Record<string, string> = {}): Promise<Quote> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    // Note: DummyJSON doesn't support variety of parameters like quotable
    const res = await fetch("https://dummyjson.com/quotes/random", {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error("Failed to fetch quote");
    
    const data = await res.json();
    
    // Map DummyJSON response format to our Quote interface
    return {
      _id: data.id.toString(),
      content: data.quote,
      author: data.author,
      authorSlug: data.author.toLowerCase().replace(/\s+/g, "-"),
      length: data.quote.length,
      tags: ["Inspiration", "Wisdom"], // DummyJSON doesn't provide tags, so providing defaults
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
};