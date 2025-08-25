export interface Quote {
  id: string;
  content: string;
  author: string;
  tags?: string[];
  likes?: number;
  popularity?: number;
}

export interface LikeResponse {
  likes: number;
  liked: boolean;
}

export interface SimilarQuotesResponse {
  quotes: Quote[];
}

export interface PopularQuotesResponse {
  quotes: Quote[];
}
