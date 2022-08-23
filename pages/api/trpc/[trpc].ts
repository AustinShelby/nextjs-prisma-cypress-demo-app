import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import slugify from "slugify";
import { CreateEventSchema } from "../../../src/createEventSchema";
import { prisma } from "../../../src/prisma";

export const appRouter = trpc.router().mutation("create", {
  input: CreateEventSchema,
  async resolve({ input }) {
    try {
      const event = await prisma.event.create({
        data: {
          name: input.name,
          slug: slugify(input.name, { lower: true }),
          description: input.description,
          location: input.location,
          dateTime: new Date(input.dateTime),
        },
      });
      return event;
    } catch (error) {
      console.error(error);
      throw new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: "An unexpected error occurred, please try again later.",
        cause: error,
      });
    }
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
