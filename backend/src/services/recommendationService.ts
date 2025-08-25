import { quoteService } from "./quoteService";
import { likeService } from "./likeService";

export class RecommendationService {
  async getPopularQuotes(limit: number = 5): Promise<any[]> {
    // Return mock popular quotes (in production, this would query a database)
    return [
      {
        id: "popular-1",
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        popularity: 95,
      },
      {
        id: "popular-2",
        content: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        popularity: 88,
      },
    ].slice(0, limit);
  }
}

export const recommendationService = new RecommendationService();
