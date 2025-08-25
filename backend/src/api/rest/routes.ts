import { FastifyInstance } from "fastify";
import { z } from "zod";
import { quoteService } from "../../services/quoteService";
import { likeService } from "../../services/likeService";
import { recommendationService } from "../../services/recommendationService";

const quoteParamsSchema = z.object({
  id: z.string(),
});

const likeBodySchema = z.object({
  userId: z.string(),
});

export async function restRoutes(fastify: FastifyInstance) {
  // Get random quote
  fastify.get("/quotes/random", async (request, reply) => {
    const userId = (request.headers["x-user-id"] as string) || "anonymous";
    try {
      const quote = await quoteService.getRandomQuote(userId);
      return reply.send(quote);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch random quote";
      // Graceful fallback to avoid 500s in the UI
      const fallback = {
        id: "fallback-quote",
        content:
          "Keep going. Everything you need will come to you at the perfect time.",
        author: "Unknown",
        tags: ["inspiration"],
        likes: 0,
        popularity: 0,
      };
      // Respond with 200 and fallback (or change to 502 with error if you prefer)
      fastify.log.warn({ msg: "Random quote fetch failed", errorMessage });
      return reply.send(fallback);
    }
  });

  // Like a quote
  fastify.post("/quotes/:id/like", async (request, reply) => {
    const { id } = quoteParamsSchema.parse(request.params);
    const { userId } = likeBodySchema.parse(request.body);

    try {
      const likes = await likeService.likeQuote(id, userId);
      quoteService.updatePopularity(id);
      return reply.send({ likes });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return reply.status(400).send({ error: errorMessage });
    }
  });

  // Get quote likes
  fastify.get("/quotes/:id/likes", async (request, reply) => {
    const { id } = quoteParamsSchema.parse(request.params);
    const likes = await likeService.getLikes(id);
    return reply.send({ likes });
  });

  // Get popular quotes
  fastify.get("/quotes/popular", async (request, reply) => {
    const popular = await recommendationService.getPopularQuotes();
    return reply.send(popular);
  });
}
