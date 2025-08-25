import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = `
  type Quote {
    id: ID!
    content: String!
    author: String!
    tags: [String!]
    likes: Int!
    popularity: Float!
  }

  type LikeResponse {
    likes: Int!
    liked: Boolean!
  }

  type Query {
    randomQuote: Quote!
    quote(id: ID!): Quote
    popularQuotes(limit: Int): [Quote!]!
  }

  type Mutation {
    likeQuote(quoteId: ID!, userId: String!): LikeResponse!
  }
`;

const resolvers = {
  Query: {
    randomQuote: async (_: any, __: any, context: any) => {
      return context.quoteService.getRandomQuote();
    },
    popularQuotes: async (
      _: any,
      { limit = 5 }: { limit?: number },
      context: any
    ) => {
      return context.recommendationService.getPopularQuotes(limit);
    },
  },
  Mutation: {
    likeQuote: async (
      _: any,
      { quoteId, userId }: { quoteId: string; userId: string },
      context: any
    ) => {
      const likes = await context.likeService.likeQuote(quoteId, userId);
      const liked = await context.likeService.hasUserLiked(quoteId, userId);
      return { likes, liked };
    },
  },
};

export const graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
