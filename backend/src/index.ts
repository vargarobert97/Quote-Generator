import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import mercurius from "mercurius";
import { restRoutes } from "./api/rest/routes";
import { graphqlSchema } from "./api/graphql/schema";
import { quoteService } from "./services/quoteService";
import { likeService } from "./services/likeService";
import { recommendationService } from "./services/recommendationService";

const server = Fastify({
  logger: {
    level: "info",
  },
});

async function startServer() {
  // Register plugins
  await server.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  });
  await server.register(helmet);

  // Register REST routes
  server.register(restRoutes, { prefix: "/api" });

  // Register GraphQL
  server.register(mercurius, {
    schema: graphqlSchema,
    graphiql: process.env.NODE_ENV !== "production",
    context: (request, reply) => ({
      quoteService,
      likeService,
      recommendationService,
    }),
  });

  // Health check
  server.get("/health", async () => {
    return { status: "OK", timestamp: new Date().toISOString() };
  });

  try {
    await server.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server listening on port 3001");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
