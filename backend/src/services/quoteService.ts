import axios from "axios";
import NodeCache from "node-cache";
import { z } from "zod";

const QuoteSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  tags: z.array(z.string()).optional(),
  likes: z.number().default(0),
  popularity: z.number().default(0),
});

export type Quote = z.infer<typeof QuoteSchema>;

export class QuoteService {
  private cache: NodeCache;
  private externalSources = [
    "https://api.quotable.io/random",
    "https://dummyjson.com/quotes/random",
  ];

  constructor() {
    this.cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
  }

  async getRandomQuote(userId?: string): Promise<Quote> {
    // Get weighted random source based on popularity
    const source = await this.selectWeightedSource();

    try {
      const response = await axios.get(source, { timeout: 5000 });
      let quote: Quote;

      if (source.includes("quotable.io")) {
        quote = QuoteSchema.parse({
          id: `quotable-${response.data._id}`,
          content: response.data.content,
          author: response.data.author,
          tags: response.data.tags,
        });
      } else {
        quote = QuoteSchema.parse({
          id: `dummyjson-${response.data.id}`,
          content: response.data.quote,
          author: response.data.author,
        });
      }

      // Enhance with popularity data
      const cachedPopularity = this.cache.get<number>(`popularity:${quote.id}`);
      if (cachedPopularity) {
        quote.popularity = cachedPopularity;
      }

      return quote;
    } catch (error) {
      // Graceful fallback to avoid 500s for the client
      return {
        id: "fallback-quote",
        content:
          "Keep going. Everything you need will come to you at the perfect time.",
        author: "Unknown",
        tags: ["inspiration"],
        likes: 0,
        popularity: 0,
      };
    }
  }

  private async selectWeightedSource(): Promise<string> {
    // Implement weighted selection logic
    return this.externalSources[
      Math.floor(Math.random() * this.externalSources.length)
    ];
  }

  updatePopularity(quoteId: string, increment: number = 1): void {
    const current = this.cache.get<number>(`popularity:${quoteId}`) || 0;
    this.cache.set(`popularity:${quoteId}`, current + increment);
  }
}

export const quoteService = new QuoteService();
