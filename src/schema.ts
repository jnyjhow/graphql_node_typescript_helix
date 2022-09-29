import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";

import { GraphQLContext } from "./context";
import { Link } from "@prisma/client";


/**
type Link = {
  id: string;
  url: string;
  description: string;
};

 const links: Link[] = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'test-1',
    url: 'www.teste.com',
    description: 'Fullstack tutorial for GraphQL - TEST'
  }
];
 */

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    
    feed: async (parent: unknown, args: {}, context: GraphQLContext) => {
      return context.prisma.link.findMany();
    },
  },
  
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },

   Mutation: {
    post: (
      parent: unknown,
      args: { description: string; url: string },
      context: GraphQLContext

    ) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return newLink;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
