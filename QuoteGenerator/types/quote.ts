export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  length: number;
  category?: string;
}

export type QuoteFilters = {
  tags?: string;
  maxLength?: number;
};