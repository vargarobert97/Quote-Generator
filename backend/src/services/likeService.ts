import NodeCache from "node-cache";

export class LikeService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 0 }); // Persistent cache
  }

  async likeQuote(quoteId: string, userId: string): Promise<number> {
    const key = `likes:${quoteId}`;
    const userLikesKey = `user:${userId}:likes`;

    // Check if user already liked this quote
    const userLikes = this.cache.get<Set<string>>(userLikesKey) || new Set();
    if (userLikes.has(quoteId)) {
      throw new Error("User already liked this quote");
    }

    userLikes.add(quoteId);
    this.cache.set(userLikesKey, userLikes);

    const currentLikes = this.cache.get<number>(key) || 0;
    const newLikes = currentLikes + 1;
    this.cache.set(key, newLikes);

    return newLikes;
  }

  async getLikes(quoteId: string): Promise<number> {
    return this.cache.get<number>(`likes:${quoteId}`) || 0;
  }

  async hasUserLiked(quoteId: string, userId: string): Promise<boolean> {
    const userLikes = this.cache.get<Set<string>>(`user:${userId}:likes`);
    return userLikes ? userLikes.has(quoteId) : false;
  }
}

export const likeService = new LikeService();
